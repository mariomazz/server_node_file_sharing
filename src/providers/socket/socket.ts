import { Server, Socket } from "socket.io";
import * as http from "http";
import { SocketKeys } from "./socket_keys";
import { FileModel } from "./models/file_model";

export class SocketProvider {
	server: http.Server;
	io: Server;
	socketIds: string[] = [];

	constructor(server: http.Server) {
		this.server = server;
		this.io = new Server(this.server);
	}

	public activate(): void {
		this.io.on("connection", (socket) => {
			console.log("a user connected");
			this.activateSocket(socket);
		});
	}

	private activateSocket(socket: Socket): void {
		const socketId = this.sendSocketIdtoClient(socket);
		this.listenWhenClientSendFile(socket, socketId);
	}

	private sendSocketIdtoClient(socket: Socket): string {
		const ipAddressClient = socket.handshake.address;
		let socketID = "";
		if (this.socketIds.some((e) => e.includes(ipAddressClient))) {
			socketID = this.socketIds.find((e) => e.includes(ipAddressClient));
		} else {
			socketID = `${ipAddressClient}_${socket.id}`;
			this.socketIds.push(socketID);
		}
		socket.emit(
			SocketKeys.channelSocketId,
			JSON.stringify({ socketid: socketID })
		);
		return socketID;
	}

	private listenWhenClientSendFile(socket: Socket, socketId: string) {
		socket.on(`${SocketKeys.files_socket}.${socketId}`, (data) => {
			console.log("ON FILE RECEIVED");
			if (data) {
				const file = new FileModel();
				Object.assign(file, JSON.parse(data));
				const clientSocketFilesId = `client.${SocketKeys.files_socket}.${socketId}`;
				console.log("io.emit to => ", clientSocketFilesId);
				this.io.emit(clientSocketFilesId, JSON.stringify(file));
				this.socketIds = [];
			} else {
				console.log("data.file null");
			}
		});
	}
}
