---
title: How I Recreated “Attention Is All You Need” in PyTorch — and What My Evaluation Scores Look Like
date: 2025-07-07
tags: [AI, Transformer, Python]
img: /img/blog/transformer-reimplementation.png
excerpt: I re-implemented Vaswani et al.'s Transformer, trained on Multi30k & WMT19, and share full code + evaluation metrics.
---

## 1. Introduction  
I recently re-implemented the Transformer architecture (Vaswani et al., 2017) from scratch in PyTorch and trained it on two datasets—Multi30k and WMT19. In this post, I’ll walk you through my motivation, implementation details, training setup, and final benchmarking results. I hope this will be useful for anyone learning about self-attention, and also give recruiters a concrete example of my hands-on deep-learning skills.

## 2. Background & Motivation  
- **“Attention Is All You Need”** revolutionized sequence modeling by replacing recurrence with self-attention.  
- I wanted to gain a *deeper* understanding by coding every matrix multiply, mask, and softmax myself—no high-level libraries.  
- Training on **Multi30k** (30 K image captions EN↔DE) and **WMT19** (millions of sentence pairs) let me see how my vanilla Transformer scales.

### 2.1 How the Transformer Works
The Transformer lets the model learn long-range dependencies and parallelize across all positions. Here’s the high-level flow (batch dimension omitted for clarity):

#### 2.1.1 Input + Positional Encoding
Let $T$ be the sequence length, and $\mathbf{X}\in\mathbb{R}^{T\times d_{\mathrm{model}}}$ be the input embedding matrix plus positional encoding:  
$$
\mathbf{X} = \text{Embedding} + \text{Position}
$$

#### 2.1.2 Self‐Attention (per layer)
- Project $\mathbf{X}$ into queries $\color{red}{\mathbf{Q}}$, keys $\color{green}{\mathbf{K}}$, and values $\color{orange}{\mathbf{V}}$ using learned weights $W^Q,W^K,W^V\in\mathbb{R}^{d_{\mathrm{model}}\times d_k}$:  
  $$
  \begin{aligned}
  \color{red}{\mathbf{Q}} = \mathbf{X}W^Q \\
  \color{green}{\mathbf{K}} = \mathbf{X}W^K \\
  \color{orange}{\mathbf{V}} = \mathbf{X}W^V
  \end{aligned}
  $$

  where each of ${\color{red}\mathbf{Q}},{\color{green}\mathbf{K}},{\color{orange}\mathbf{V}}\in\mathbb{R}^{T\times d_k}$.  
- Compute scaled dot‐product attention:  
  $$
  \text{Attention}\bigl({\color{red}\mathbf{Q}},{\color{green}\mathbf{K}},{\color{orange}\mathbf{V}}\bigr)
  \;=\;
  \text{softmax}\!\left(\frac{{\color{red}\mathbf{Q}}\;\color{green}{\mathbf{K}}^\top}{\color{white}{\sqrt{d_k}}}\right)\;{\color{orange}\mathbf{V}}
  $$ 
  - Here, the inputs to the softmax (in $\mathbb{R}^{T\times T}$) are the attention weights, and the output of the whole attention operation is in $\mathbb{R}^{T\times d_k}$.
  - $QK^T$ is divided by $\sqrt{d_k}$ so that large magnitudes (from higher dimensionality) don’t push softmax into extremely small gradients.
  - The output tensor of the softmax represents the *attention weights*, how much each token pays attention to all other tokens.

- **Multi‐head**: run this for each of $h$ heads, producing $h$ outputs in $\mathbb{R}^{T\times d_k}$; concatenate to $\mathbb{R}^{T\times d_{\mathrm{model}}}$ and project with $W^P\in\mathbb{R}^{d_{\mathrm{model}}\times d_{\mathrm{model}}}$.

$$
\begin{aligned}
& \mathrm{head}_i = \mathrm{Attention}\bigl(\mathbf{X}{\color{red}W_i^Q},\,\mathbf{X}{\color{green}W_i^K},\,\mathbf{X}{\color{orange}W_i^V}\bigr)\quad\text{for }i=1,\dots,h \\
& \mathrm{MultiHead}(\mathbf{X}) = \mathrm{Concat}(\mathrm{head}_1,\dots,\mathrm{head}_h)\,W^P
\end{aligned}
$$

