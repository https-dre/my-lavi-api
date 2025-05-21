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
import EnvConfig from './env-config';

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

	const port_from_env = EnvConfig.get('PORT')
	const current_port = port_from_env ? port_from_env : "5555"

	app.listen({ port: current_port }).then(() => {
		console.log(`Server running => PORT: ${current_port}`);
	});
};

run();
