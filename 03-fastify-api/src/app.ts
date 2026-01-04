import fastify from 'fastify';

// Cria a instância do framework (logger: true ativa logs nativos)
export const app = fastify({
    logger: true 
});

// Definindo uma Rota (Endpoint)
// GET /health -> Usado pelo K8s para saber se o pod está vivo (Liveness Probe)
app.get('/health', async (request, reply) => {
    
    // O Fastify lida com async automaticamente
    return { 
        status: 'UP', 
        timestamp: new Date(),
        uptime: process.uptime() // Tempo em segundos que o processo está rodando
    };
});