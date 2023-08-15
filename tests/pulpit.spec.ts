import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { topUpData, transferData } from '../test-data/pulpit.data';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;
    await page.goto('/'); //baseURL w playwright config
    pulpitPage = new PulpitPage(page);

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('transfer with correct data', async ({ page }) => {
    const reciverId = transferData.reciverId;
    const transferAmount = transferData.transferAmount;
    const transferTitle = transferData.transferTitle;

    const expectedTransferReciver = transferData.expectedTransferReciver;
    const expectedTransferMessage = `Przelew wykonany! ${expectedTransferReciver} - ${transferAmount},00PLN - ${transferTitle}`;

    await pulpitPage.transferReciver.selectOption(reciverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);

    await pulpitPage.transferButton.click();
    await pulpitPage.actionCloseButton.click();

    await expect(pulpitPage.messageText).toHaveText(expectedTransferMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    const topUpReciver = topUpData.topUpReciver;
    const topUpAmount = topUpData.topUpAmount;

    const expectedMobileTopUpMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciver}`;

    await pulpitPage.topUpReciverInput.selectOption(topUpReciver);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topUpButton.click();
    await pulpitPage.actionCloseButton.click();

    await expect(pulpitPage.messageText).toHaveText(expectedMobileTopUpMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    const topUpReciver = topUpData.topUpReciver;
    const topUpAmount = topUpData.topUpAmount;

    const initialBlance = await pulpitPage.moneyValueText.innerText();
    const expectedBalance = Number(initialBlance) - Number(topUpAmount);

    await pulpitPage.topUpReciverInput.selectOption(topUpReciver);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topUpButton.click();
    await pulpitPage.actionCloseButton.click();

    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});

// lokator - metoda w jaki sposób łapiemy jak odnajduemy element

// selektor - adres elementu

// $$('#widget_1_transfer_amount') sprawdzenie elemetu w konsoli !!!!

// czyścimy testy np. z niepotrzebnych kliknięć

// alt + shift + strzałka w dół (kopiuje linie i wkleja ją niżej)
