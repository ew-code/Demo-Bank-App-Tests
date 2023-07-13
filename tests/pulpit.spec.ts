import { test, expect } from "@playwright/test";
//Arrange
const url = "https://demo-bank.vercel.app/";
const userID = "logintes";
const userPassword = "password";

const reciverId = "2";
const transferAmount = "123";
const transferTitle = "pizza";
const expectedTransferReciver = "Chuck Demobankowy";
const expectedTransferMessage = `Przelew wykonany! ${expectedTransferReciver} - ${transferAmount},00PLN - ${transferTitle}`;

const topUpReciver = "500 xxx xxx";
const topUpAmount = "40,00";
const expectedMobileTopUpMessage = `Doładowanie wykonane! ${topUpAmount}PLN na numer ${topUpReciver}`;

test.describe("Pulpit tests", () => {
  test("transfer with correct data", async ({ page }) => {
    //Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userID);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption(reciverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);

    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    //Assert
    await expect(page.locator("#show_messages")).toHaveText(
      expectedTransferMessage
    );
  });

  test("successful mobile top-up", async ({ page }) => {
    await page.goto(url);
    await page.getByTestId("login-input").fill(userID);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_topup_receiver").selectOption(topUpReciver);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      expectedMobileTopUpMessage
    );
  });
});

// lokator - metoda w jaki sposób łapiemy jak odnajduemy element

// selektor - adres elementu

// $$('#widget_1_transfer_amount') sprawdzenie elemetu w konsoli !!!!

// czyścimy testy np. z niepotrzebnych kliknięć

// alt + shift + strzałka w dół (kopiuje linie i wkleja ją niżej)
