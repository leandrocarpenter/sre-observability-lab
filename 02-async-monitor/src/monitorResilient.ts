import { checkServiceHealth } from "./utils/apiSimulator";

/**
 * Resilient health check using Promise.allSettled.
 * Waits for all checks to complete regardless of individual failures.
 * Returns comprehensive status report including both successes and failures.
 * Preferred for monitoring dashboards where partial visibility is valuable.
 * No try-catch needed: allSettled never rejects.
 */
const runResilientMonitor = async () => {
    console.log("--- Initiating Resilient Scan (allSettled) ---");
    const startTime = Date.now();

    const results = await Promise.allSettled([
        checkServiceHealth("PostgreSQL-DB"),
        checkServiceHealth("Redis-Cache"),
        checkServiceHealth("API-Gateway")
    ]);

    console.log("Status Report:");

    results.forEach((result) => {
        if (result.status === 'fulfilled') {
            const data = result.value;
            console.log(`   [UP] ${data.service} (${data.latency}ms)`);
        } else {
            console.log(`   [FAIL] ${result.reason.message}`);
        }
    });

    const totalTime = Date.now() - startTime;
    console.log(`\n--- Total Time: ${totalTime}ms (slowest check determines duration) ---`);
};

runResilientMonitor();