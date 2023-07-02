import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
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

// npx playwright codegen https://demo-bank.vercel.app/  - nagrywanie
// npx palwright test  - puszczanie testu (testy z głownego katalogu , bo config.ts)
// npx playwright show-reprt
// npx playwright test --headed uruchomi testy z wyświetleniem przeglądarki