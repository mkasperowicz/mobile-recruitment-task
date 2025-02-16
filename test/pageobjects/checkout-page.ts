import BasePage from './base-page';

class CheckoutPage extends BasePage {
	async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
		await this.enterText(driver.isIOS ? '~test-First Name' : '//*[@content-desc="test-First Name"]', firstName);
		await this.enterText(driver.isIOS ? '~test-Last Name' : '//*[@content-desc="test-Last Name"]', lastName);
		await this.enterText(
			driver.isIOS ? '~test-Zip/Postal Code' : '//*[@content-desc="test-Zip/Postal Code"]',
			postalCode,
		);
	}

	async continueCheckout(): Promise<void> {
		const continueButton = await $(driver.isIOS ? '~test-CONTINUE' : '//*[@content-desc="test-CONTINUE"]');
		await continueButton.click();
	}

	async checkItemTotal(): Promise<boolean> {
		const totalValueSelector = driver.isIOS
			? '//XCUIElementTypeStaticText[contains(@name, "Item total:")]'
			: '//android.widget.TextView[contains(@text, "Item total:")]';

		let totalValueElement = await $(totalValueSelector);
		const isTotalValueVisible = await totalValueElement.isDisplayed().catch(() => false);

		if (!isTotalValueVisible) {
			await totalValueElement.scrollIntoView();
		}

		const totalValueText = await totalValueElement.getText();
		const totalValue = parseFloat(totalValueText.replace(/[^0-9.]/g, ''));

		console.log(`Item Total from UI: ${totalValue}`);
		console.log(`Calculated Base Total: ${BasePage.totalPrice}`);

		return totalValue === BasePage.totalPrice;
	}

	async finishCheckout(): Promise<void> {
		const finishButton = await $(driver.isIOS ? '~test-FINISH' : '//*[@content-desc="test-FINISH"]');
		await finishButton.click();
	}

	async isOrderConfirmed(): Promise<boolean> {
		const confirmationSelector = driver.isIOS
			? '//*[contains(@name, "THANK YOU FOR YOU ORDER")]'
			: '//*[@content-desc="test-CHECKOUT: COMPLETE!"]';

		await this.waitForElementDisplayed(confirmationSelector);
		return (await $(confirmationSelector)).isDisplayed();
	}

	async getCheckoutErrorMessage(): Promise<string> {
		const errorMessageSelector = driver.isIOS
			? '//XCUIElementTypeStaticText[contains(@name, "is required")]'
			: '//*[@content-desc="test-Error message"]//android.widget.TextView';

		await this.waitForElementDisplayed(errorMessageSelector);
		return this.getText(errorMessageSelector);
	}
}

export default new CheckoutPage();
