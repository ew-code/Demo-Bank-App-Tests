import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;

    await page.goto('/'); //baseURL w playwright config

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('Simple payment', async ({ page }) => {
    // Arrange
    const tansferReciver = 'Justyna Malina';
    const transferAccount = '12 3456 7890 1234 5678 9012 3456';
    const transferAmount = '777';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Justyna Malina`;

    // Act
    await page.getByTestId('transfer_receiver').fill(tansferReciver);
    await page.getByTestId('form_account_to').fill(transferAccount);
    await page.getByTestId('form_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
