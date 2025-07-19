---
title: BERT vs. BiLSTM vs. Logistic Regression on IMDb Sentiment Analysis  
date: 2025-07-19
tags: [NLP, Transformer, Sentiment Analysis] 
img: https://raw.githubusercontent.com/Mahmh/ml-research-papers/refs/heads/main/bert/thumbnail.svg
excerpt: A head-to-head comparison of BERT, BiLSTM, and Logistic Regression on the Stanford IMDb movie review dataset—code, configs, and evaluation metrics.  
---

## 1. Introduction  
In this project, I fine-tuned and evaluated three very different models on the [Stanford IMDb movie review sentiment analysis dataset](https://huggingface.co/datasets/stanfordnlp/imdb) (50,000 labeled examples). My goal is to compare how a deep bidirectional Transformer (BERT), a bidirectional recurrent neural network (BiLSTM), and a classical baseline (Logistic Regression) fare on a standard text-classification task—sentiment analysis.

## 2. Background & Motivation  
- **BERT** (Devlin et al., 2018) set a new state of the art by pre-training deep bidirectional Transformers on massive corpora.  
- **BiLSTM** networks remain a strong choice for sequence modeling with far fewer parameters.  
- **Logistic Regression** provides a simple, interpretable baseline using bag-of-words or TF-IDF features.  
- Comparing these approaches side by side helps illustrate the trade-offs between model complexity, training time, and performance on real-world data.

## 3. Model Implementation  
- **BERT**: Fine-tuned `bert-base-uncased` using Hugging Face’s Transformers library.  
- **BiLSTM**: A 2-layer bidirectional LSTM with embedding lookup, dropout, and a linear classification head.  
- **Logistic Regression**: PyTorch-implemented neural network on TF-IDF–extracted features.

See full code in [this repository](https://github.com/Mahmh/ml-research-papers/blob/main/bert).

## 4. Training Setup  
- **Hardware:** 1 NVIDIA RTX 4080 (16 GB)
- **Checkpointing:** Saved model & optimizer state each epoch.
- **Total Training & Evaluation Times:**
  - BERT: 3 epochs (7 min)
  - BiLSTM: 10 epochs (6 min)
  - Logistic Regression: 10 epochs (31 s)

| Hyperparameter       | BERT          | BiLSTM        | Logistic Regression |
| ------------------------ | ----------------- | ----------------- | --------------------- |
| Batch size             | 32                | 32                | 32                      |
| Epochs                 | 3                 | 10                | 10                      |
| Optimizer              | AdamW             | Adam              | SGD
| Learning rate          | $2 \times 10^{-5}$| $1 \times 10^{-4}$| 1.0                     |
| Max grad-norm          | 1.0               | 5.0               | —                       |
| Adam betas             | (0.9, 0.98)       | (0.9, 0.999)      | —                       |
| Epsilon                | $1 \times 10^{-6}$| $1 \times 10^{-8}$| —                       |
| Weight decay           | 0.01              | 0.0               | 0.0                     |
| Warm-up steps          | 0                 | 500               | —                       |
| Dropout probability    | 0.1               | 0.4               | —                       |
| N-gram range           | —                 | —                 | (1, 1)                  |
| Pretrained model       | `bert-base-uncased` | —                 | —                     |
| Tokenizer              | `BertTokenizerFast` | `BertTokenizerFast` | TF-IDF              |

## 5. Results & Benchmarks
### 5.1 BERT
Example inference snippet:
```yml
Input movie review: Thanks for wasting two hours of my life.
Output sentiment: Negative

Input movie review: Despite a slow start and a few cliché moments, the film eventually finds its heart and delivers an emotional payoff.
Output sentiment: Positive

Input movie review: Absolutely loved it. Great acting, great story, and stunning visuals.
Output sentiment: Positive
```

| Metric   | Train    | Validation | Test     |
|:-------------|:------------:|:--------------:|:------------:|
| Loss         | 0.09737      | 0.37597        | 0.35345      |
| Accuracy     | 96.89 %      | 88.96 %        | 89.07 %      |
| Precision    | 96.72 %      | 89.59 %        | 88.27 %      |
| Recall       | 97.07 %      | 88.31 %        | 90.12 %      |
| F1           | 96.90 %      | 88.94 %        | 89.19 %      |

![BERT loss curve](https://raw.githubusercontent.com/Mahmh/ml-research-papers/refs/heads/main/bert/graphs/bert_loss_curve.png)

### 5.2 BiLSTM
Example inference snippet:
```yml
Input movie review: Thanks for wasting two hours of my life.
Output sentiment: Positive

Input movie review: Despite a slow start and a few cliché moments, the film eventually finds its heart and delivers an emotional payoff.
Output sentiment: Positive

Input movie review: Absolutely loved it. Great acting, great story, and stunning visuals.
Output sentiment: Positive
```

| Metric   | Train    | Validation | Test     |
|:-------------|:------------:|:--------------:|:------------:|
| Loss         | 0.24535      | 0.48259        | 0.53773      |
| Accuracy     | 90.43 %      | 82.16 %        | 80.22 %      |
| Precision    | 89.32 %      | 82.94 %        | 79.94 %      |
| Recall       | 91.83 %      | 81.23 %        | 80.67 %      |
| F1           | 90.56 %      | 82.07 %        | 80.31 %      |

![BiLSTM loss curve](https://raw.githubusercontent.com/Mahmh/ml-research-papers/refs/heads/main/bert/graphs/bilstm_loss_curve.png)

### 5.3 Logistic Regression
Example inference snippet:
```yml
Input movie review: Thanks for wasting two hours of my life.
Output sentiment: Positive

Input movie review: Despite a slow start and a few cliché moments, the film eventually finds its heart and delivers an emotional payoff.
Output sentiment: Positive

Input movie review: Absolutely loved it. Great acting, great story, and stunning visuals.
Output sentiment: Positive
```

| Metric   | Train   | Validation | Test    |
|:-------------|:-----------:|:--------------:|:-----------:|
| Loss         | 0.26585     | 0.29855        | 0.31746     |
| Accuracy     | 91.59 %     | 88.68 %        | 87.94 %     |
| Precision    | 91.25 %     | 88.77 %        | 88.09 %     |
| Recall       | 91.98 %     | 88.70 %        | 87.75 %     |
| F1           | 91.61 %     | 88.74 %        | 87.92 %     |

![Logistic regression loss curve](https://raw.githubusercontent.com/Mahmh/ml-research-papers/refs/heads/main/bert/graphs/lr_loss_curve.png)

## 6. Conclusions

1. **Model complexity vs. performance:** BERT achieves the highest overall accuracy and F1 score, demonstrating the power of deep contextual embeddings. However, this comes at the cost of longer training times and significantly higher computational resources. The training curve also indicates overfitting after a few epochs, which may require regularization or early stopping.

2. **Sequence modeling tradeoffs:** While BiLSTM is theoretically superior to Logistic Regression due to its ability to model word order and sequential dependencies, it underperformed on this dataset—likely due to overfitting or insufficient hyperparameter tuning. Its validation and test losses remained relatively high compared to its training loss, suggesting limited generalization.

3. **Strong baselines still matter:** Logistic Regression performed surprisingly well, achieving competitive accuracy and F1 scores with minimal training time and high generalization. Its performance highlights that simple models, when properly tuned, can be strong contenders on certain text classification tasks, especially when data is linearly separable or well-represented in feature space.


## 7. Lessons Learned & Future Work
- **Lesson learned:** Proper tokenization and sequence length choices have a big impact on all models.
- **Future Work:** I plan on exploring more novel models and comparing them to prior state-of-the-art models. 

## 8. How to Reproduce
Full code & instructions are in [this repository](https://github.com/Mahmh/ml-research-papers/blob/main/bert).

---

Thank you for reading! If you found this comparison useful, feel free to:

- Share with the NLP community.
- Star [this repository](https://github.com/Mahmh/ml-research-papers/tree/main).
- [Work with me](/contact) – I'm open to collaborations and freelance projects.