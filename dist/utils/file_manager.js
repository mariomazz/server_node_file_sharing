"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
const fs = __importStar(require("fs"));
const rxjs_1 = require("rxjs");
class FileManager {
    writeFileAndCreateDirectory(dir, filename, buffer) {
        return new rxjs_1.Observable((observer) => {
            if (dir[dir.length - 1] == "/") {
                dir = dir.substring(0, dir.length - 1);
            }
            this.createDirectory(dir).subscribe({
                complete: () => {
                    dir = dir += `/${filename}`;
                    this.writeFile(dir, buffer).subscribe(() => {
                        observer.complete();
                    });
                },
                error: (err) => {
                    observer.error(err);
                    observer.complete();
                },
            });
        });
    }
    createDirectory(dir) {
        return (0, rxjs_1.from)(fs.promises.mkdir(dir, { recursive: true }));
    }
    writeFile(dir, buffer) {
        return (0, rxjs_1.from)(fs.promises.writeFile(dir, buffer));
    }
}
exports.FileManager = FileManager;
//# sourceMappingURL=file_manager.js.map