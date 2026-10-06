# LLM Application Architecture Playbook

## Outcome

A production-grade, observable, and resilient LLM application architecture featuring hybrid retrieval (RAG), structured output validation, token budgeting, and automated evaluation.

---

## 1. High-Level Architecture

```text
[ Client Query ]
       │
       ▼
[ Guardrail & Input Sanitizer ] ──(Invalid)──> [ Fast Rejection / 400 ]
       │
       ▼
[ Semantic Cache (Redis) ] ──(Cache Hit)──> [ Cached Response ]
       │ (Cache Miss)
       ▼
[ Query Rewriter & Hybrid Search ]
       ├─ Dense Vector Search (HNSW / Cosine)
       └─ Sparse Keyword Search (BM25)
       │
       ▼
[ Cross-Encoder Re-Ranker ] (Top K: 20 → 5)
       │
       ▼
[ Context Assembler & Token Budget Gate ]
       │
       ▼
[ LLM Inference Engine ] (Streaming / Function Calling)
       │
       ▼
[ Structured Schema Validator (Zod / Pydantic) ]
       ├─ Valid   ──> [ Stream Response & Cache Write ]
       └─ Invalid ──> [ Retry / Fallback Handler ]
```

---

## 2. Core Pillars & Best Practices

### A. Hybrid Search & Retrieval (RAG)
1. **Never rely on pure vector search:** Dense embeddings capture semantic similarity but struggle with exact identifiers (e.g., product IDs, error codes, person names). Use hybrid search combining BM25 and vector embeddings with Reciprocal Rank Fusion (RRF).
2. **Re-Ranking is mandatory:** Dense retrieval should cast a wide net ($K \approx 20\text{--}50$), followed by a cross-encoder re-ranker to pick the top $3\text{--}5$ most relevant chunks.
3. **Hierarchical Chunking:** Store parent chunks (context) with child chunks (search index) to preserve surrounding context without token bloat.

### B. Output Contracts & Determinism
1. **Structured Outputs over Free-Form Text:** Use native JSON Schema / constrained decoding (e.g. OpenAI structured outputs, Anthropic tool use, Pydantic/Zod schemas).
2. **Defensive Validation:** Never assume LLM outputs adhere 100% to constraints. Parse with a runtime validator; if validation fails, invoke an automated self-repair loop (max 1 retry) before falling back.

### C. Guardrails & Token Budgeting
1. **Input Guardrails:** Strip prompt injection markers, delimiter hijacking, and system prompt override attempts.
2. **Context Window Protection:** Bounded sliding windows and token budgeting prevent runaway cost and latency degradation.

### D. Automated Evals & Observability
1. **Triad of RAG Metrics:**
   - **Context Relevance:** Did the retriever fetch only relevant documents?
   - **Groundedness / Faithfulness:** Is the generated answer strictly backed by the retrieved context?
   - **Answer Relevance:** Does the answer directly address the user's intent?
2. **Tracing:** Emit OpenTelemetry or LLM trace spans for every retrieval step, cache check, and model call.

---

## 3. Common Anti-Patterns to Avoid

| Anti-Pattern | Production Consequence | Mitigation |
|---|---|---|
| **Stuffing everything into context** | High latency, high costs, "lost-in-the-middle" recall drops | Strict chunking, re-ranking, token budget gates |
| **Pure semantic search for code/IDs** | Poor recall for function names, tickets, error strings | Hybrid search (BM25 + Dense vector + RRF) |
| **No output schema validation** | Silent runtime crashes downstream | Zod / Pydantic validation before consumption |
| **Prompt injection vulnerability** | Leaked system prompts, unauthorized tool invocations | Parameterized tool schemas, untrusted input delimiters |

---

## 4. Production Checklist

- [ ] Hybrid search (BM25 + Vector) configured with RRF fusion.
- [ ] Cross-encoder re-ranker integrated before LLM prompt injection.
- [ ] Strict output schema validation implemented with automated retry/fallback.
- [ ] Semantic caching implemented for frequent, deterministic queries.
- [ ] Tracing enabled across retrieval, reranking, and generation stages.
- [ ] Automated evaluation suite (e.g. RAGAS, deterministic test cases) running in CI.
