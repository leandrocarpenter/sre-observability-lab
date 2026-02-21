# Manuais de SRE: Monitoramento e Alertas

Este documento detalha as regras de alerta configuradas no Grafana via Prometheus Data Source.

## Alerta: API High Error Rate

**Objetivo:** Monitorar a taxa de erros (HTTP 4xx e 5xx) gerados pela API de Inventário. Se a taxa for maior que zero por um minuto contínuo, um incidente é declarado.

### Configuração no Grafana Alerting

#### A. Extração de Dados (Query)

Responsável por capturar a métrica de erro no formato *Time Series*.

- **Data Source:** Prometheus
- **PromQL:**

```promql
sum(rate(traces_span_metrics_calls_total{service_name="inventory-api-v1", http_status_code=~"4..|5.."}[1m]))
```

#### B. Redução (Reduce)

Transforma a série temporal em um valor numérico absoluto para avaliação.

- **Function:** Last
- **Input:** A
- **Mode:** Strict

#### C. Gatilho (Threshold)

A condição lógica de disparo.

- **Input:** B
- **Condition:** IS ABOVE 0

#### D. Comportamento de Avaliação (Evaluation Behavior)

- **Evaluation interval:** 1m (frequência de checagem contra o banco)
- **Pending period (For):** 1m (tempo de tolerância antes de alterar o estado para *Firing*)

### Teste e Validação (Chaos Engineering)

Para testar a resiliência do monitoramento e o motor de alertas, utilize os comandos abaixo para gerar carga artificial na API.

#### 1. Geração de Tráfego Normal (Baseline)

Este script injeta requisições válidas continuamente, resultando em códigos HTTP 2xx. Deve ser utilizado para estabelecer o baseline de Throughput (RPS) sem acionar o alerta.

```bash
while true; do
  curl -s -X POST http://localhost:8888/inventory \
    -H "Content-Type: application/json" \
    -d '{"name": "Load", "type": "SERVER", "ipAddress": "10.0.0.1"}' \
    > /dev/null
  sleep 0.5
done
```

#### 2. Simulação de Falhas (Error Rate Trigger)

Este script envia propositalmente um payload malformado. A API rejeitará o tráfego (códigos 4xx/5xx), o que fará com que o alerta transite para o estado *Pending* e, após um minuto contínuo, para o estado *Firing*.

```bash
while true; do
  curl -s -X POST http://localhost:8888/inventory \
    -H "Content-Type: application/json" \
    -d '{"bad_payload": "trigger_error"}' \
    > /dev/null
  sleep 0.5
done
```