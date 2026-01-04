import { checkServiceHealth } from "./utils/apiSimulator.js";

const runParallelMonitor = async () => {
    console.log("--- 🚀 Iniciando Varredura PARALELA ---");
    const startTime = Date.now();

    try {
        // A Mágica Acontece Aqui:
        // Passamos um ARRAY [] com todas as chamadas que queremos fazer.
        // O await só destrava quando TODAS terminarem com sucesso.
        const results = await Promise.all([
            checkServiceHealth("PostgreSQL-DB"),
            checkServiceHealth("Redis-Cache"),
            checkServiceHealth("API-Gateway")
        ]);

        // Se chegou aqui, TODOS deram certo.
        // O 'results' é uma lista: [resultadoDB, resultadoRedis, resultadoAPI]
        console.log("✅ Todos os serviços responderam!");
        
        // Vamos percorrer a lista de resultados para mostrar
        results.forEach((res) => {
             console.log(`   -> ${res.service}: ${res.status} em ${res.latency}ms`);
        });

    } catch (error: any) {
        // O PERIGO DO PROMISE.ALL:
        // Se UM falhar, ele cai aqui imediatamente e descarta os outros sucessos.
        console.error(`🚨 ALERTA: Um dos serviços falhou! A operação foi cancelada.`);
        console.error(`Erro: ${error.message}`);
    }

    const totalTime = Date.now() - startTime;
    console.log(`\n--- 🏁 Tempo Total: ${totalTime}ms ---`);
};

runParallelMonitor();