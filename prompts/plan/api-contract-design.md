# API Contract Design
> Phase: Plan, Tags: #api #rest #graphql #planning

## Context
Use this prompt when planning how frontend clients will communicate with the backend, or how microservices will interact.

## Variables
- `{{context}}`: What feature this API serves.
- `{{api_type}}`: REST, GraphQL, or gRPC.
- `{{resources}}`: The data models the API will expose.

## Prompt
Act as a backend Architecture expert. I am planning a new {{api_type}} API for {{context}}.
The main resources we need to interact with are {{resources}}.

Please provide:
1. The endpoint paths/queries and their HTTP methods.
2. Expected JSON request payloads and response shapes.
3. Relevant HTTP status codes we should handle.
4. Suggestions for pagination, caching, or rate-limiting headers.

## Example Usage
**Input:** Act as a backend Architecture expert. I am planning a new REST API for a blog commenting system.
The main resources we need to interact with are Posts and Comments.
