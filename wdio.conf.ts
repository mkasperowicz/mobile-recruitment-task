import type { Options } from '@wdio/types';

export const config: WebdriverIO.Config = {
	runner: 'local',
	hostname: '127.0.0.1',
	port: 4723,
	path: '/',
	tsConfigPath: './test/tsconfig.json',

	specs: ['./test/specs/**/*.ts'],
	exclude: [],

	maxInstances: 10,

	logLevel: 'info',
	bail: 0,
	waitforTimeout: 10000,
	connectionRetryTimeout: 120000,
	connectionRetryCount: 3,

	framework: 'mocha',

	reporters: ['spec'],

	mochaOpts: {
		ui: 'bdd',
		timeout: 60000,
	},

	// Capabilities are specified for each platform in a separate config file
	capabilities: [],
};
