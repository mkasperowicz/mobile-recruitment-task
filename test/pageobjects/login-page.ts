import BasePage from './base-page';

class LoginPage extends BasePage {
	private readonly usernameField = '~test-Username';
	private readonly passwordField = '~test-Password';
	private readonly loginButton = '~test-LOGIN';

	private defaultUsername = 'standard_user';
	private defaultPassword = 'secret_sauce';

	async login(username: string = this.defaultUsername, password: string = this.defaultPassword) {
		await this.enterText(this.usernameField, username);
		await this.enterText(this.passwordField, password);
		await this.clickElement(this.loginButton);
	}
}

export default new LoginPage();
