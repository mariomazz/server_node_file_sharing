import * as fs from "fs";

export class Env {
	server: Server;
	database: Database;
}

export class Database {
	url: string;
}

export class Server {
	port: number;
}

export class EnvManager {
	private static instance: EnvManager;
	public static get getInstance() {
		return EnvManager.instance;
	}
	public static get getEnv(): Env {
		return EnvManager.instance.env;
	}
	env: Env;
	public static async initAndFetchEnv(): Promise<EnvManager> {
		const instance = new EnvManager();
		instance.env = await instance.fetchEnv();
		this.instance = instance;
		return instance;
	}

	async fetchEnv() {
		try {
			const env = new Env();
			const data = JSON.parse(
				await fs.promises.readFile(
					`${process.cwd()}/env/${process.env.ENV}.json`,
					{
						encoding: "utf8",
					}
				)
			);
			Object.assign(env, data);
			return env;
		} catch (err) {
			throw Error("env error no match");
		}
	}
}