#### 2.1.3 Add & Norm 
Residual connection + layer norm yields  
$$
{\color{purple}\mathbf{Y}} = \mathrm{LayerNorm}\bigl(\mathbf{X} + \mathrm{MultiHead}(\mathbf{X})\bigr)\;\in\mathbb{R}^{T\times d_{\mathrm{model}}}
$$

#### 2.1.4 Position‐wise Feed‐Forward
Applied independently at each position:  
$$
{\color{teal}\mathbf{Z}} = \mathrm{ReLU}\bigl({\color{purple}\mathbf{Y}}W_1 + b_1\bigr)\;W_2 + b_2
$$
where $W_1\in\mathbb{R}^{d_{\mathrm{model}}\times d_{\mathrm{ff}}}$ and $W_2\in\mathbb{R}^{d_{\mathrm{ff}}\times d_{\mathrm{model}}}$, so $\color{teal}{\mathbf{Z}}\in\mathbb{R}^{T\times d_{\mathrm{model}}}$

#### 2.1.5 Add & Norm (again)
$$
{\color{magenta}\mathbf{O}} = \mathrm{LayerNorm}\bigl({\color{purple}\mathbf{Y}} + {\color{teal}\mathbf{Z}}\bigr)\;\in\mathbb{R}^{T\times d_{\mathrm{model}}}
$$

#### 2.1.6 Stacking Layers
Repeat steps 2–5 $N$ times in the encoder to produce the final encoder output $\color{magenta}{\mathbf{O}}_{\text{enc}}\in\mathbb{R}^{T\times d_{\mathrm{model}}}$

#### 2.1.7 Decoder Masked Self-Attention
The decoder first applies self-attention over its own inputs, masking out future positions so each token can only attend to earlier ones:  
- Decoder input $\mathbf{X}_{\text{dec}}\in\mathbb{R}^{T_{\text{dec}}\times d_{\mathrm{model}}}$ (embeddings + positional encoding)  
- Compute  
  $$
  \text{MaskedSelfAttn}\bigl(\mathbf{X}_{\text{dec}}\bigr)
    = \text{softmax}\!\Bigl(\frac{\mathbf{X}_{\text{dec}}{\color{red}W^Q}\;(\mathbf{X}_{\text{dec}}{\color{green}W^K})^\top}{\sqrt{d_k}} + \text{mask}\Bigr)\;\mathbf{X}_{\text{dec}}{\color{orange}W^V}
  $$

  - where ${\color{red}W^Q},{\color{green}W^K},{\color{orange}W^V}\in\mathbb{R}^{d_{\mathrm{model}}\times d_k}$.
  - `mask` adds a value of 0 to the logits of allowed positions (past & current), and $-\infty$ to the logits of disallowed positions (future). Because $\text{softmax}(-\infty) = 0$, any future-position logits become zero after softmax, ensuring the model can't "look ahead."

#### 2.1.8 Decoder Cross-Attention  
After masked self-attention, the decoder attends to the encoder output (full input context):  
$$
\text{CrossAttn}\bigl({\color{red}\mathbf{Q}_{\text{dec}}},\,{\color{green}\mathbf{K}_{\text{enc}}},\,{\color{orange}\mathbf{V}_{\text{enc}}}\bigr)
= \text{softmax}\!\Bigl(\frac{{\color{red}\mathbf{Q}_{\text{dec}}}\;{\color{green}\mathbf{K}_{\text{enc}}^\top}}{\sqrt{d_k}}\Bigr)\;{\color{orange}\mathbf{V}_{\text{enc}}}
$$  
with  
- $\color{red}{\mathbf{Q}}_{\text{dec}} = \mathbf{Y}_{\text{dec}}W^Q\in\mathbb{R}^{T_{\text{dec}}\times d_k}$ from the masked self-attention output  
- ${\color{green}{\mathbf{K}}_{\text{enc}}},\,{\color{orange}{\mathbf{V}}_{\text{enc}}}\in\mathbb{R}^{T\times d_k}$ from the encoder


