// src/monitor.ts
import { checkServiceHealth } from "./utils/apiSimulator";

/**
 * Sequential health check implementation.
 * Services checked one-by-one to establish baseline behavior before introducing parallelism.
 * Fails immediately on first error (no partial success reporting).
 */
const runMonitor = async () => {
    console.log("--- Initiating Service Scan ---");
    const startTime = Date.now();

    try {
        console.log("1. Checking Database...");
        const dbResult = await checkServiceHealth("PostgreSQL-DB");
        console.log(`   ${dbResult.service}: ${dbResult.status} (${dbResult.latency}ms)`);

        console.log("2. Checking Redis...");
        const redisResult = await checkServiceHealth("Redis-Cache");
        console.log(`   ${redisResult.service}: ${redisResult.status} (${redisResult.latency}ms)`);

        console.log("3. Checking API Gateway...");
        const apiResult = await checkServiceHealth("API-Gateway");
        console.log(`   ${apiResult.service}: ${apiResult.status} (${apiResult.latency}ms)`);

    } catch (error: any) {
        console.error(`CRITICAL ALERT: ${error.message}`);
    }

    const totalTime = Date.now() - startTime;
    console.log(`\n--- Scan Complete: ${totalTime}ms ---`);
};

runMonitor();