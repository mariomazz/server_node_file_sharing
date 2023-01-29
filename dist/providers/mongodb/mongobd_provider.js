/* import { Db, MongoClient } from "mongodb";
import { EnvManager } from "../env/env";

export class MongodbProvider {
    private client: MongoClient;
    private db: Db;
    public init(): void {
        this.connectToDb().then((data) => {
            this.client = data;
            this.db = this.client.db("appdb");
        });
    }

    private async connectToDb(): Promise<MongoClient> {
        return await MongoClient.connect(EnvManager.getEnv.database.url);
    }

    public async getUsers() {
        return await this.db.collection("users").find({}).toArray();
    }

    public async addUser(data): Promise<boolean> {
        if (data && data.name && data.surname) {
            await this.db.collection("users").insertOne(data);
            return true;
        } else {
            return false;
        }
    }
} */
//# sourceMappingURL=mongobd_provider.js.map