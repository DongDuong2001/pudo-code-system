# Docker Skill
> Skill, Containerization, Docker, Build, Security

## Context
Use this skill when writing Dockerfiles, Docker Compose configurations, or optimizing container build pipelines. This covers multi-stage builds, layer caching strategies, `.dockerignore`, image security scanning, non-root user configuration, and Compose service orchestration for local development. The AI will act as a Docker specialist who understands build performance, image size minimization, and container security fundamentals.

## Variables
- `{{application_type}}`: The application being containerized (e.g., Node.js API, Python FastAPI, Go binary, Java Spring Boot).
- `{{base_image_preference}}`: Preferred base image family (e.g., `alpine`, `debian-slim`, `distroless`, `ubi-minimal`).
- `{{build_goal}}`: What the Dockerfile/Compose needs to accomplish (e.g., production image, local dev environment with hot-reload, multi-arch build).
- `{{registry}}`: Target container registry (e.g., Docker Hub, AWS ECR, GitHub Container Registry, GitLab Registry).

## Prompt
```text
Adopt the persona of a Senior Docker / Containerization Engineer. I need to containerize the following application:

Application: {{application_type}}
Base Image Preference: {{base_image_preference}}
Goal: {{build_goal}}
Target Registry: {{registry}}

Design the Docker configuration adhering to these standards:

1. **Multi-Stage Build:** Use a multi-stage `Dockerfile` with a named `builder` stage and a lean final `runtime` stage. The final image must contain only what is needed to run the application — no build tools, package managers, or source code.
2. **Layer Caching:** Order instructions from least to most frequently changing. Copy dependency manifests (`package.json`, `requirements.txt`, `go.mod`) and install dependencies *before* copying application source code to maximize cache reuse.
3. **Image Size:** Choose the smallest appropriate base image. Combine `RUN` commands with `&&` and clean up caches in the same layer (e.g., `rm -rf /var/cache/apk/*`). Provide a `docker images` size comparison between a naive and optimized approach.
4. **Security:**
   - Run as a non-root user (`USER appuser`). Create the user explicitly with a fixed UID.
   - Use `--no-cache` for package managers in CI.
   - Set `COPY --chown=appuser:appuser` for file ownership.
   - Recommend a scanning step (e.g., Trivy, Docker Scout) for the CI pipeline.
5. **.dockerignore:** Provide a comprehensive `.dockerignore` that excludes `.git`, `node_modules`, test files, `.env` files, and build artifacts.
6. **Docker Compose (if applicable):** For local development, provide a `docker-compose.yml` with named volumes for persistence, `healthcheck:` definitions, and a `.env.example` pattern for environment variables.
7. **Build Arguments & Labels:** Use `ARG` for build-time variables (e.g., `APP_VERSION`). Add `LABEL` metadata (version, maintainer, build date) using OCI standard labels.

Provide the complete `Dockerfile`, `.dockerignore`, and `docker-compose.yml` (if needed) with inline comments.
```

## Example Usage

**Input:**
```text
Adopt the persona of a Senior Docker / Containerization Engineer. I need to containerize the following application:

Application: Node.js 20 Express API with TypeScript (compiled to dist/)
Base Image Preference: alpine for production, node:20 for dev
Goal: A production-optimized multi-stage build, plus a docker-compose.yml for local development with hot-reload via nodemon
Target Registry: GitHub Container Registry (ghcr.io)

Design the Docker configuration adhering to these standards:
[...rest of prompt...]
```

**Expected Output:**
- Multi-stage `Dockerfile`: `builder` stage (node:20-alpine, installs all deps, compiles TS), `runtime` stage (node:20-alpine, copies only `dist/` and `node_modules/` production deps)
- Final image runs as `node` user (UID 1000), not root
- `.dockerignore` excluding `src/`, `*.ts`, `.git`, `node_modules`, `coverage/`
- `docker-compose.yml` with `app` service mounting `src/` as a volume for hot-reload, a `postgres` service with a named volume, and `healthcheck` on both services
- OCI labels for versioning
