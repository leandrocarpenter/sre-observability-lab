import { AppMetric } from "../types/Metric";

/**
 * Formats metrics into structured log output.
 * Single-line format chosen for grep-friendly log analysis.
 */
export const formatLog = (metric: AppMetric): string => {
    return `[LOG] Service: ${metric.serviceName} | CPU: ${metric.cpuUsage}% | MEM: ${metric.memoryUsage}MB | Status: ${metric.status}`;
};