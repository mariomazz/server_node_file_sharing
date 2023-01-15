import { App } from "./app";
import { EnvManager } from "./providers/env/env";

const main = async () => {
	await EnvManager.initAndFetchEnv();
	const app = new App();
	app.init();
};

main();
