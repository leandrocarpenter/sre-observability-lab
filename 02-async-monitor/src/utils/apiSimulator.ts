// src/utils/apiSimulator.ts

// Definindo o tipo da resposta
interface HealthResponse {
    service: string;
    status: 'UP' | 'DOWN';
    latency: number;
}

/**
 * Simula um ping em um serviço remoto.
 * Retorna uma Promise (promessa de um valor futuro).
 */
export const checkServiceHealth = (serviceName: string): Promise<HealthResponse> => {
    return new Promise((resolve, reject) => {
        // 1. Sorteia um tempo de resposta entre 200ms e 2000ms
        const latency = Math.floor(Math.random() * 1800) + 200;

        // 2. Simula o tempo passando (setTimeout é assíncrono)
        setTimeout(() => {
            // 3. Sorteia se vai dar erro (20% de chance de falha)
            const isError = Math.random() > 0.8;

            if (isError) {
                // REJECT: O equivalente a lançar uma exceção (Service Unavailable)
                reject(new Error(`Connection timeout para ${serviceName}`));
            } else {
                // RESOLVE: Sucesso, devolve os dados
                resolve({
                    service: serviceName,
                    status: 'UP',
                    latency: latency
                });
            }
        }, latency);
    });
};