import { Page } from '@playwright/test';
import { AppLogger, getLogger } from '../utils/logger';

/* Shared parent of every page object. */
export class BasePage {
  protected readonly page: Page;
  protected readonly log: AppLogger;

  constructor(page: Page) {
    this.page = page;
    this.log = getLogger(this.constructor.name);
  }
}
