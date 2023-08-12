import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { topUpData, transferData } from '../test-data/pulpit.data';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;
    // const url = "https://demo-bank.vercel.app/";
    // await page.goto(url);
    await page.goto('/'); //baseURL w playwright config

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

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.transferReciver.selectOption(reciverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);

    await pulpitPage.executeButton.click();
    await pulpitPage.closeButton.click();

    await expect(pulpitPage.showMessages).toHaveText(expectedTransferMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    const topUpReciver = topUpData.topUpReciver;
    const topUpAmount = topUpData.topUpAmount;

    const expectedMobileTopUpMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciver}`;

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topUpReciver.selectOption(topUpReciver);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topupAgreement.click();
    await pulpitPage.topUpButton.click();
    await pulpitPage.closeButton.click();

    await expect(pulpitPage.showMessages).toHaveText(expectedMobileTopUpMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    const topUpReciver = topUpData.topUpReciver;
    const topUpAmount = topUpData.topUpAmount;

    const initialBlance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBlance) - Number(topUpAmount);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topUpReciver.selectOption(topUpReciver);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topupAgreement.click();
    await pulpitPage.topUpButton.click();
    await pulpitPage.closeButton.click();

    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});

// lokator - metoda w jaki sposób łapiemy jak odnajduemy element

// selektor - adres elementu

// $$('#widget_1_transfer_amount') sprawdzenie elemetu w konsoli !!!!

// czyścimy testy np. z niepotrzebnych kliknięć

// alt + shift + strzałka w dół (kopiuje linie i wkleja ją niżej)
