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
}
