import { SocketProvider } from "./providers/socket/socket";
import { ExpressServer } from "./providers/express_server/express_server";
import { MongodbProvider } from "./providers/mongodb/mongobd_provider";

export class App {
	expressServer = new ExpressServer();
	socketProvider: SocketProvider;
	dbMongo: MongodbProvider = new MongodbProvider();
	constructor() {
		this.socketProvider = new SocketProvider(this.expressServer.server);
	}

	init(): void {
		console.log("app: init");
		this.expressServer.activate();
		this.socketProvider.activate();
		this.dbMongo.init();
	}
}
