import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { paymentData } from '../test-data/payment.data';
import { PaymentPage } from '../pages/payment.page';

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
    const tansferReciver = paymentData.tansferReciver;
    const transferAccount = paymentData.transferAccount;
    const transferAmount = paymentData.transferAmount;
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Justyna Malina`;

    // Act
    const paymentPage = new PaymentPage(page)
    await paymentPage.tansferReciverInput.fill(tansferReciver);
    await paymentPage.transferAccountInput.fill(transferAccount);
    await paymentPage.transferAmountInput.fill(transferAmount);
    await paymentPage.transferButton.click();
    await paymentPage.actionCloseButton.click();

    //Assert
    await expect(paymentPage.showMessages).toHaveText(expectedMessage);
  });
});
