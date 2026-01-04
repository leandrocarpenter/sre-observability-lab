# SRE Observability Lab

Technical training repository demonstrating backend engineering concepts using Node.js and TypeScript, with focus on Site Reliability Engineering practices and observability instrumentation.

## Objective

Build a production-ready application instrumented with OpenTelemetry, exporting telemetry data to the Grafana LGTM stack on a Kubernetes cluster.

## Technology Stack

| Category | Technology | Version |
| :--- | :--- | :--- |
| **Runtime** | Node.js | v22 (Current) |
| **Language** | TypeScript | ESM Modules |
| **Web Framework** | Fastify | Latest |
| **Infrastructure** | Docker, Kubernetes (K3s) | - |
| **Observability** | OpenTelemetry, Grafana, Prometheus | - |

## Project Structure

The repository is organized into progressive learning modules:

### [Module 01: Fundamentals & Typing](./01-cli-metrics)

Demonstrates TypeScript fundamentals through a CLI-based CPU metrics collector.

**Key Concepts:**
- Interface design and type safety
- Memory management: `const` vs `let` usage patterns
- Array manipulation and data transformation

### [Module 02: Asynchrony & Resilience](./02-async-monitor)

Implements asynchronous health monitoring with emphasis on error handling strategies for distributed systems.

**Key Concepts:**
- Event loop and `async/await` patterns
- Promise concurrency: `Promise.all` (fail-fast) vs `Promise.allSettled` (resilient)
- Latency simulation for testing failure scenarios

### [Module 03: API & Architecture](./03-fastify-api)

High-performance HTTP server demonstrating clean architecture principles using Fastify.

**Key Concepts:**
- Separation of concerns: application definition vs runtime execution
- Structured logging for observability pipelines
- Kubernetes-ready health endpoints (liveness probes)

## Roadmap

- [ ] Implement business logic and CRUD operations
- [ ] Manual instrumentation using OpenTelemetry SDK
- [ ] Deploy to local K3s cluster
- [ ] Integrate AI-powered incident analysis (Google Gemini)

---

**Author:** [Leandro Carpenter](https://github.com/leandrocarpenter)