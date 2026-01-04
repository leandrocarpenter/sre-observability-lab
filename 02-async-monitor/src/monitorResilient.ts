import { checkServiceHealth } from "./utils/apiSimulator";

const runResilientMonitor = async () => {
    console.log("--- 🛡️  Iniciando Varredura Resiliente (allSettled) ---");
    const startTime = Date.now();

    // NOTE que não precisamos de try/catch envolvendo o Promise.allSettled
    // porque ele NUNCA rejeita (ele sempre devolve o relatório final).
    const results = await Promise.allSettled([
        checkServiceHealth("PostgreSQL-DB"),
        checkServiceHealth("Redis-Cache"),
        checkServiceHealth("API-Gateway")
    ]);

    console.log("📋 Relatório de Status:");

    // Iteramos sobre o relatório
    results.forEach((result) => {
        
        // Verifica se deu sucesso (fulfilled)
        if (result.status === 'fulfilled') {
            const data = result.value; // O TypeScript sabe que aqui tem 'value'
            console.log(`   ✅ ${data.service}: UP (${data.latency}ms)`);
        
        } else {
            // Se não, deu erro (rejected)
            // Aqui não temos o 'data.service', pois a promessa falhou. 
            // Temos apenas o motivo do erro (reason).
            console.log(`   ❌ FALHA: ${result.reason.message}`);
        }
    });

    const totalTime = Date.now() - startTime;
    console.log(`\n--- 🏁 Tempo Total: ${totalTime}ms (Latência do mais lento) ---`);
};

runResilientMonitor();