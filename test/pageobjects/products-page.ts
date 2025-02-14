import BasePage from './base-page';

class ProductsPage extends BasePage {
	async addProductToCart(productName: string) {
		const isIOS = driver.isIOS;

		const addToCartButtonXPath = isIOS
			? `//XCUIElementTypeOther[
        ./XCUIElementTypeStaticText[@name="test-Item title" and @label="${productName}"]
        ]/following-sibling::XCUIElementTypeOther//XCUIElementTypeOther[@name="test-ADD TO CART"]`
			: `//*[@text="${productName}" or @name="${productName}"]
        /following-sibling::*[@content-desc="test-ADD TO CART"]`;

		const addToCartButton = await $(addToCartButtonXPath);

		if (await addToCartButton.isDisplayed()) {
			await addToCartButton.click();
		} else {
			throw new Error(`There is no ADD TO CART button for: ${productName}`);
		}
	}
}

export default new ProductsPage();
