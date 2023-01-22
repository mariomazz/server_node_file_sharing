import * as fs from "fs";
import { Observable, from } from "rxjs";

export class FileManager {
	writeFileAndCreateDirectory(
		dir: string,
		filename: string,
		buffer: Buffer
	): Observable<void> {
		return new Observable<void>((observer) => {
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

	createDirectory(dir: string): Observable<string> {
		return from(fs.promises.mkdir(dir, { recursive: true }));
	}

	writeFile(dir: string, buffer: Buffer): Observable<void> {
		return from(fs.promises.writeFile(dir, buffer));
	}
}
