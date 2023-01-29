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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvManager = exports.Server = exports.Database = exports.Env = void 0;
const fs = __importStar(require("fs"));
class Env {
}
exports.Env = Env;
class Database {
}
exports.Database = Database;
class Server {
}
exports.Server = Server;
class EnvManager {
    static get getInstance() {
        return EnvManager.instance;
    }
    static get getEnv() {
        return EnvManager.instance.env;
    }
    static initAndFetchEnv() {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new EnvManager();
            instance.env = yield instance.fetchEnv();
            this.instance = instance;
            return instance;
        });
    }
    fetchEnv() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const env = new Env();
                const data = JSON.parse(yield fs.promises.readFile(`${process.cwd()}/env/${process.env.ENV}.json`, {
                    encoding: "utf8",
                }));
                Object.assign(env, data);
                return env;
            }
            catch (err) {
                throw Error("env error no match");
            }
        });
    }
}
exports.EnvManager = EnvManager;
//# sourceMappingURL=env.js.map