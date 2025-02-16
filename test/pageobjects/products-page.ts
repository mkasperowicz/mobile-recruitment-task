import BasePage from './base-page';
import ProductPage from './product-page';

class ProductsPage extends BasePage {
	async openProduct(productName: string): Promise<typeof ProductPage> {
		const productSelector = driver.isIOS
			? `//XCUIElementTypeOther[
				XCUIElementTypeStaticText[
						@name="test-Item title" 
						and contains(@label, "${productName}")
					]
				]`
			: `//*[@text="${productName}" or @name="${productName}"]`;
		const productElement = await $(productSelector);
		await productElement.scrollIntoView();
		await productElement.click();

		const backToProductsSelector = driver.isIOS
			? '~test-BACK TO PRODUCTS'
			: '//*[@content-desc="test-BACK TO PRODUCTS"]';

		await this.waitForElementDisplayed(backToProductsSelector);

		return ProductPage;
	}

	async addProductToCart(productName: string): Promise<void> {
		const productPage = await this.openProduct(productName);
		const price = await productPage.getProductPrice();
		await productPage.addToCart();

		BasePage.cartProducts.push(productName);
		BasePage.totalPrice += price;
		console.log(`Added ${productName}: +${price} => Total: ${BasePage.totalPrice}`);

		await productPage.goBackToProducts();
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