#### 2.1.9 Final Projection  
Project decoder’s output $\color{magenta}{\mathbf{O}}_{\text{dec}}\in\mathbb{R}^{T_{\text{dec}}\times d_{\mathrm{model}}}$ through $W_{\text{out}}\in\mathbb{R}^{d_{\mathrm{model}}\times|\mathcal{V}|}$ and softmax to get next-token probabilities. $|\mathcal{V}|$ is the size of the tokenizer's vocabulary.


> By using $\mathbf{X}\in\mathbb{R}^{T\times d_{\mathrm{model}}}$ throughout, the Transformer achieves full parallelism and effective long-range dependency modeling.

### 2.2 Notes  
- Originally made for translation tasks.
- Performed very well on English→German/French translation, trained for 3.5 days on 8 GPUs.  
- At that time, state-of-the-art models were RNNs (LSTMs/GRUs), which process sequentially and can’t parallelize as effectively.  
- Output label tokens are masked so the model at position $i$ sees only previously generated tokens + the original input—preventing “cheating.”  
- “Shifted right”: the decoder input is offset by one position (prepended `<START>`), forcing autoregressive generation until `<END>`.  
- Residual connections:
  $$\text{output} = \text{layer(input)} + \text{input}$$  
  **Why this matters:**  
  1. **Information preservation:** original input is always available downstream.  
  2. **Easier training:** learning a small “delta” is simpler than a full mapping, leading to faster convergence and stable gradients.

