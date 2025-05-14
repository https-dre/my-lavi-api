import postgres from "postgres";
import config from "../env-config";

export const sql = postgres({
	host: config.DB_HOST,
	port: Number(config.DB_PORT) || 5432,
	username: config.DB_USER,
	password: config.DB_PASSWORD,
	database: config.DB,
	ssl: "require",
});

export async function pingDatabase() {
	try {
		await sql`SELECT 1`;
		console.log("Database Connection Status: Sucessfuly");
	} catch (error) {
		console.log('PING DATABASE ERROR!')
		await sql.end();
		throw error;
	} finally {
		await sql.end();
	}
}
