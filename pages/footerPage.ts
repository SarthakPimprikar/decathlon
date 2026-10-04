import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { FooterLocators } from '../ui-store/footerLocators';
import { Routes } from '../ui-store/routes';
import { Expected } from '../ui-store/expected';
import { NetworkUtil } from '../utils/networkUtil';

/* The support pages and the links that leave the site. */
export class FooterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openSupport(): Promise<void> {
    await this.open(Routes.support);
    await NetworkUtil.waitForUrlContaining(this.page, Expected.address.support);
  }

  /* Click an outside link so that it opens in a tab of its own (Ctrl/Cmd+click works for any link). */
  async openOutsideLinkInTab(): Promise<void> {
    await this.page.locator(FooterLocators.outsideLink).first().click({ modifiers: ['ControlOrMeta'] });
    this.log.info('openOutsideLinkInTab', 'Clicked an outside link');
  }
}
