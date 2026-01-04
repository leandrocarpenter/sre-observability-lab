import { app } from "./app";

/**
 * Server entry point with graceful error handling.
 * Host 0.0.0.0 required for Docker/Kubernetes to route external traffic.
 * Process exit on startup failure ensures container orchestrator can detect and restart.
 */
const start = async () => {
    try {
        await app.listen({ port: 3333, host: '0.0.0.0' });
        console.log("Server running at http://localhost:3333");
    
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();