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

	async goToCart() {
		if (driver.isIOS) {
			const cartButton = await $('~test-Cart');
			const location = await cartButton.getLocation();
			const size = await cartButton.getSize();

			const targetX = location.x + size.width / 2;
			const targetY = location.y + size.height - 1;

			await driver.performActions([
				{
					type: 'pointer',
					id: 'finger1',
					parameters: { pointerType: 'touch' },
					actions: [
						{ type: 'pointerMove', duration: 0, x: targetX, y: targetY },
						{ type: 'pointerDown', button: 0 },
						{ type: 'pause', duration: 100 },
						{ type: 'pointerUp', button: 0 },
					],
				},
			]);
		} else {
			const cartButton = await $('//*[@content-desc="test-Cart"]');
			await cartButton.click();
		}
	}
}

export default new ProductsPage();
