# GitLab CI/CD Skill
> Skill, CI/CD, GitLab, Pipelines

## Context
Use this skill when designing or debugging GitLab CI/CD pipelines. This covers `.gitlab-ci.yml` configuration, GitLab Runners, pipeline stages, DAG (Directed Acyclic Graph) pipelines, merge request pipelines, include/extends patterns, and environment-based deployments. The AI will act as a specialist in GitLab CI idioms and best practices.

## Variables
- `{{pipeline_trigger}}`: What triggers the pipeline (e.g., `merge_request_event`, `push to main`, `schedule`, `manual`).
- `{{pipeline_goal}}`: What the pipeline accomplishes (e.g., lint, test, build Docker image, deploy to Kubernetes).
- `{{tech_stack}}`: Language/framework/tooling (e.g., Python 3.11, Docker, Helm, AWS).
- `{{runner_type}}`: Runner executor type (e.g., `docker`, `shell`, `kubernetes`, GitLab-hosted SaaS runner).
- `{{environment}}`: Target deployment environment (e.g., `production` on GKE, `staging` on a VPS).

## Prompt
```text
Adopt the persona of a Senior GitLab CI/CD Engineer. I need to design the following pipeline:

Goal: {{pipeline_goal}}

Trigger: {{pipeline_trigger}}

Tech Stack: {{tech_stack}}

Runner Type: {{runner_type}}

Target Environment: {{environment}}

Design the `.gitlab-ci.yml` configuration adhering to these standards:

1. **Pipeline Structure:** Define clear `stages`. Use `needs:` for DAG parallelism where jobs don't require a full prior stage to complete. Prefer `extends:` and `!reference` over copy-pasting job templates.
2. **Security:** Use CI/CD Variables (masked and protected) for all secrets. Use `environment:` with protected branches for production. Apply `rules:` carefully to prevent accidental production deployments from feature branches. Never echo secrets in logs.
3. **Efficiency:** Use `cache:` with a keyed strategy (e.g., `$CI_COMMIT_REF_SLUG`) to share dependencies across stages. Use `artifacts:` with `expire_in` to pass build outputs between jobs without redundant builds.
4. **Reusability:** Modularize with `include: - project:` or `include: - local:` to pull shared job templates. Use `trigger:` for multi-project pipelines if applicable.
5. **Merge Request Workflows:** Include a `rules: - if: $CI_PIPELINE_SOURCE == "merge_request_event"` block for MR-only jobs like linting and short tests.
6. **Observability:** Use `after_script:` for cleanup and failure notifications. Tag jobs with appropriate `tags:` to route them to the correct runner.

Provide the full `.gitlab-ci.yml` with comments on every structural and security decision.
```

## Example Usage

**Input:**
```text
Adopt the persona of a Senior GitLab CI/CD Engineer. I need to design the following pipeline:

Goal: Run lint and tests on MRs, build a Docker image and push to GitLab Container Registry on main, deploy to staging automatically and production manually.

Trigger: merge_request_event and push to main

Tech Stack: Python 3.11 (FastAPI), Docker, GitLab Container Registry, Kubernetes

Runner Type: GitLab-hosted SaaS runner (docker executor)

Target Environment: Staging (auto) and Production (manual) on GKE

Design the `.gitlab-ci.yml` configuration adhering to these standards:
[...rest of prompt...]
```

**Expected Output:**
A complete `.gitlab-ci.yml` with:
- `stages: [lint, test, build, deploy-staging, deploy-production]`
- DAG `needs:` so `build` starts as soon as `test` finishes, not waiting for all of `test` stage
- Docker image tagged with `$CI_COMMIT_SHORT_SHA` for immutability
- `environment: production` with `when: manual` and protected branch rules
- `cache:` keyed on `$CI_COMMIT_REF_SLUG` for pip dependencies
