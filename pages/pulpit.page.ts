import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReciver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');

  topUpReciverInput = this.page.locator('#widget_1_topup_receiver');
  topUpAmount = this.page.locator('#widget_1_topup_amount');
  topupAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );

  topUpButton = this.page.getByRole('button', { name: 'doładuj telefon' });

  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  actionCloseButton = this.page.getByTestId('close-button');

  messageText = this.page.locator('#show_messages');
  moneyValueText = this.page.locator('#money_value');
  userNameText = this.page.getByTestId('user-name');

  async executeQuickPayment (
    reciverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReciver.selectOption(reciverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.transferButton.click();
    await this.actionCloseButton.click();
  }

  async executeMobileTopUp(
    topUpReciver: string,
    topUpAmount: string,
  ): Promise<void> {
    await this.topUpReciverInput.selectOption(topUpReciver);
    await this.topUpAmount.fill(topUpAmount);
    await this.topupAgreementCheckbox.click();
    await this.topUpButton.click();
    await this.actionCloseButton.click();
  }

}
