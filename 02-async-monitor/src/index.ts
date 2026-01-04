import { type AppMetric } from "./types/Metric";
import { formatLog } from "./utils/formatter";

// In-memory storage chosen for simplicity. Production systems would use time-series databases.
const serverMetrics: AppMetric[] = [];

// Simulated sensor data representing real-time metrics collection from distributed services.
const incomingData = [
    { id: "1", service: "payment-api", cpu: 45, mem: 512 },
    { id: "2", service: "auth-api", cpu: 12, mem: 128 },
    { id: "3", service: "payment-api", cpu: 80, mem: 1024 },
];

// Accumulator for aggregate metric calculation.
let totalCpu = 0;

console.log("--- Initiating Collection ---");

// Transform raw sensor data into typed metrics with enriched metadata.
incomingData.forEach((data) => {
    // 70% CPU threshold aligns with typical alerting policies for containerized workloads.
    const currentStatus = data.cpu > 70 ? 'CRITICAL' : 'OK';
    
    const metric: AppMetric = {
        id: data.id,
        serviceName: data.service,
        cpuUsage: data.cpu,
        memoryUsage: data.mem,
        timestamp: new Date(),
        status: currentStatus
    };

    serverMetrics.push(metric);
    totalCpu += metric.cpuUsage;
    console.log(formatLog(metric));
});


console.log("--- Summary ---");
console.log(`Total CPU Load: ${totalCpu}%`);
console.log(`Metrics Stored: ${serverMetrics.length}`);