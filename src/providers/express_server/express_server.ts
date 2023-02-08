import express from "express";
import bodyParser from "body-parser";
import { Endpoints } from "./endpoints";
import { EnvManager } from "../env/env";
import * as http from "http";

export class ExpressServer {
	private expressApp = express();
	private port = process.env.PORT || EnvManager.getEnv.server.port;
	server: http.Server;
	private rawJsonOptions = {
		inflate: true,
		limit: "100kb",
		type: "application/octet-stream",
	};
	constructor() {
		this.server = http.createServer(this.expressApp);
		this.expressApp.use(bodyParser.json());
		this.expressApp.use(bodyParser.raw(this.rawJsonOptions));
	}
	public activate(): void {
		this.server.listen(this.port, () => {
			//const myIp = ip.address();
			return console.log(`Express and Socket is listening at IP:${this.port}`);
		});
		this.enableEndpoints();
	}

	private enableEndpoints() {
		this.expressApp.get(Endpoints.main, (req, res) => {
			res.send("File Sharing Active");
		});
	}
}
