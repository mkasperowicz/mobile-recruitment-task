import BasePage from './base-page';

class CartPage extends BasePage {
	async removeProductFromCart(productName: string): Promise<void> {
		const productSelector = driver.isIOS
			? `//XCUIElementTypeOther[
				XCUIElementTypeStaticText[@name="test-Description" 
				and contains(@label, "${productName}")]
				]`
			: `//android.view.ViewGroup[@content-desc="test-Item"][.//android.widget.TextView[@text="${productName}"]]`;

		const priceSelector = driver.isIOS
			? `//XCUIElementTypeOther[contains(@name, "${productName}")]
      /XCUIElementTypeOther[@name="test-Price"]
      /XCUIElementTypeStaticText[contains(@name, "$")]`
			: `${productSelector}//android.view.ViewGroup[@content-desc="test-Price"]/android.widget.TextView`;

		const removeButtonSelector = driver.isIOS
			? `//XCUIElementTypeOther[
				XCUIElementTypeStaticText[@name="${productName}"]
				]
				/following-sibling::XCUIElementTypeOther
				//XCUIElementTypeOther[@name="test-REMOVE"]`
			: `${productSelector}//android.view.ViewGroup[@content-desc="test-REMOVE"]`;

		const priceElement = await $(priceSelector);
		const removeButton = await $(removeButtonSelector);

		if (driver.isAndroid) {
			const isRemoveVisible = await removeButton.isDisplayed().catch(() => false);
			if (!isRemoveVisible) {
				await this.nativeScrollTo(removeButtonSelector);
			}
		}

		const priceText = await priceElement.getText();
		const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

		BasePage.cartProducts = BasePage.cartProducts.filter((p) => p !== productName);
		BasePage.totalPrice = parseFloat((BasePage.totalPrice - price).toFixed(2));
		console.log(`Removed ${productName}: -${price} => Total: ${BasePage.totalPrice}`);

		await removeButton.click();
	}

	async proceedToCheckout(): Promise<void> {
		const checkoutButtonSelector = driver.isIOS ? '~test-CHECKOUT' : '//*[@content-desc="test-CHECKOUT"]';

		await this.nativeScrollTo(checkoutButtonSelector);
		const button = await $(checkoutButtonSelector);
		await button.click();
	}
}

export default new CartPage();