## 3. Model Implementation  
See the full implementation in [this file](https://github.com/Mahmh/ml-research-papers/blob/main/attention-is-all-you-need/lib/transformer.py).

## 4. Training Setup
- **Hardware:** 1 NVIDIA RTX 4080 (16 GB)
- **Checkpointing:** saved training artifacts for each epoch.
- **Total Training & Evaluation times:**
  * Multi30k: \~14 min
  * WMT19 subset: \~16 h

| Hyperparameter                                  | Value       |
|-------------------------------------------------|-------------|
| **Batch Size**                                  | 64          |
| **Input Sequence Length**                       | 128         |
| **Output Sequence Length**                      | 128         |
| **Model Dimension** ($d_{\mathrm{model}}$)      | 256         |
| **Feed-Forward Dimension** ($d_{\mathrm{ff}}$)  | 1,024       |
| **Number of Attention Heads**                   | 8           |
| **Number of Encoder Layers**                    | 4           |
| **Number of Decoder Layers**                    | 4           |
| **Dropout Probability** ($p_{\mathrm{drop}}$)   | 0.1         |
| **Learning Rate** ($\text{lr}$)                 | 1.0         |
| **Warm-up Steps**                               | 4,000       |
| **Adam Betas** ($\beta_1, \beta_2$)             | (0.9, 0.98) |
| **Adam Epsilon** ($\epsilon$)                   | $10^{-9}$   |
| **Early-Stopping Patience** (epochs)            | 5           |
| **Early-Stopping Minimum $\Delta$**             | $10^{-4}$   |
| **Train Split (Multi30k)**                      | 94%         |
| **Validation Split (Multi30k)**                 | 3%          |
| **Test Split (Multi30k)**                       | 3%          |
| **Train Split (WMT19)**                         | 80%         |
| **Validation Split (WMT19)**                    | 10%         |
| **Test Split (WMT19)**                          | 10%         |

## 5. Results & Benchmarks
I began by training my Transformer implementation on the [Multi30k dataset](https://huggingface.co/datasets/bentrevett/multi30k), which contains 30,000 English-to-German sentence pairs. Although the training & evaluation ran in about 14 minutes, the model’s translation quality remained underwhelming despite tuning various hyperparameters — suggesting that the dataset size was a limiting factor.

Accordingly, I switched to the [WMT19 dataset](https://huggingface.co/datasets/wmt/wmt19) for English-to-Czech translation and updated the multilingual tokenizer to an English-Czech model. Although the full dataset comprises roughly 7 million examples, I used a 100,000-example subset for demonstration and computational feasibility. This increased my training time to about 16 hours but yielded a substantial improvement in translation performance. Please note that the spikes in the WMT19 training graph are due to modifications I made to the model and optimizer loading process.

![Multi30k loss curve](https://raw.githubusercontent.com/Mahmh/ml-research-papers/refs/heads/main/attention-is-all-you-need/graphs/multi30k_loss_curve.png)
![WMT19 loss curve](https://raw.githubusercontent.com/Mahmh/ml-research-papers/refs/heads/main/attention-is-all-you-need/graphs/wmt19_loss_curve.png)

### 5.1 Model Trained on Multi30k
Example translation:
```py
>>> translate(model, 'I have some good news!', max_len=30, beam_width=4, len_penalty=0.9)
OUTPUT: "##sg ##et , um es ent ##sp ##annt ist ent ##sp ##annt ."
```
Evaluation metrics:
| Metric         | Value   |
| -------------- | ------- |
| Training loss  | 0.4756  |
| Validation loss| 2.046   |
| Test Loss      | 2.0506  |
| BLEU           | 72.21   |
| chrF           | 82.49   |
| ROUGE-1        | 0.7820  |
| ROUGE-2        | 0.6509  |
| ROUGE-L        | 0.7716  |
| ROUGE-Lsum     | 0.7722  |
| METEOR         | 0.7916  |
| TER            | 36.06   |
| BERTScore F1   | 0.9637  |

### 5.2 Model Trained on WMT19
Example translation:
```py
>>> translate(model, 'I have some good news!', max_len=30, beam_width=4, len_penalty=0.9)
OUTPUT: "i některé dobré zprávy !"
```
Evaluation metrics:
| Metric         | Value   |
| -------------- | ------- |
| Training loss  | 1.7401  |
| Validation loss| 1.5811  |
| Test Loss      | 1.4961  |
| BLEU           | 39.52   |
| chrF           | 53.91   |
| ROUGE-1        | 0.6339  |
| ROUGE-2        | 0.4766  |
| ROUGE-L        | 0.6174  |
| ROUGE-Lsum     | 0.6173  |
| METEOR         | 0.5489  |
| TER            | 55.20   |
| BERTScore F1   | 0.8984  |

## 6. Conclusions
Overall, this from-scratch Transformer implementation demonstrates both the power and the pitfalls of self-attention in practice:

1. **Small-data over-fitting on Multi30k**  
   - Metrics like BLEU ~72 and chrF ~82 looked impressive, but the very high test scores coupled with underwhelming inference quality reveal heavy over-fitting to a relatively small, low-variance dataset.  
   - The validation loss remained flat (~2.0) even as training loss plummeted, a classic sign that memorization rather than generalization was occurring.

2. **Robust performance on WMT19 subset**  
   - On a more realistic task (100,000 subsampled EN→CS pairs), the model achieved BLEU ~39.5, chrF ~54, METEOR ~0.55 and BERTScore ~0.90, all of which place it firmly in “very strong” territory for a vanilla Transformer trained on modest hardware.  
   - Validation and test losses (~1.6 and ~1.5, respectively) tracked closely, indicating healthy generalization to held-out data.

3. **Key takeaways**  
   - **Data size matters:** large, diverse corpora are essential to avoid misleadingly high metrics since Transformers work best on those kinds of datasets.
   - **Regularization & early stopping:** techniques like dropout, label smoothing, gradient clipping and patience-based stopping can curb over-fitting, especially on small datasets.  
   - **Metric blindness:** automatic scores can paint an overly rosy picture—always complement them with human or out-of-domain evaluations.

## 7. Lessons Learned & Next Steps
- **Lesson learned:** Always save both model **and** optimizer state so you can resume training seamlessly.
- **Next steps:** I plan to work on and re-implement more models that are based upon the Transformer architecture (e.g., BERT, GPT, T5), seeing how far I can get them to work on various tasks of interest.

## 8. How to Reproduce
Full code and instructions is in [this repository](https://github.com/Mahmh/ml-research-papers/tree/main/attention-is-all-you-need).

---

Thank you for reading! If you enjoyed this deep dive, feel free to:
- Share with a friend who is learning NLP.
- Star [this repository](https://github.com/Mahmh/ml-research-papers/tree/main).