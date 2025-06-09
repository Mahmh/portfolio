---
title: How I Built My AI-Powered Search App
date: 2025-06-07
tags: [AI, Search, Python]
img: /img/blog/ai-powered-search-app.png
excerpt: A deep dive into building semantic search using sentence-transformers and vector databases.
---

This post covers my full-stack journey building a semantic search tool using:

- **FastAPI** as the backend
- **`sentence-transformers`** for generating text embeddings
- **ChromaDB** for fast vector similarity search
- **Vite + React (Preact)** for a responsive frontend

## The Problem

Traditional keyword-based search often fails to return relevant results unless users use the exact terms present in your data. I wanted to change that — enabling *semantic* understanding of user queries.

> "Users don’t think in keywords. They think in intent."

So, instead of comparing raw text, we compare **meaning** using vector embeddings.

## Stack Overview

The architecture is split into 3 layers:

1. **Client:** Sends natural language queries to the API.
2. **Server (FastAPI):** Embeds queries and performs vector search.
3. **ChromaDB:** Retrieves the most semantically similar documents.

## Embedding the Courses

I use `sentence-transformers` from Hugging Face to turn course descriptions into numerical vectors.

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode([
    "Learn neural networks from scratch",
    "Intro to web development using HTML and CSS"
])
```