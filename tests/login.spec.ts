import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => { 
  // const url = "https://demo-bank.vercel.app/";
  // await page.goto(url);
  await page.goto('/')
})

const userID = "logintes";
const userPassword = "password";
const expectedUserName = "Jan Demobankowy";
const tooShortUserId = "1234567";
const expectedErrorTooShortUserId = "identyfikator ma min. 8 znaków";
const toShortUserPassword = "1234567";
const expectedToShortPassword = "hasło ma min. 8 znaków";

test.describe("User login to Demobank", () => {

  test.only("successful login with correct credentials", async ({ page }) => {
    await page.getByTestId("login-input").fill(userID);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    await page.getByTestId("login-input").fill(tooShortUserId);
    await page.getByTestId("password-input").click();

    await expect(page.getByTestId("error-login-id")).toHaveText(expectedErrorTooShortUserId);
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    await page.getByTestId("login-input").fill(userID);
    await page.getByTestId("password-input").fill(toShortUserPassword);
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-password")).toHaveText(expectedToShortPassword);
  });
});
