import { test, expect } from '@playwright/test';
import { loginData } from "../test-data/login.data";

test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    const userID = loginData.userID;
    const userPassword = loginData.password;

    await page.goto("/"); //baseURL w playwright config
    await page.getByTestId("login-input").fill(userID);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('Simple payment', async ({ page }) => {
    // Arrange
    const tansferReciver = 'Justyna Malina';
    const transferAccount = '12 3456 7890 1234 56';
    const transferAmount = '777';

    // Act
    await page.getByTestId('transfer_receiver').fill(tansferReciver);
    await page.getByTestId('form_account_to').fill(transferAccount);
    await page.getByTestId('form_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    //Assert
  });
});