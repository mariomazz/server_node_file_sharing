"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const endpoints_1 = require("./endpoints");
const env_1 = require("../env/env");
const http = __importStar(require("http"));
class ExpressServer {
    constructor() {
        this.expressApp = (0, express_1.default)();
        this.port = process.env.PORT || env_1.EnvManager.getEnv.server.port;
        this.rawJsonOptions = {
            inflate: true,
            limit: "100kb",
            type: "application/octet-stream",
        };
        this.server = http.createServer(this.expressApp);
        this.expressApp.use(body_parser_1.default.json());
        this.expressApp.use(body_parser_1.default.raw(this.rawJsonOptions));
    }
    activate() {
        this.server.listen(this.port, () => {
            //const myIp = ip.address();
            return console.log(`Express and Socket is listening at IP:${this.port}`);
        });
        this.enableEndpoints();
    }
    enableEndpoints() {
        this.expressApp.get(endpoints_1.Endpoints.main, (req, res) => {
            res.send("File Sharing Active");
        });
    }
}
exports.ExpressServer = ExpressServer;
//# sourceMappingURL=express_server.js.map