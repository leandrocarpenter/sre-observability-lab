import { app } from "./app"; // Importamos a configuração do outro arquivo

const start = async () => {
    try {
        // Manda o servidor ouvir na porta 3333
        // host: '0.0.0.0' é OBRIGATÓRIO para Docker/Kubernetes (libera acesso externo)
        await app.listen({ port: 3333, host: '0.0.0.0' });
        
        console.log("🚀 Server running at http://localhost:3333");
    
    } catch (err) {
        // Se der erro ao subir (porta em uso, etc), loga e mata o processo
        app.log.error(err);
        process.exit(1);
    }
};

start();