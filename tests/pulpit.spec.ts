import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
    test('quick payment with correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('12345678');
        await page.getByTestId('password-input').fill('12345678');
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('123,99');
        await page.locator('#widget_1_transfer_title').fill('Zwrot środków');
        await page.locator('#execute_btn').click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 123,99PLN - Zwrot środków');
    });
});

// lokator - metoda w jaki sposób łapiemy jak odnajduemy element
//
// selektor - adres elementu

// $$('#widget_1_transfer_amount') sprawdzenie elemetu w konsoli 