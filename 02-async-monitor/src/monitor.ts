// src/monitor.ts
import { checkServiceHealth } from "./utils/apiSimulator";

// Função principal precisa ser ASYNC para usar AWAIT dentro
const runMonitor = async () => {
    console.log("--- 📡 Iniciando Varredura de Serviços ---");
    const startTime = Date.now();

    try {
        console.log("1. Checando Database...");
        // AWAIT: O código "para" aqui até o DB responder
        const dbResult = await checkServiceHealth("PostgreSQL-DB");
        console.log(`✅ ${dbResult.service} está ${dbResult.status} (${dbResult.latency}ms)`);

        console.log("2. Checando Redis...");
        const redisResult = await checkServiceHealth("Redis-Cache");
        console.log(`✅ ${redisResult.service} está ${redisResult.status} (${redisResult.latency}ms)`);

        console.log("3. Checando API Gateway...");
        const apiResult = await checkServiceHealth("API-Gateway");
        console.log(`✅ ${apiResult.service} está ${apiResult.status} (${apiResult.latency}ms)`);

    } catch (error: any) {
        // Se QUALQUER um falhar (reject), cai aqui imediatamente
        console.error(`🚨 ALERTA CRÍTICO: ${error.message}`);
    }

    const totalTime = Date.now() - startTime;
    console.log(`\n--- 🏁 Varredura finalizada em ${totalTime}ms ---`);
};

runMonitor();