import { Elysia } from 'elysia';
import { openapi } from "@elysiajs/openapi";
import { ownerRouter } from './owner/routes';

const buildElysiaApp = (): Elysia => {
    const app = new Elysia();
    app.use(openapi({
        path: "/docs"
    }));

    app.get("/", () => "Welcome to Laví API");

    // Configura as rotas
    app.use(ownerRouter);
    return app;
}

const PORT = process.env.PORT ? process.env.PORT : "5000";
const app = buildElysiaApp();
console.log("Server running...");
app.listen(PORT);
