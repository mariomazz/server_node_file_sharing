import { App } from "./app";
import { EnvManager } from "./providers/env/env";

const main = async () => {
	console.log(process.cwd());
	await EnvManager.initAndFetchEnv();
	const app = new App();
	app.init();
};

main();
