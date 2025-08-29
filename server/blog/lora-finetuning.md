---
title: LoRA vs. Full Fine-Tuning on 50,000 Examples
date: 2025-08-28
tags: [Fine-Tuning]
img: https://raw.githubusercontent.com/Mahmh/ml-research-papers/refs/heads/main/lora/thumbnail.png
excerpt: Compare LoRA and full fine-tuning on 50K samples, focusing on performance, speed, and resource efficiency, with tips for choosing the best method.
---

In this post, I'll walk you through my experiment comparing **LoRA** fine-tuning with **full fine-tuning** for the [`Qwen2.5-1.5B-Instruct`](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct) model (1.54B parameters) on the [`yahma/alpaca-cleaned`](https://huggingface.co/datasets/yahma/alpaca-cleaned) dataset (50,000 samples).

The goal:  
- See how LoRA stacks up against full fine-tuning in **performance**, **training time**, and **resource requirements**.  
- Provide practical tips for when to use one over the other.

## 1. Background
### What is LoRA?
LoRA (Low-Rank Adaptation) is a parameter-efficient fine-tuning technique that:
- Freezes the base model weights.
- Injects small trainable rank-decomposition matrices into certain layers.
- Greatly reduces the number of trainable parameters, memory footprint, and training time.

**Key advantage:** You can fine-tune large models on consumer-grade GPUs without modifying the original weights.

## 2. Experimental Setup
| Hyperparameter        | Value                                      |
| --------------------- | ------------------------------------------ |
| Base model            | `Qwen2.5-1.5B-Instruct` (1.54B parameters) |
| Dataset               | `yahma/alpaca-cleaned` (50K examples)      |
| Sequence length       | 256                                        |
| Epochs                | 3                                          |
| Batch size            | 4                                          |
| Learning rate         | 2e-4                                       |
| Optimizer             | AdamW                                      |
| Scaler                | GradScaler                                 |
| Weight decay          | 0.0                                        |
| Warmup steps          | 100                                        |
| Max gradient norm     | 1.0                                        |
| Gradient accumulation steps | 16                                   |
| Floating-point precision | 16-bit (half-precision)                 |
| Dataloader workers    | 16                                         |
| Validation split      | 2% of training dataset                     |
| Test split            | 2% of training dataset                     |
| GPU                   | RTX 4080 (16 GB)                           |
| Framework             | PyTorch + Transformers + PEFT              |

### LoRA Config
| Hyperparameter | Value |
|-----------|-------|
| Rank ($r$) | 8 |
| Alpha ($\alpha$)  | 32 |
| Dropout | 5% |
| Target modules | $Q_\text{proj},$ $K_\text{proj},$ $V_\text{proj},$ $O_\text{proj}$ |

### Full Fine-Tuning Config
Same as LoRA, but **no parameter freezing**; all weights are trainable.
> **Note**: Due to my GPU's low VRAM, I couldn't run the full fine-tuning code since it uses all the parameters of the model. However, I was able to train the model using LoRA without the out-of-memory error. LoRA only uses a subset of the original parameters, saving a lot of memory.

## 3. Training Time & Resource Usage
| Metric         | LoRA        |
| -------------- | ----------- |
| Peak VRAM usage | 13.4 GiB  |
| Time per epoch | 42 min |
| Training duration | 2.2 hr  |
| Percentage of original parameters trained | 0.14% |

## 4. Results
After training for **3 epochs** on the 50k dataset, below are the evaluation results for the last saved model. I log only the loss for training because it directly reflects learning progress at low cost and is essential for optimization. Other metrics are used for validation but are expensive to compute and not part of the training loop.

| Metric             | Training | Validation | Test    |
| ------------------ | ----- | ---------- | ------- |
| **Loss**           | 1.24  | 1.29       | 1.27    |
| **Perplexity**     | –     | 3.63       | 3.57    |
| **Token accuracy** | –     | 0.00861    | 0.00951 |
| **Bits per token**   | –     | 1.86       | 1.84    |
| **Tokens per second**   | –     | 458        | 473     |

![Training & Validation Loss Curve](https://raw.githubusercontent.com/Mahmh/ml-research-papers/refs/heads/main/lora/graph.png)

## 5. Observations
- **Computational feasibility**:
  When your GPU has relatively low VRAM, it can prevent you from running full fine-tuning. This is where LoRA solves the problem.
- **Metrics insight**:
  Train loss decreases by 5% (1.31 $\rightarrow$ 1.24) while val/test settled at 1.29/1.27 (perplexity $\approx$ 3.6), indicating good generalization.
  Updating only 0.14% of weights via 13.4 GiB peak VRAM still achieved perplexity ≈ 3.6 with a small train-val gap, showing LoRA's parameter-efficiency and implicit regularization when full fine-tuning isn't feasible.
- **Training speed**:
  In practice, LoRA's reduced parameter count results in faster training per epoch.
- **Practicality**:
  For rapid experimentation or limited-GPU setups, LoRA is a great choice.

## 6. Recommendations
Use **LoRA** if:
  * You have limited VRAM (<24 GB)
  * You want quick experiments
  * You need to store multiple task-specific variants

Use **full fine-tuning** if:
  * You have large GPU VRAM (>48 GB total)
  * You need every bit of performance for production
  * You plan to modify all layers heavily

LoRA models can be **merged** into the base model for deployment, but you can also keep the adapters separate and swap them easily.

For example, you can have 3 LoRA adapters and 1 base model, and you can combine each LoRA adapter with the base model for deploying them in their separate endpoints. That way, you can switch between LoRA adapters for different tasks while still reusing the same base model.

![Training & Validation Loss Curve](/img/blog-assets/lora-adapters.svg)

## 7. Next Steps
I plan to:
* Try **QLoRA** for lower memory usage.
* Test on other instruction datasets.

---

Thank you for reading! Making those analyses is fun. If you found this explanation helpful, feel free to:
- Share with the NLP community.
- Star [this repository](https://github.com/Mahmh/ml-research-papers/tree/main).
- [Work with me](/contact) – I'm always open to collaborations and freelance projects.