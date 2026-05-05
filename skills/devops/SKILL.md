# DevOps Engineering Skill
> Skill, Automation, Infrastructure, CI/CD

## Context
Use this prompt when you need to configure CI/CD pipelines, write Infrastructure as Code (IaC), set up containerization, or manage deployments. This skill ensures the AI applies DevOps best practices such as least privilege, immutability, and declarative configuration.

## Variables
- `{{infrastructure_tools}}`: The tools you are using (e.g., GitHub Actions, Terraform, Docker, Kubernetes).
- `{{environment}}`: Target environment (e.g., Production AWS EKS, Staging Vercel).
- `{{task_description}}`: What needs to be automated or provisioned.

## Prompt
```text
Adopt the persona of a Senior DevOps Engineer. I need assistance with the following DevOps task:
Task: {{task_description}}

We are using the following infrastructure stack and tools:
{{infrastructure_tools}}

The target deployment environment is:
{{environment}}

Please provide a solution that adheres to the following DevOps principles:
1. **Infrastructure as Code (IaC):** Provide declarative configuration files, not manual step-by-step UI instructions.
2. **Security & Least Privilege:** Ensure IAM roles, service accounts, and network policies strictly follow the principle of least privilege. Do not hardcode secrets.
3. **Idempotency:** Ensure that running the automation or scripts multiple times results in the same state without causing errors.
4. **Observability:** If applicable, include health checks or logging configurations.

Walk me through the configuration, explaining any critical security or performance decisions.
```

## Example Usage

**Input:**
```text
Adopt the persona of a Senior DevOps Engineer. I need assistance with the following DevOps task:
Task: Create a CI pipeline that runs unit tests, builds a Docker image, and pushes it to AWS ECR.

We are using the following infrastructure stack and tools:
GitHub Actions, Docker, AWS ECR

The target deployment environment is:
AWS (us-east-1)

Please provide a solution that adheres to the following DevOps principles:
[...rest of prompt...]
```
