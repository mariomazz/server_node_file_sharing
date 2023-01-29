"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const socket_1 = require("./providers/socket/socket");
const express_server_1 = require("./providers/express_server/express_server");
class App {
    constructor() {
        this.expressServer = new express_server_1.ExpressServer();
        this.socketProvider = new socket_1.SocketProvider(this.expressServer.server);
    }
    init() {
        console.log("app: init");
        this.expressServer.activate();
        this.socketProvider.activate();
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map