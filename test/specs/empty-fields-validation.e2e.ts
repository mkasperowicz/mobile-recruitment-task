import CartPage from '../pageobjects/cart-page';
import LoginPage from '../pageobjects/login-page';
import ProductsPage from '../pageobjects/products-page';
import CheckoutPage from '../pageobjects/checkout-page';

describe('Form Validations: ', () => {
	interface CheckoutTestCase {
		firstName: string;
		lastName: string;
		postalCode: string;
		expectedError: string;
	}

	const checkoutTestCases: CheckoutTestCase[] = [
		{ firstName: '', lastName: 'Doe', postalCode: '12345', expectedError: 'First Name is required' },
		{ firstName: 'John', lastName: '', postalCode: '12345', expectedError: 'Last Name is required' },
		{ firstName: 'John', lastName: 'Doe', postalCode: '', expectedError: 'Postal Code is required' },
	];

	before(async () => {
		await LoginPage.login();
		await ProductsPage.goToCart();
		await CartPage.proceedToCheckout();
	});

	checkoutTestCases.forEach(({ firstName, lastName, postalCode, expectedError }) => {
		it(`empty field should show error: "${expectedError}"`, async () => {
			await CheckoutPage.fillCheckoutForm(firstName, lastName, postalCode);
			expect(await CheckoutPage.getCheckoutErrorMessage()).toContain(expectedError);
		});
	});
});
