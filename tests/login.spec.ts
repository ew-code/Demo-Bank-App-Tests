import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/'); //baseURL w playwright config
    loginPage = new LoginPage(page);
  });

  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //Assert
    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arrange
    const tooShortUserId = '1234567';
    const expectedErrorTooShortUserId = 'identyfikator ma min. 8 znaków';

    //Act
    await loginPage.loginInput.fill(tooShortUserId);
    await loginPage.passwordInput.click();

    //Assert
    await expect(loginPage.loginError).toHaveText(expectedErrorTooShortUserId);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const userID = loginData.userID;
    const toShortUserPassword = '1234567';
    const expectedToShortPassword = 'hasło ma min. 8 znaków';

    //Act
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(toShortUserPassword);
    await loginPage.passwordInput.blur();

    //Assert
    await expect(loginPage.passwordError).toHaveText(expectedToShortPassword);
  });
});
