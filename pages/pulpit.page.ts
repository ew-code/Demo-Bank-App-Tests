import { Page } from '@playwright/test';

export class PulpitPage {
  constructor(private page: Page) {}
  transferReciver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');

  topUpReciver = this.page.locator('#widget_1_topup_receiver');
  topUpAmount = this.page.locator('#widget_1_topup_amount');
  topupAgreement = this.page.locator('#uniform-widget_1_topup_agreement span');
<<<<<<< HEAD
  topUpButton = this.page.getByRole('button', { name: 'doładuj telefon' });
=======
  topUpButton = this.page.getByRole('button', { name: 'doładuj telefon' })
>>>>>>> 6cf8b8bc7d44063451259722c4ae53eb5dd76772

  executeButton = this.page.getByRole('button', { name: 'wykonaj' });
  closeButton = this.page.getByTestId('close-button');

  showMessages = this.page.locator('#show_messages');
}
