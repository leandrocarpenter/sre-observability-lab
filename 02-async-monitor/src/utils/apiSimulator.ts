// src/utils/apiSimulator.ts

interface HealthResponse {
    service: string;
    status: 'UP' | 'DOWN';
    latency: number;
}

/**
 * Simulates network health check with realistic latency and failure scenarios.
 * Random latency (200-2000ms) and 20% failure rate mimic production distributed system behavior.
 * Used for testing error handling strategies without external dependencies.
 */
export const checkServiceHealth = (serviceName: string): Promise<HealthResponse> => {
    return new Promise((resolve, reject) => {
        const latency = Math.floor(Math.random() * 1800) + 200;

        setTimeout(() => {
            const isError = Math.random() > 0.8;

            if (isError) {
                reject(new Error(`Connection timeout for ${serviceName}`));
            } else {
                resolve({
                    service: serviceName,
                    status: 'UP',
                    latency: latency
                });
            }
        }, latency);
    });
};