import { config as baseConfig } from './wdio.conf';

export const config: WebdriverIO.Config = {
	...baseConfig,
	services: ['appium'],
	capabilities: [
		{
			platformName: 'Android',
			'appium:deviceName': process.env.DEVICE_NAME || 'Pixel_8_Pro_API_35',
			'appium:platformVersion': process.env.PLATFORM_VERSION || '15.0',
			'appium:automationName': 'UiAutomator2',
			'appium:app': process.env.APP_PATH || './apps/SauceLabs-Demo-Android.apk',
			'appium:autoGrantPermissions': true,
			'appium:noReset': false,
			'appium:appWaitActivity': 'com.swaglabsmobileapp.MainActivity',
		},
	],
};
