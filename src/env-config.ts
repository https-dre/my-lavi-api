const env_db = [
	process.env.DB_HOST,
	process.env.DB_PASSWORD,
	process.env.DB_USER,
	process.env.DB_PORT,
	process.env.DB,
];

env_db.map((e) => {
	if (!e) {
		throw new Error("Missing database configs!");
	}
});

const config = {
	DB_HOST: env_db[0],
	DB_PASSWORD: env_db[1],
	DB_USER: env_db[2],
	DB_PORT: env_db[3],
	PORT: parseInt(process.env.PORT || "3355"),
	DB: env_db[4],
};

export default config;
