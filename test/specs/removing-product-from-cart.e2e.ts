import Header from '../pageobjects/header';
import CartPage from '../pageobjects/cart-page';
import LoginPage from '../pageobjects/login-page';
import ProductsPage from '../pageobjects/products-page';
import CheckoutPage from '../pageobjects/checkout-page';

describe('Cart product removal: ', () => {
	before(async () => {
		await LoginPage.login();
	});

	it('should remove product from the cart and verify in checkout', async () => {
		// Add products to cart and verify the cart
		await ProductsPage.addProductToCart('Sauce Labs Backpack');
		await ProductsPage.addProductToCart('Sauce Labs Bike Light');
		await ProductsPage.addProductToCart('Sauce Labs Fleece Jacket');
		await Header.assertCartItemCount();
		await ProductsPage.goToCart();

		// Remove product and verify count again
		await CartPage.removeProductFromCart('Sauce Labs Fleece Jacket');
		await Header.assertCartItemCount();

		// Proceed to checkout
		await CartPage.proceedToCheckout();
		await CheckoutPage.fillCheckoutForm('Michael', 'Key', '77777');

		// Verify products at checkout
		expect(await CheckoutPage.isProductInCheckout('Sauce Labs Backpack')).toBeTruthy();
		expect(await CheckoutPage.isProductInCheckout('Sauce Labs Bike Light')).toBeTruthy();
		expect(await CheckoutPage.isProductInCheckout('Sauce Labs Fleece Jacket')).toBeFalsy();
	});
});
