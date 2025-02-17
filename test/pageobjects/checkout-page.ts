import BasePage from './base-page';

class CheckoutPage extends BasePage {
	async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
		await this.enterText(driver.isIOS ? '~test-First Name' : '//*[@content-desc="test-First Name"]', firstName);
		await this.enterText(driver.isIOS ? '~test-Last Name' : '//*[@content-desc="test-Last Name"]', lastName);
		await this.enterText(
			driver.isIOS ? '~test-Zip/Postal Code' : '//*[@content-desc="test-Zip/Postal Code"]',
			postalCode,
		);
		const continueButton = await $(driver.isIOS ? '~test-CONTINUE' : '//*[@content-desc="test-CONTINUE"]');
		await continueButton.click();
	}

	async checkItemTotal(): Promise<boolean> {
		const totalValueSelector = driver.isIOS
			? '//XCUIElementTypeStaticText[contains(@name, "Item total:")]'
			: '//android.widget.TextView[contains(@text, "Item total:")]';

		let totalValueElement = await $(totalValueSelector);
		const isTotalValueVisible = await totalValueElement.isDisplayed().catch(() => false);

		await this.nativeScrollTo(totalValueSelector);

		const totalValueText = await totalValueElement.getText();
		const totalValue = parseFloat(totalValueText.replace(/[^0-9.]/g, ''));

		console.log(`Item Total from UI: ${totalValue}`);
		console.log(`Calculated Base Total: ${BasePage.totalPrice}`);

		return totalValue === BasePage.totalPrice;
	}

	async isProductInCheckout(productName: string): Promise<boolean> {
		if (driver.isIOS) {
			const checkoutContainerSelector = '(//XCUIElementTypeOther[@name[contains(., "CHECKOUT: OVERVIEW")]])[2]';
			const checkoutContainer = await $(checkoutContainerSelector);

			const productSelector = `.//XCUIElementTypeStaticText[@name="${productName}"]`;

			const productElements = await checkoutContainer.$$(productSelector);
			return (await productElements.length) > 0;
		} else {
			const productSelector = `//android.view.ViewGroup[@content-desc="test-Item"]
        [.//android.widget.TextView[@text="${productName}"]]`;

			if (await $(productSelector).isDisplayed()) return true;

			await this.nativeScrollTo(productSelector);
			return await $(productSelector)
				.waitForDisplayed({ timeout: 2000, interval: 200 })
				.catch(() => false);
		}
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
