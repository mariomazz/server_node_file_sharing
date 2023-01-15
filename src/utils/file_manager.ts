import * as fs from "fs";
import { Observable } from "rxjs";

export class FileManager {
	saveFileFromByteArray(
		dir: string,
		filename: string,
		buffer: Buffer
	): Observable<void> {
		return new Observable<void>((observer) => {
			if (dir[dir.length - 1] == "/") {
				dir = dir.substring(0, dir.length - 1);
			}
			this.createDirectoryIfNotExists(dir).then(
				() => {
					dir = dir += `/${filename}`;
					fs.writeFile(dir, buffer, function (err) {
						if (err) {
							observer.error(err);
							observer.complete();
						}
						observer.next();
						observer.complete();
					});
				},
				(err) => {
					observer.error(err);
					observer.complete();
				}
			);
		});
	}

	async createDirectoryIfNotExists(dir: string): Promise<string> {
		return await fs.promises.mkdir(dir, { recursive: true });
	}
}
