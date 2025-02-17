export default class BasePage {
	// Needed for validating if the total price on the confirmation screen is the same as value of added products
	static totalPrice: number = 0;
	//Needed for scrolling issues in the cart
	static cartProducts: string[] = [];

	async waitForElementDisplayed(selector: string, timeout: number = 3000): Promise<void> {
		const element = await $(selector);
		await element.waitForDisplayed({ timeout });
	}

	async clickElement(selector: string): Promise<void> {
		const element = await $(selector);
		await element.click();
	}

	async enterText(selector: string, text: string): Promise<void> {
		const element = await $(selector);
		await element.setValue(text);
	}

	async getText(selector: string): Promise<string> {
		const element = await $(selector);
		return element.getText();
	}

	async nativeScrollTo(selector: string): Promise<void> {
		try {
			const element = await $(selector);

			if (await element.isDisplayed()) return;

			const maxAttempts = 3;
			let attempts = 0;

			while (attempts < maxAttempts) {
				if (await element.isDisplayed()) return;

				if (driver.isIOS) {
					await driver.execute('mobile: swipe', {
						direction: 'up',
					});
				} else {
					await driver.execute('mobile: scrollGesture', {
						elementId: element.elementId,
						left: 100,
						top: 800,
						width: 800,
						height: 800,
						direction: 'down',
						percent: 0.5,
					});
				}

				await driver.pause(300);
				attempts++;
			}

			if (!(await element.isDisplayed())) {
				console.warn(`[WARN] nativeScrollTo failed to find element: ${selector} after ${maxAttempts} attempts`);
			}
		} catch (error) {
			console.error(`[ERROR] nativeScrollTo failed for selector: ${selector}`);
			throw error;
		}
	}
}
