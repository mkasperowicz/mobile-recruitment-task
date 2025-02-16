import BasePage from './base-page';

class ProductPage extends BasePage {
	async getProductPrice(): Promise<number> {
		const priceSelector = driver.isIOS
			? '//XCUIElementTypeStaticText[@name="test-Price"]'
			: '//*[@content-desc="test-Price"]';
		const priceText = await this.getText(priceSelector);
		return parseFloat(priceText.replace('$', ''));
	}

	async addToCart(): Promise<void> {
		const addToCartButtonSelector = driver.isIOS ? '~test-ADD TO CART' : '//*[@content-desc="test-ADD TO CART"]';
		const addToCartButton = await $(addToCartButtonSelector);
		await addToCartButton.click();
	}

	async goBackToProducts(): Promise<void> {
		const backButtonSelector = driver.isIOS ? '~test-BACK TO PRODUCTS' : '//*[@content-desc="test-BACK TO PRODUCTS"]';
		const backButton = await $(backButtonSelector);
		await backButton.click();
	}
}

export default new ProductPage();
