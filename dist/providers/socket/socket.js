"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketProvider = void 0;
const socket_io_1 = require("socket.io");
const socket_keys_1 = require("./socket_keys");
const file_model_1 = require("./models/file_model");
class SocketProvider {
    constructor(server) {
        this.socketIds = [];
        this.server = server;
        this.io = new socket_io_1.Server(this.server);
    }
    activate() {
        this.io.on("connection", (socket) => {
            console.log("a user connected");
            this.activateSocket(socket);
        });
    }
    activateSocket(socket) {
        const socketId = this.sendSocketIdtoClient(socket);
        this.listenWhenClientSendFile(socket, socketId);
    }
    sendSocketIdtoClient(socket) {
        const ipAddressClient = socket.handshake.address;
        let socketID = "";
        if (this.socketIds.some((e) => e.includes(ipAddressClient))) {
            socketID = this.socketIds.find((e) => e.includes(ipAddressClient));
        }
        else {
            socketID = `${ipAddressClient}_${socket.id}`;
            this.socketIds.push(socketID);
        }
        socket.emit(socket_keys_1.SocketKeys.channelSocketId, JSON.stringify({ socketid: socketID }));
        return socketID;
    }
    listenWhenClientSendFile(socket, socketId) {
        socket.on(`${socket_keys_1.SocketKeys.files_socket}.${socketId}`, (data) => {
            console.log("ON FILE RECEIVED");
            if (data) {
                const file = new file_model_1.FileModel();
                Object.assign(file, JSON.parse(data));
                const clientSocketFilesId = `client.${socket_keys_1.SocketKeys.files_socket}.${socketId}`;
                console.log("io.emit to => ", clientSocketFilesId);
                this.io.emit(clientSocketFilesId, JSON.stringify(file));
                this.socketIds = [];
            }
            else {
                console.log("data.file null");
            }
        });
    }
}
exports.SocketProvider = SocketProvider;
//# sourceMappingURL=socket.js.map