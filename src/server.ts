import fastify from "fastify";
import {
	validatorCompiler,
	serializerCompiler,
	jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import config from "./env-config";
import { pingDatabase } from "./db/conn";

const app = fastify({
	ignoreTrailingSlash: true,
});

const run = async () => {
	await pingDatabase();
	await app.register(fastifyMultipart);

	await app.register(fastifySwagger, {
		swagger: {
			consumes: ["application/json", "multipart/form-data"],
			produces: ["application/json"],
			info: {
				title: "Laundry API Docs",
				description: "...",
				version: "1.0.0",
			},
		},
		transform: jsonSchemaTransform,
	});

	await app.register(fastifySwaggerUi, {
		routePrefix: "/docs",
	});

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.listen({ port: config.PORT }).then(() => {
		console.log(`Server running => PORT: ${config.PORT}`);
	});
};

run();
