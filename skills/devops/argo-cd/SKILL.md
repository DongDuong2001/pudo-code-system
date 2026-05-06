# Argo CD Skill
> Skill, GitOps, Argo CD, Kubernetes, Continuous Delivery

## Context
Use this skill when designing GitOps delivery workflows with Argo CD. This covers Application and AppProject CRDs, the App of Apps pattern, sync policies and waves, health checks, RBAC configuration, and integrating Argo CD into a multi-environment or multi-cluster strategy. The AI will act as a GitOps specialist who understands Argo CD's reconciliation model and declarative configuration philosophy.

## Variables
- `{{application_name}}`: The name of the Argo CD Application (e.g., `my-api`, `frontend`).
- `{{source_repo}}`: The Git repository URL that Argo CD will track.
- `{{target_path}}`: The path in the repo containing the manifests or Helm chart (e.g., `manifests/production`, `charts/my-api`).
- `{{destination_cluster}}`: The target Kubernetes cluster and namespace (e.g., `in-cluster`, `https://k8s.prod.example.com`).
- `{{sync_strategy}}`: Desired sync behavior (e.g., `automated with self-heal and prune`, `manual`).

## Prompt
```text
Adopt the persona of a Senior GitOps / Argo CD Engineer. I need to configure the following Argo CD setup:

Application: {{application_name}}
Source Repository: {{source_repo}}
Manifest Path: {{target_path}}
Destination Cluster/Namespace: {{destination_cluster}}
Sync Strategy: {{sync_strategy}}

Design the Argo CD configuration adhering to these standards:

1. **Application CRD:** Write the `Application` manifest in full. Define `spec.source` (repo, path, targetRevision) and `spec.destination` (server, namespace) precisely. Use `spec.project` to scope it to an AppProject.
2. **Sync Policy:** Configure `automated.selfHeal: true` and `automated.prune: true` only when explicitly requested. Explain the risk of pruning. Use `syncOptions` like `CreateNamespace=true` and `ServerSideApply=true` where appropriate.
3. **App of Apps Pattern:** If managing multiple applications, use the App of Apps pattern — a parent Application pointing to a directory of child Application manifests.
4. **Sync Waves & Hooks:** Use `argocd.argoproj.io/sync-wave` annotations to control the order of resource creation (e.g., CRDs before Deployments, Secrets before Pods). Use `argocd.argoproj.io/hook: PreSync` for database migrations.
5. **Health Checks:** Identify which resources need custom health checks and provide the Lua script if necessary.
6. **RBAC:** Define the `AppProject` with `sourceRepos`, `destinations`, and `clusterResourceWhitelist` to enforce least-privilege GitOps boundaries.
7. **Secrets Management:** Never store secrets in Git. Recommend an integration pattern (e.g., External Secrets Operator, Sealed Secrets, or Vault Agent).

Provide all YAML manifests with comments on every structural and security decision.
```

## Example Usage

**Input:**
```text
Adopt the persona of a Senior GitOps / Argo CD Engineer. I need to configure the following Argo CD setup:

Application: payments-api
Source Repository: https://github.com/my-org/gitops-repo
Manifest Path: apps/payments-api/overlays/production
Destination Cluster/Namespace: https://k8s.prod.example.com / payments
Sync Strategy: automated with self-heal, no auto-prune (manual prune for safety)

Design the Argo CD configuration adhering to these standards:
[...rest of prompt...]
```

**Expected Output:**
- `Application` CRD for `payments-api` with Kustomize overlay source
- `AppProject` CRD scoping the app to the `payments` namespace only
- Sync wave annotations: CRDs at wave `-1`, Namespace at `0`, Secrets at `1`, Deployment at `2`
- A `PreSync` hook Job for running database migrations before the Deployment rolls out
- External Secrets Operator pattern explained for production secret injection
