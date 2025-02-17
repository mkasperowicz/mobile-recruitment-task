import { config as baseConfig } from './wdio.conf';

export const config: WebdriverIO.Config = {
	...baseConfig,
	services: ['appium'],
	capabilities: [
		{
			platformName: 'iOS',
			'appium:deviceName': process.env.DEVICE_NAME || 'iPhone 15',
			'appium:platformVersion': process.env.PLATFORM_VERSION || '18.2',
			'appium:automationName': 'XCUITest',
			'appium:app': process.env.APP_PATH || './apps/SauceLabs-Demo-iOS.app',
			'appium:autoAcceptAlerts': true,
			'appium:noReset': false,
		},
	],
};
