# GitHub Actions Skill
> Skill, CI/CD, GitHub Actions, Automation

## Context
Use this skill when you need to design or debug GitHub Actions workflows. This covers building CI pipelines, CD release pipelines, matrix build strategies, reusable workflows, and secure secrets management via OIDC. The AI will act as a specialist who understands GitHub Actions-specific idioms, runner environments, and the Actions marketplace ecosystem.

## Variables
- `{{workflow_trigger}}`: What triggers the workflow (e.g., `push to main`, `pull_request`, `workflow_dispatch`, `schedule`).
- `{{pipeline_goal}}`: What the workflow should accomplish (e.g., run tests, build and push Docker image, deploy to AWS).
- `{{tech_stack}}`: The language/framework/tooling used (e.g., Node.js 20, Docker, AWS ECR, Terraform).
- `{{environment}}`: Target deployment environment (e.g., `production` on AWS EKS, `staging` on Vercel).

## Prompt
```text
Adopt the persona of a Senior GitHub Actions Engineer. I need to build the following workflow:

Goal: {{pipeline_goal}}

Trigger: {{workflow_trigger}}

Tech Stack: {{tech_stack}}

Target Environment: {{environment}}

Design this GitHub Actions workflow adhering to these standards:

1. **Workflow Structure:** Use proper `jobs` with clear `needs` dependencies. Group steps logically (setup, build, test, deploy). Use `environment:` protection rules for production deployments.
2. **Security:** Use OIDC (`permissions: id-token: write`) instead of long-lived credentials wherever possible. Store all secrets in GitHub Secrets — never hardcode them. Pin all third-party actions to a full commit SHA, not a tag.
3. **Efficiency:** Use `actions/cache` for dependency caching (npm, pip, Go modules, etc.). Use matrix builds (`strategy.matrix`) only when genuinely needed. Set appropriate `timeout-minutes` on jobs.
4. **Reusability:** If the workflow is complex, break it into a reusable workflow (`workflow_call`) or composite action.
5. **Observability:** Add `if: failure()` steps to report failures (e.g., post to Slack or create a GitHub issue). Use `::notice::`, `::warning::`, and `::error::` annotations where helpful.

Provide the full `.github/workflows/<name>.yml` file with inline comments explaining every non-obvious decision, especially around security and caching choices.
```

## Example Usage

**Input:**
```text
Adopt the persona of a Senior GitHub Actions Engineer. I need to build the following workflow:

Goal: Run unit tests, build a Docker image, push to AWS ECR, and deploy to EKS on merge to main.

Trigger: push to main branch

Tech Stack: Node.js 20, Docker, AWS ECR, Helm, Kubernetes (EKS)

Target Environment: Production on AWS EKS (us-east-1)

Design this GitHub Actions workflow adhering to these standards:
[...rest of prompt...]
```

**Expected Output:**
A complete `.github/workflows/deploy.yml` with:
- Separate `test`, `build`, and `deploy` jobs with `needs` chaining
- OIDC-based AWS authentication via `aws-actions/configure-aws-credentials`
- Docker layer caching via `actions/cache` or `cache-from`
- Helm deploy step gated behind a `production` environment requiring manual approval
- All third-party actions pinned to commit SHAs
