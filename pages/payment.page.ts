import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) { }

  paymentButton = this.page.getByRole('link', { name: 'płatności' });

  tansferReciverInput = this.page.getByTestId('transfer_receiver');
  transferAccountInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');

  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  actionCloseButton = this.page.getByTestId('close-button');

  messageText = this.page.locator('#show_messages');
}
