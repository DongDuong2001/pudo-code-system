# Terraform Skill
> Skill, IaC, Terraform, Infrastructure as Code, Cloud

## Context
Use this skill when writing, reviewing, or debugging Terraform infrastructure code. This covers module design, remote state management, workspace strategies, variable validation, provider pinning, and secure handling of sensitive outputs. The AI will act as a Terraform specialist who follows HashiCorp best practices and understands the trade-offs between different state backend and module strategies.

## Variables
- `{{cloud_provider}}`: Target cloud (e.g., AWS, GCP, Azure, or multi-cloud).
- `{{resource_goal}}`: What infrastructure to provision (e.g., VPC with public/private subnets, EKS cluster, RDS PostgreSQL, S3 + CloudFront).
- `{{environment_strategy}}`: How environments are separated (e.g., separate workspaces, separate directories, separate state files per environment).
- `{{existing_modules}}`: Any existing modules to reuse (e.g., `terraform-aws-modules/vpc/aws`, internal `modules/rds`).

## Prompt
```text
Adopt the persona of a Senior Terraform / Infrastructure as Code Engineer. I need to provision the following infrastructure:

Cloud Provider: {{cloud_provider}}
Resource Goal: {{resource_goal}}
Environment Strategy: {{environment_strategy}}
Existing Modules to Leverage: {{existing_modules}}

Design the Terraform configuration adhering to these standards:

1. **Module Structure:** Separate reusable logic into child modules (`modules/<name>/`). The root module (`environments/<env>/`) should only orchestrate modules and set environment-specific variables. Never put resource blocks directly in the root if they can be modularized.
2. **Remote State:** Use a remote backend (S3 + DynamoDB for AWS, GCS for GCP, or Terraform Cloud). Enable state locking. Never use local state for shared infrastructure. Provide the backend configuration block.
3. **Provider Pinning:** Always pin providers to a minor version constraint (e.g., `~> 5.0`). Pin the Terraform version with `required_version`. Explain why unpinned providers are dangerous.
4. **Variable Validation:** Add `validation` blocks to all variables with constrained values (e.g., environment names, instance types). Use `sensitive = true` for secrets. Never set default values for secrets.
5. **Outputs:** Define useful outputs (e.g., VPC ID, cluster endpoint, database hostname). Mark sensitive outputs with `sensitive = true`. Explain how outputs are consumed by other modules or pipelines.
6. **Security:** Use IAM roles with least-privilege policies. Avoid `*` actions or resources in policies unless explicitly justified. Enable encryption at rest and in transit for all data stores.
7. **Idempotency:** Ensure the plan is clean on re-runs. Explain any resources that require `lifecycle { prevent_destroy = true }` or `create_before_destroy = true`.

Provide the full module directory structure and all `.tf` files with inline comments.
```

## Example Usage

**Input:**
```text
Adopt the persona of a Senior Terraform / Infrastructure as Code Engineer. I need to provision the following infrastructure:

Cloud Provider: AWS
Resource Goal: A production-grade VPC with public/private subnets, an EKS cluster with managed node groups, and an RDS PostgreSQL instance in a private subnet.
Environment Strategy: Separate directories per environment (environments/staging, environments/production) sharing child modules.
Existing Modules to Leverage: terraform-aws-modules/vpc/aws, terraform-aws-modules/eks/aws

Design the Terraform configuration adhering to these standards:
[...rest of prompt...]
```

**Expected Output:**
- Directory tree: `environments/production/main.tf`, `environments/production/variables.tf`, `modules/rds/main.tf`, etc.
- Root module orchestrating `vpc`, `eks`, and `rds` child modules
- S3 + DynamoDB remote state backend with state locking
- `aws_db_instance` in private subnet with `storage_encrypted = true` and no public access
- IAM role for EKS node groups with minimal permissions (no `AdministratorAccess`)
- `sensitive = true` on the RDS password output
