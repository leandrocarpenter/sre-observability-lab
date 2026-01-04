import { checkServiceHealth } from "./utils/apiSimulator.js";

/**
 * Parallel health check using Promise.all.
 * All checks execute concurrently, reducing total latency to the slowest check.
 * Trade-off: Fails immediately on first rejection, discarding successful results.
 * Use when all dependencies must be healthy for system operation.
 */
const runParallelMonitor = async () => {
    console.log("--- Initiating Parallel Scan ---");
    const startTime = Date.now();

    try {
        const results = await Promise.all([
            checkServiceHealth("PostgreSQL-DB"),
            checkServiceHealth("Redis-Cache"),
            checkServiceHealth("API-Gateway")
        ]);

        console.log("All services healthy:");
        results.forEach((res) => {
             console.log(`   ${res.service}: ${res.status} (${res.latency}ms)`);
        });

    } catch (error: any) {
        console.error(`ALERT: Service failure detected, operation aborted.`);
        console.error(`Error: ${error.message}`);
    }

    const totalTime = Date.now() - startTime;
    console.log(`\n--- Total Time: ${totalTime}ms ---`);
};

runParallelMonitor();