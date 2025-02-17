import Header from '../pageobjects/header';
import CartPage from '../pageobjects/cart-page';
import LoginPage from '../pageobjects/login-page';
import ProductsPage from '../pageobjects/products-page';
import CheckoutPage from '../pageobjects/checkout-page';

describe('Complete purchase flow: ', () => {
	before(async () => {
		await LoginPage.login();
	});

	it('should successfully purchase selected products', async () => {
		// Add products to cart and verify the cart
		await ProductsPage.addProductToCart('Sauce Labs Backpack');
		await ProductsPage.addProductToCart('Sauce Labs Onesie');
		await Header.assertCartItemCount();
		await ProductsPage.goToCart();

		// Proceed to checkout
		await CartPage.proceedToCheckout();
		await CheckoutPage.fillCheckoutForm('Michael', 'Key', '77777');

		// Verify products at checkout
		expect(await CheckoutPage.isProductInCheckout('Sauce Labs Backpack')).toBeTruthy();
		expect(await CheckoutPage.isProductInCheckout('Sauce Labs Onesie')).toBeTruthy();
		expect(await CheckoutPage.checkItemTotal()).toBeTruthy();
		await CheckoutPage.finishCheckout();
		expect(await CheckoutPage.isOrderConfirmed()).toBeTruthy();
	});
});
