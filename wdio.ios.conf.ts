import { config as baseConfig } from './wdio.conf';

export const config: WebdriverIO.Config = {
	...baseConfig,
	services: ['appium'],
	capabilities: [
		{
			platformName: 'iOS',
			'appium:deviceName': 'iPhone 15',
			'appium:platformVersion': '18.2',
			'appium:automationName': 'XCUITest',
			'appium:app': './apps/SauceLabs-Demo-iOS.app',
			'appium:autoAcceptAlerts': true,
			'appium:noReset': false,
		},
	],
};
