// export: Torna essa interface visível para outros arquivos.
// interface: Define a "forma" do objeto. Não gera código JS final, serve apenas para validação.

export interface AppMetric {
    id: string;
    serviceName: string;
    cpuUsage: number;
    memoryUsage: number;
    timestamp: Date;
    status: string;
}