# Jenkins Skill
> Skill, CI/CD, Jenkins, Pipelines, Automation

## Context
Use this skill when designing or debugging Jenkins pipelines. This covers Declarative Jenkinsfile syntax, shared libraries, agent configuration, parallel stages, credentials binding, and integrating Jenkins into a broader CI/CD ecosystem. The AI will act as a Jenkins specialist who knows the difference between Declarative and Scripted syntax, and when to use each.

## Variables
- `{{pipeline_goal}}`: What the pipeline accomplishes (e.g., run tests, build artifact, deploy to Tomcat, publish to Nexus).
- `{{agent_type}}`: Jenkins agent/executor type (e.g., `any`, `docker { image 'node:20' }`, `label 'linux-k8s'`).
- `{{tech_stack}}`: Language/framework/tooling (e.g., Java 17 with Maven, Node.js, Docker).
- `{{scm_tool}}`: Source control system (e.g., GitHub, Bitbucket, GitLab).
- `{{environment}}`: Deployment target (e.g., `staging Tomcat server`, `production Kubernetes namespace`).

## Prompt
```text
Adopt the persona of a Senior Jenkins Engineer. I need to design the following pipeline:

Goal: {{pipeline_goal}}
Agent: {{agent_type}}
Tech Stack: {{tech_stack}}
SCM: {{scm_tool}}
Target Environment: {{environment}}

Design the Jenkinsfile using Declarative syntax adhering to these standards:

1. **Pipeline Structure:** Use `pipeline { stages { stage('...') { steps {...} } } }` Declarative syntax. Organize stages logically: Checkout → Build → Test → Scan → Publish → Deploy. Use `parallel { }` blocks only when stages are truly independent.
2. **Agent Strategy:** Define a top-level agent and override per-stage where needed (e.g., a Docker agent for building, a specific label for deployment). Use ephemeral Docker agents to avoid environment drift.
3. **Credentials & Secrets:** Use `credentials()` binding in the `environment {}` block or `withCredentials([...])` wrapper. Never use `sh 'echo $SECRET'`. Mask all sensitive values.
4. **Error Handling:** Use `post { always {...} failure {...} success {...} }` blocks for notifications and cleanup. Use `catchError(buildResult: 'UNSTABLE')` for non-fatal failures (e.g., flaky tests).
5. **Shared Libraries:** If logic is reused across pipelines, extract it into a Shared Library (`@Library('my-lib')`) with a `vars/` function. Provide the library structure.
6. **Build Artifacts:** Archive artifacts with `archiveArtifacts`. Use `stash/unstash` to pass build outputs between stages running on different agents.
7. **Input Gates:** Use `input` step with `submitter` restriction for manual production approval.

Provide the complete `Jenkinsfile` with inline comments explaining non-obvious decisions.
```

## Example Usage

**Input:**
```text
Adopt the persona of a Senior Jenkins Engineer. I need to design the following pipeline:

Goal: Build a Maven JAR, run unit and integration tests in parallel, publish to Nexus, and deploy to a staging Kubernetes cluster with manual approval for production.
Agent: docker { image 'maven:3.9-eclipse-temurin-17' } for build/test, label 'k8s-deployer' for deploy
Tech Stack: Java 17, Maven, Docker, Nexus, Kubernetes (kubectl + Helm)
SCM: GitHub (webhook trigger on push to main and PRs)
Target Environment: Staging (auto) and Production (manual) on Kubernetes

Design the Jenkinsfile using Declarative syntax adhering to these standards:
[...rest of prompt...]
```

**Expected Output:**
- Declarative `Jenkinsfile` with stages: `Checkout`, `Build`, `Test` (parallel unit + integration), `Publish to Nexus`, `Deploy Staging`, `Approval Gate`, `Deploy Production`
- `withCredentials([usernamePassword(credentialsId: 'nexus-creds')])` for Nexus publishing
- `input message: 'Deploy to production?', submitter: 'ops-team'` gate
- `post { failure { slackSend(...) } }` notification block
- `stash`/`unstash` for passing the built JAR from the Maven agent to the K8s deployer agent
