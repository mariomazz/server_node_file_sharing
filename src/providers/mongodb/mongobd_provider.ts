import { MongoClient } from "mongodb";
import { EnvManager } from "../env/env";

export class MongodbProvider {
	public init(): void {
		this.connectToDb();
	}

	private async connectToDb(): Promise<void> {
		await MongoClient.connect(EnvManager.getEnv.database.url);
	}
}
