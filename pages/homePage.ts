import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { Routes } from '../ui-store/routes';

/* The front page. */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openHome(): Promise<void> {
    await this.open(Routes.home);
  }
}
