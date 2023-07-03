import { test, expect } from '@playwright/test';

test('login with correct credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('12345678');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('12345678');
  //  await page.getByTestId('password-input').fill('');
  await page.getByTestId('login-button').click();
  await page.getByTestId('user-name').click();

  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  //  await expect(page.getByTestId('user-name')).toHaveText('Jan DemobankowyX');
});

test('login with incorrect credentials incorrect username', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('123456');
  await page.getByTestId('password-input').click();
  //  await page.getByTestId('password-input').fill('');
  await page.getByTestId('login-button').click();
  await page.getByTestId('user-name').click();

  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  //  await expect(page.getByTestId('user-name')).toHaveText('Jan DemobankowyX');
});
