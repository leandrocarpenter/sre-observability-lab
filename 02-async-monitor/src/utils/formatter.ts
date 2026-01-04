import { AppMetric } from "../types/Metric"; // Importando o contrato

// Arrow Function (sintaxe moderna de função)
// (metric: AppMetric): string -> Recebe um objeto do tipo AppMetric e retorna uma string
export const formatLog = (metric: AppMetric): string => {
    
    // Template String (uso de crase `) permite interpolação de variáveis
    return `[LOG] Service: ${metric.serviceName} | CPU: ${metric.cpuUsage}% | MEM: ${metric.memoryUsage}MB | Status: ${metric.status}`;
};