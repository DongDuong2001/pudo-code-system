# Risk Assessment

> **Phase:** Plan  
> **Tags:** `#risk` `#planning` `#premortem`  
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt **after creating an implementation plan** to stress-test it before you start building. A premortem catches issues when they're cheap to fix (in planning) rather than expensive to fix (in production).

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{IMPLEMENTATION_PLAN}}` | The plan you've already created | (paste your plan) |
| `{{CODEBASE_CONTEXT}}` | Relevant details about the existing system | "Next.js 14 monorepo, 50k LOC, 3 developers" |
| `{{TIMELINE}}` | How much time you have | "Must ship by end of sprint (5 days)" |

## Prompt

```
I've created the following implementation plan:

{{IMPLEMENTATION_PLAN}}

Codebase context: {{CODEBASE_CONTEXT}}
Timeline: {{TIMELINE}}

Perform a premortem analysis. Assume the project has FAILED and 
work backward to explain why. Cover:

1. **Technical risks** — What could break, conflict, or not work 
   as expected? Rate each as LOW / MEDIUM / HIGH.
2. **Dependency risks** — Are we relying on external services, 
   libraries, or APIs that could change or fail?
3. **Integration risks** — What existing code could this change 
   break? What side effects might occur?
4. **Timeline risks** — Is this plan realistic for the timeline? 
   What could cause delays?
5. **Knowledge gaps** — What do we not know that could derail us?

For each risk:
- Describe the risk
- Rate the likelihood (LOW / MEDIUM / HIGH)
- Rate the impact (LOW / MEDIUM / HIGH)
- Suggest a mitigation strategy

Present as a risk matrix table.
```

## Example Usage

### Input
```
I've created the following implementation plan:

Plan: Add OAuth2 login (Google, GitHub) to our existing 
email/password auth system using NextAuth.js v5.

Steps:
1. Install NextAuth.js v5
2. Configure Google and GitHub providers
3. Create auth API route
4. Update login page with social buttons
5. Migrate existing sessions

Codebase context: Next.js 14, Supabase Auth currently handles 
email/password, 2000 active users
Timeline: Must ship by end of sprint (5 days)

[rest of prompt...]
```

### Expected Output
A risk matrix identifying: session migration data loss (HIGH impact), NextAuth + Supabase auth conflict (MEDIUM likelihood), Google OAuth consent screen approval delay (HIGH likelihood for timeline), and mitigation strategies for each.
