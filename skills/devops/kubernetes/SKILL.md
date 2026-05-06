# Kubernetes Skill
> Skill, Kubernetes, Orchestration, Helm, Cloud Native

## Context
Use this skill when writing, reviewing, or debugging Kubernetes manifests and Helm charts. This covers Deployment, Service, Ingress, ConfigMap, and Secret resources; RBAC configuration; resource requests and limits; liveness/readiness/startup probes; Horizontal Pod Autoscaler (HPA); and Helm chart structure. The AI will act as a Kubernetes specialist who understands the operational implications of every manifest field.

## Variables
- `{{application_name}}`: Name of the application/service being deployed (e.g., `payments-api`, `frontend`).
- `{{workload_type}}`: Type of workload (e.g., `Deployment`, `StatefulSet`, `DaemonSet`, `CronJob`).
- `{{resource_requirements}}`: Expected traffic and resource profile (e.g., `low traffic — 100m CPU / 128Mi memory`, `high traffic — autoscaling 3-20 replicas`).
- `{{cluster_context}}`: Cluster details (e.g., AWS EKS 1.30, GKE Autopilot, on-prem kubeadm, k3s).
- `{{packaging}}`: How to deliver the manifests (e.g., raw YAML, Kustomize overlay, Helm chart).

## Prompt
```text
Adopt the persona of a Senior Kubernetes / Cloud Native Engineer. I need to deploy the following workload:

Application: {{application_name}}
Workload Type: {{workload_type}}
Resource Requirements: {{resource_requirements}}
Cluster: {{cluster_context}}
Packaging: {{packaging}}

Design the Kubernetes configuration adhering to these standards:

1. **Workload Manifest:** Write the `{{workload_type}}` manifest with a `spec.template` that includes all required fields. Set `spec.revisionHistoryLimit: 3`. Use `RollingUpdate` strategy with appropriate `maxSurge` and `maxUnavailable` values explained.
2. **Resource Management:** Always set both `requests` and `limits` for `cpu` and `memory`. Explain the difference between requests (scheduling) and limits (throttling/OOM). Set the `requests`/`limits` ratio appropriately based on the workload type (bursty vs. steady).
3. **Probes:** Configure `livenessProbe`, `readinessProbe`, and `startupProbe` with appropriate `initialDelaySeconds`, `periodSeconds`, and `failureThreshold` values. Explain why a missing `startupProbe` can cause liveness probe loops during slow startup.
4. **Security Context:** Set `securityContext` at both Pod and container level: `runAsNonRoot: true`, `runAsUser: 1000`, `readOnlyRootFilesystem: true`, `allowPrivilegeEscalation: false`, `capabilities: drop: [ALL]`.
5. **RBAC:** Create a dedicated `ServiceAccount` for the application. Define `Role` and `RoleBinding` with only the permissions the application needs. Never use the `default` ServiceAccount.
6. **Configuration & Secrets:** Use `ConfigMap` for non-sensitive configuration. Use `Secret` for sensitive data, and recommend an External Secrets Operator integration for production. Never use `env` with a hardcoded secret value.
7. **Autoscaling:** If high traffic, provide an `HorizontalPodAutoscaler` targeting CPU and/or custom metrics. Explain `minReplicas` and `maxReplicas` choices.
8. **Helm (if applicable):** Structure the chart with `values.yaml` containing all tunables. Use `_helpers.tpl` for label and name templates. Provide a `values.production.yaml` overlay.

Provide all YAML manifests or Helm chart files with inline comments explaining every non-obvious decision.
```

## Example Usage

**Input:**
```text
Adopt the persona of a Senior Kubernetes / Cloud Native Engineer. I need to deploy the following workload:

Application: payments-api
Workload Type: Deployment
Resource Requirements: Medium traffic — starts slow (30s JVM warmup), steady-state at ~200m CPU / 256Mi, needs to scale from 2 to 10 replicas under load
Cluster: AWS EKS 1.30
Packaging: Helm chart

Design the Kubernetes configuration adhering to these standards:
[...rest of prompt...]
```

**Expected Output:**
- Helm chart structure: `Chart.yaml`, `values.yaml`, `values.production.yaml`, `templates/deployment.yaml`, `templates/service.yaml`, `templates/hpa.yaml`, `templates/serviceaccount.yaml`, `templates/rbac.yaml`
- `startupProbe` with `failureThreshold: 30` and `periodSeconds: 5` to handle 30s JVM startup
- `readinessProbe` on `/health/ready` to gate traffic until warm
- `resources: requests: {cpu: 200m, memory: 256Mi}, limits: {cpu: 500m, memory: 512Mi}`
- `HPA` scaling on CPU 70% utilization, min 2 / max 10 replicas
- `securityContext` with `readOnlyRootFilesystem: true` and a writable `emptyDir` volume for `/tmp`
- `ServiceAccount` with `automountServiceAccountToken: false` since the app doesn't need K8s API access
