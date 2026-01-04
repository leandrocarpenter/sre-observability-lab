import fastify from 'fastify';

/**
 * Application instance with structured logging enabled.
 * Separating app definition from server execution enables independent testing
 * and multiple server instances from the same configuration.
 */
export const app = fastify({
    logger: true 
});

/**
 * Health check endpoint for Kubernetes liveness probes.
 * Returns process uptime to distinguish between fresh restarts and long-running instances.
 * K8s uses this to determine if pod should be restarted.
 */
app.get('/health', async (request, reply) => {
    return { 
        status: 'UP', 
        timestamp: new Date(),
        uptime: process.uptime()
    };
});