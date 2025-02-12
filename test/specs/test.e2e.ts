import { expect } from '@wdio/globals';

describe('Sauce Labs Demo App', () => {
	it('should display the "The currently accepted usernames" text', async () => {
		const isIOS = driver.isIOS;
		const textSelector = isIOS
			? '//*[contains(@name, "The currently accepted usernames")]' // iOS
			: '//*[contains(@text, "The currently accepted usernames")]'; // Android

		const textElement = await $(textSelector);
		await expect(textElement).toBeExisting();
	});
});
