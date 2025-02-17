import type { Options } from '@wdio/types';

const getLogLevel = (): Options.WebDriver['logLevel'] => {
	const allowedLogLevels: Options.WebDriver['logLevel'][] = ['trace', 'debug', 'info', 'warn', 'error', 'silent'];
	const logLevel = process.env.LOG_LEVEL as Options.WebDriver['logLevel'];

	return allowedLogLevels.includes(logLevel) ? logLevel : 'info';
};

export const config: WebdriverIO.Config = {
	runner: 'local',
	hostname: '127.0.0.1',
	port: 4723,
	path: '/',
	tsConfigPath: './test/tsconfig.json',

	specs: ['./test/specs/**/*.ts'],
	exclude: [],

	maxInstances: process.env.MAX_INSTANCES ? parseInt(process.env.MAX_INSTANCES) : 1,

	logLevel: getLogLevel(),

	waitforTimeout: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 10000,
	connectionRetryTimeout: process.env.RETRY_TIMEOUT ? parseInt(process.env.RETRY_TIMEOUT) : 120000,
	connectionRetryCount: process.env.RETRY_COUNT ? parseInt(process.env.RETRY_COUNT) : 3,

	framework: 'mocha',

	reporters: ['spec'],

	mochaOpts: {
		ui: 'bdd',
		timeout: 60000,
	},

	// Capabilities are specified for each platform in a separate config file
	capabilities: [],
};
