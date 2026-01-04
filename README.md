# 🔭 SRE Observability Lab

Este repositório documenta minha jornada de aprofundamento em **Node.js, TypeScript e Engenharia de Backend** com foco em **SRE e Observabilidade**.

O objetivo final é construir uma aplicação instrumentada com **OpenTelemetry**, exportando métricas e traces para a stack do **Grafana (LGTM)** em um cluster Kubernetes.

## 🛠️ Stack Tecnológica

- **Runtime:** Node.js v22 (Current)
- **Linguagem:** TypeScript (ESM Modules)
- **Framework Web:** Fastify
- **Infraestrutura:** Docker, Kubernetes (K3s)
- **Observabilidade:** OpenTelemetry, Grafana, Prometheus

## 📚 Estrutura do Estudo

### [Módulo 01: Fundamentos & Tipagem](./01-cli-metrics)
Foco em entender a base do TypeScript, interfaces, manipulação de arrays e diferenças entre `const`/`let` criando um simulador de coleta de métricas de CPU.

### [Módulo 02: Assincronismo & Resiliência](./02-async-monitor)
Implementação de simuladores de latência e Health Checks. Estudo profundo sobre o Event Loop, `async/await`, tratamento de erros e a diferença crítica entre `Promise.all` (fail-fast) e `Promise.allSettled` (resiliência).

### [Módulo 03: API & Arquitetura](./03-fastify-api)
Criação de um servidor HTTP de alta performance com **Fastify**. Implementação do padrão *Clean Architecture* separando `App` (definição) de `Server` (execução) e análise de logs estruturados (JSON).

## 🚀 Próximos Passos
- [ ] Implementar regras de negócio e CRUD na API.
- [ ] Instrumentação Manual com OpenTelemetry SDK.
- [ ] Deploy no Cluster K3s local.
- [ ] Integração com IA (Google Gemini) para análise de incidentes.

---
*Desenvolvido por [Leandro Carpenter](https://github.com/leandrocarpenter)*
