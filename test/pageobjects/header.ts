import BasePage from './base-page';

class Header extends BasePage {
	async getCartItemCount(): Promise<number> {
		if (driver.isIOS) {
			const cartLabelSelector = '~test-Cart';
			const cartLabel = await $(cartLabelSelector);
			const countText = await cartLabel.getAttribute('label');
			return parseInt(countText, 10) || 0;
		} else {
			const cartLabelSelector =
				'//android.view.ViewGroup[@content-desc="test-Cart"]/android.view.ViewGroup/android.widget.TextView';
			const cartLabel = await $(cartLabelSelector);
			const countText = await cartLabel.getText();
			return parseInt(countText, 10) || 0;
		}
	}

	async assertCartItemCount(): Promise<void> {
		const expectedCartCount = BasePage.cartProducts.length;
		const actualCartCount = await this.getCartItemCount();

		expect(actualCartCount).toEqual(expectedCartCount);
	}
}

export default new Header();
