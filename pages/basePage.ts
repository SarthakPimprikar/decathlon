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

  /* Open an address (relative to the baseURL) on the page we already have. */
  async open(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    this.log.info('open', `Opened ${path}`);
  }

  /* Go back to the page before this one. */
  async goBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
    this.log.info('goBack', `Back on ${this.page.url()}`);
  }
}
