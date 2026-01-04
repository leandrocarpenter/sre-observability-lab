/**
 * Metric data contract for application monitoring.
 * Enforces consistent metric structure across collection and formatting layers.
 */
export interface AppMetric {
    id: string;
    serviceName: string;
    cpuUsage: number;
    memoryUsage: number;
    timestamp: Date;
    status: string;
}