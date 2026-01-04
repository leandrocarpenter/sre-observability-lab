import { type AppMetric } from "./types/Metric";
import { formatLog } from "./utils/formatter";

// CONST: Use para OBJETOS e ARRAYS.
// A "caixa" (serverMetrics) é imutável, mas o conteúdo pode mudar (push/pop).
const serverMetrics: AppMetric[] = [];

// Simulando dados chegando (Imagine que isso veio de um sensor)
const incomingData = [
    { id: "1", service: "payment-api", cpu: 45, mem: 512 },
    { id: "2", service: "auth-api", cpu: 12, mem: 128 },
    { id: "3", service: "payment-api", cpu: 80, mem: 1024 }, // Pico de uso
];

// LET: Use apenas quando a variável precisa ser REATRIBUÍDA.
// Aqui 'totalCpu' vai mudar a cada iteração do loop, por isso usamos let.
let totalCpu = 0;

console.log("--- Iniciando Coleta ---");

// Iterando sobre os dados simulados
incomingData.forEach((data) => {
    const currentStatus = data.cpu > 70 ? 'CRITICAL' : 'OK';
    // Transformando o dado bruto no nosso Tipo (Interface)
    const metric: AppMetric = {
        id: data.id,
        serviceName: data.service,
        cpuUsage: data.cpu,
        memoryUsage: data.mem,
        timestamp: new Date(),
        status: currentStatus
    };

    serverMetrics.push(metric);
    
    // Acumulando valor (variavel let sendo alterada)
    totalCpu += metric.cpuUsage;

    // Usando a função importada
    console.log(formatLog(metric));
});



console.log("--- Resumo ---");
console.log(`Total CPU Load: ${totalCpu}%`);
console.log(`Métricas armazenadas: ${serverMetrics.length}`);