import BasePage from './base-page';

class CartPage extends BasePage {
	async getCartTitle(): Promise<string> {
		const titleSelector = driver.isIOS
			? '//XCUIElementTypeStaticText[@name="Your Cart"]'
			: '//*[@content-desc="Your Cart"]';

		return await this.getText(titleSelector);
	}

	async isProductInCart(productName: string): Promise<boolean> {
		const productSelector = driver.isIOS
			? `//XCUIElementTypeStaticText[@name="${productName}"]`
			: `//*[@content-desc="${productName}"]`;

		return await $(productSelector).isDisplayed();
	}

	async removeProductFromCart(productName: string): Promise<void> {
		const removeButtonSelector = driver.isIOS
			? `//XCUIElementTypeOther[./XCUIElementTypeStaticText[@name="${productName}"]]/following-sibling::XCUIElementTypeOther//XCUIElementTypeOther[@name="test-REMOVE"]`
			: `//*[@text="${productName}"]/parent::*/following-sibling::*/descendant::*[@text="REMOVE"]`;

		const removeButton = await $(removeButtonSelector);
		await removeButton.click();
	}

	async proceedToCheckout(): Promise<void> {
		const checkoutButtonSelector = driver.isIOS ? '~test-CHECKOUT' : '//*[@content-desc="test-CHECKOUT"]';

		const button = await $(checkoutButtonSelector);
		await button.click();
	}
}

export default new CartPage();
