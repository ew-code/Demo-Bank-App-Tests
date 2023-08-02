import { test, expect } from "@playwright/test";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const userID = "logintes";
    const userPassword = "password";
    // const url = "https://demo-bank.vercel.app/";
    // await page.goto(url);
    await page.goto("/"); //baseURL w playwright config
    await page.getByTestId("login-input").fill(userID);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
  });

  test("transfer with correct data", async ({ page }) => {
    const reciverId = "2";
    const transferAmount = "123";
    const transferTitle = "pizza";
    const expectedTransferReciver = "Chuck Demobankowy";
    const expectedTransferMessage = `Przelew wykonany! ${expectedTransferReciver} - ${transferAmount},00PLN - ${transferTitle}`;

    await page.locator("#widget_1_transfer_receiver").selectOption(reciverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);

    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      expectedTransferMessage
    );
  });

  test("successful mobile top-up", async ({ page }) => {
    const topUpReciver = "500 xxx xxx";
    const topUpAmount = "40,00";
    const expectedMobileTopUpMessage = `Doładowanie wykonane! ${topUpAmount}PLN na numer ${topUpReciver}`;

    await page.locator("#widget_1_topup_receiver").selectOption(topUpReciver);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      expectedMobileTopUpMessage
    );
  });

  test("correct balance after successful mobile top-up", async ({ page }) => {
    const topUpReciver = '500 xxx xxx';
    const topUpAmount = '400';
    const initialBlance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBlance) - Number(topUpAmount);

    await page.locator("#widget_1_topup_receiver").selectOption(topUpReciver);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });

});

// lokator - metoda w jaki sposób łapiemy jak odnajduemy element

// selektor - adres elementu

// $$('#widget_1_transfer_amount') sprawdzenie elemetu w konsoli !!!!

// czyścimy testy np. z niepotrzebnych kliknięć

// alt + shift + strzałka w dół (kopiuje linie i wkleja ją niżej)
