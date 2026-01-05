import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const app = fastify({
    logger: true
});

// Setup Zod validation for Fastify
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Decorate the app instance with Zod provider for type inference
const appWithZod = app.withTypeProvider<ZodTypeProvider>();

// Schema Definition (The Contract)
const inventoryItemSchema = z.object({
    name: z.string().min(3),
    type: z.enum(['SERVER', 'CONTAINER', 'DATABASE']),
    ipAddress: z.string().refine((val) => /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(val), { message: "Invalid IP address" }),
    active: z.boolean().default(true)
});

// In-memory database (Simulating a DB)
const inventoryDb: any[] = [];

// Route: Create Inventory Item
appWithZod.post('/inventory', {
    schema: {
        body: inventoryItemSchema, // Validate incoming JSON body
        response: {
            201: z.object({
                id: z.string().uuid(),
                message: z.string()
            })
        }
    }
}, async (request, reply) => {
    // TypeScript knows 'request.body' structure because of Zod!
    const newItem = request.body;
    
    // Simulate saving
    const id = crypto.randomUUID();
    inventoryDb.push({ id, ...newItem });

    app.log.info({ item: newItem }, "New inventory item created");

    return reply.status(201).send({
        id: id,
        message: "Item registered successfully"
    });
});

// Route: Health Check
app.get('/health', async () => {
    return { status: 'UP', items_count: inventoryDb.length };
});