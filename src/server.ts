import fastify from "fastify";
import {
	validatorCompiler,
	serializerCompiler,
	jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import { verify_env } from "./env-config";
import { pingDatabase } from "./db/conn";
import { logger } from "./logger";

const app = fastify({
	ignoreTrailingSlash: true,
});

app.register(fastifyMultipart);
app.register(fastifySwagger, {
	swagger: {
		consumes: ["application/json", "multipart/form-data"],
		produces: ["application/json"],
		info: {
			title: "Laví API Docs",
			description: "...",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
})

const run = async () => {
	verify_env();
	await pingDatabase();

	await app.register(import("@scalar/fastify-api-reference"), {
		routePrefix: "/docs"
	});

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	const port_from_env = process.env.PORT!
	const current_port = port_from_env ? port_from_env : "5555"

	app.listen({ port: Number(current_port) }, (err, address) => {
		if (err) {
			throw err;
		}

		logger.info("Server running at: " + address)
	})
};

run();
