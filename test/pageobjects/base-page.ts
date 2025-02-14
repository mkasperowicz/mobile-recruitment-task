export default class BasePage {
	async waitForElementDisplayed(selector: string, timeout: number = 5000): Promise<void> {
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
