---
title: Unlocking the Power of Chain‑of‑Thought Reasoning
date: 2025-07-24
tags: [NLP, LLM, Prompting, Reasoning]
img: https://raw.githubusercontent.com/Mahmh/ml-research-papers/refs/heads/main/cot-reasoning/thumbnail.png
excerpt: How "Let's think step by step" helps language models solve multi‑step problems. Real examples and simple tips.
---

## 1. Introduction
When you ask an LLM a math or logic puzzle, it can give a wrong answer even if it "knows" the facts. [Chain‑of‑Thought (CoT)](https://arxiv.org/pdf/2201.11903) prompting fixes this by asking the model to lay out its steps in words before giving the final answer. This short trick can make a big difference. Below you'll see real prompt examples, both zero‑shot and few‑shot, and learn when to use each.

## 2. Why CoT Helps
LLMs predict one token at a time. They don't break big problems into small parts automatically. When you add a prompt like "Let's think step by step," you guide the model to split the task into pieces it can handle one at a time. That makes it easier for the model to get the right answer.

## 3. Example: Zero‑Shot CoT
In zero‑shot CoT, you give the question and a short cue. No extra examples needed.

```yml
Your prompt: If there are 23 cookies and you eat 7, how many are left?
```
```yml
LLM response:
Let's think step by step.
1. Start with 23 cookies.
2. Subtract 7 cookies.
3. 23 − 7 = 16.
Answer: 16
```

You'll see the model write out the steps, then give the correct result. Without the cue, it might guess "14" or "15."

## 4. Example: Few‑Shot CoT
Few‑shot CoT means you first show 2–4 worked examples, then ask your own question.

```yml
Example 1
Q: Sara has 5 apples and buys 8 more. How many apples does she have?
A: Let's think step by step.
   1. She started with 5 apples.
   2. She added 8 apples.
   3. 5 + 8 = 13 apples.
   Answer: 13

Example 2
Q: Tim reads 12 pages on Monday and 15 pages on Tuesday. How many pages in total?
A: Let's think step by step.
   1. He read 12 pages on Monday.
   2. He read 15 pages on Tuesday.
   3. 12 + 15 = 27 pages.
   Answer: 27

Now you try:
Q: A box has 30 pens. Jane gives away 9 pens. How many remain?
A: Let's think step by step.
```

The model continues with steps and then the answer. Because the model predicts each word from all the words before it, showing it examples of step‑by‑step solutions teaches it to repeat that pattern.

## 5. Applications Beyond Math
CoT works not only on arithmetic. You can use it for:

* Commonsense questions: "Why might someone bring an umbrella on a sunny day?"
* Logic puzzles: "Which of these clues tells you who has the red hat?"
* Code planning: "Outline the steps to sort a list of numbers in Python."

Quick logic example:
```yml
Q: Alice is older than Bob. Bob is older than Carol. Who is the youngest?
A: Let's think step by step.
   1. Alice > Bob in age.
   2. Bob > Carol in age.
   3. So Carol is younger than Bob and Alice.
   Answer: Carol
```

## 6. Tips for Using CoT
1. **Start simple.** Try zero‑shot CoT first.
2. **Add a few examples.** If you need more accuracy, use few‑shot CoT with 3–5 examples.
3. **Watch your token usage.** Long reasoning chains use more tokens (and cost more). Also, LLMs rely most heavily on the most recent context, so you can trim or summarize the chain once it's working to save tokens.

## 7. Limitations
CoT isn't perfect. It can be slow since it generates extra text. Chains can also be wrong or misleading. Always check the final answer, not just the steps. And some tasks (like creative writing) don't benefit much from step‑by‑step reasoning.

In addition, note that LLMs usually give more weight to the words closest to where they're generating, and less to words from earlier in the text.

## 8. Conclusion
Chain‑of‑Thought prompting is a quick way to boost your model's reasoning. By asking the model to explain its steps, you tap into its hidden problem‑solving skills. Try these examples in your next project and see how much more reliable your LLM can become.

## 9. Try It Yourself
Want to see CoT in action? Copy‑and‑paste the snippet below (or grab the full notebook on [GitHub](https://github.com/Mahmh/ml-research-papers/tree/main/cot-reasoning)) and swap in your API key:
```py
from google import genai
client = genai.Client(api_key="YOUR_KEY_HERE")
prompt = "If there are 23 cookies and you eat 7, how many are left? Let's think step by step."
print(client.models.generate_content(model="gemini-1.5-flash", contents=prompt).text)
```

---

Thank you for reading! If you found this explanation helpful, feel free to:
- Share with the NLP community.
- Star [this repository](https://github.com/Mahmh/ml-research-papers/tree/main).
- [Work with me](/contact) – I'm open to collaborations and freelance projects.