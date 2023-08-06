import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');

  // await page.getByTestId('login-input').fill(userID);
  // await page.getByTestId('password-input').fill(userPassword);
  // await page.getByTestId('login-button').click();
}
