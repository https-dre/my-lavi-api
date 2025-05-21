import { sql } from "./conn";
import * as path from "path";
import * as fs from "fs";

export const seed = async () => {
	try {
		const p = path.join(__dirname, "./seed.sql");
		fs.access(p, fs.constants.R_OK, async (err) => {
			if (err) {
				console.log("Seed file does not exists");
				console.log(`${p} doest not exists!`);
				return;
			}
			const sqlFile = fs.readFileSync(p, "utf-8");
			await sql.unsafe(sqlFile);
		});
	} catch (err) {
		console.log("DATABASE ERROR");
		throw err;
	}
};

seed();
