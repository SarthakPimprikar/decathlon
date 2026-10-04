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

  /* Reload the page as it stands. */
  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    this.log.info('reload', `Reloaded ${this.page.url()}`);
  }

  /* Scroll until the foot of the page is in view (keeps going while lazy content makes the page grow). */
  async scrollToFoot(): Promise<void> {
    await this.page.waitForFunction(() => {
      window.scrollTo(0, document.body.scrollHeight);
      return window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
    });
    this.log.info('scrollToFoot', 'Foot of the page is in view');
  }
}
