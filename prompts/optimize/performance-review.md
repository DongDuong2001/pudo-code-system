# Performance Review

> **Phase:** Optimize  
> **Tags:** `#performance` `#profiling` `#speed`  
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt **after a feature is working** to identify and fix performance bottlenecks. It's not about premature optimization — it's about ensuring your implementation meets performance requirements before shipping.

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CODE_TO_REVIEW}}` | The implementation to analyze | (paste code or file paths) |
| `{{PERFORMANCE_TARGETS}}` | Measurable goals | "Page load <2s, API response <200ms" |
| `{{CONTEXT}}` | Usage patterns and scale | "~1000 concurrent users, data sets up to 10k rows" |

## Prompt

```
Review the following code for performance:

{{CODE_TO_REVIEW}}

Performance targets: {{PERFORMANCE_TARGETS}}
Usage context: {{CONTEXT}}

Analyze and report:

1. **Bottleneck identification** — Where are the most likely 
   performance issues? Rate each as:
   - 🔴 Critical (will cause visible lag or timeouts)
   - 🟡 Moderate (noticeable under load)
   - 🟢 Minor (theoretical, unlikely to impact users)

2. **Rendering performance** (for frontend code):
   - Unnecessary re-renders?
   - Missing memoization (useMemo, useCallback, React.memo)?
   - Large component trees that should be lazy-loaded?
   - Bundle size concerns?

3. **Data performance** (for backend/data code):
   - N+1 query problems?
   - Missing database indexes?
   - Unbounded queries (no LIMIT)?
   - Unnecessary data transformations?

4. **Network performance**:
   - Excessive API calls?
   - Missing caching opportunities?
   - Large payloads that should be paginated?

5. **Recommended fixes** — For each issue, provide:
   - The specific code change
   - Expected improvement
   - Any trade-offs

Prioritize fixes by impact — most impactful first.
```

## Example Usage

### Input
```
Review the following code for performance:

[paste a React dashboard component that fetches and displays 
analytics data with charts]

Performance targets: Initial render <1.5s, chart interactions <100ms
Usage context: Dashboard viewed by ~200 users daily, data sets 
range from 100 to 50,000 data points

[rest of prompt...]
```

### Expected Output
Analysis identifying: 🔴 fetching all 50k points on mount (add pagination), 🔴 re-rendering all charts on any filter change (add React.memo), 🟡 chart library importing entire package (tree-shake), 🟢 date formatting in render loop (memoize). Each with specific code fixes.
