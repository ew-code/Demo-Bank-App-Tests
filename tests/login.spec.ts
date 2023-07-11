import { test, expect } from '@playwright/test';

//Arrange
const url = 'https://demo-bank.vercel.app/';
const userID = 'logintes';
const userPassword = 'password';
const expectedUserName = 'Jan Demobankowy';
const tooShortUserId = '1234567';
const expectedErrorTooShortUserId = 'identyfikator ma min. 8 znaków';

test.describe('User login to Demobank', () => {

  test('successful login with correct credentials', async ({ page }) => {

    // const url = 'https://demo-bank.vercel.app/';
    // const userID = 'logintes';
    // const userPassword = 'password';
    // const expectedUserName = 'Jan Demobankowy';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test.only('unsuccessful login with too short username', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill(tooShortUserId);
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(expectedErrorTooShortUserId);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('12345678');
    await page.getByTestId('password-input').fill('1234567');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });

});