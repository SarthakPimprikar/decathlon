import { BrowserContext, Page } from '@playwright/test';
import { getLogger } from './logger';

const log = getLogger('NetworkUtil');

/* Waiting helpers. Every wait is a condition, never a sleep. */
export class NetworkUtil {
  /* Wait for the page to load, then for the network to go quiet (best effort on a live site). */
  static async waitForSettled(page: Page, timeout = 15000): Promise<void> {
    await page.waitForLoadState('domcontentloaded');
    try {
      await page.waitForLoadState('networkidle', { timeout });
    } catch {
      log.warn('waitForSettled', 'Network did not go idle in time, carrying on');
    }
  }

  /* Wait until the address contains the given part, e.g. /search or /p/. */
  static async waitForUrlContaining(page: Page, part: string, timeout = 15000): Promise<void> {
    await page.waitForURL((url) => url.toString().includes(part), { timeout });
    log.info('waitForUrlContaining', `Address now contains "${part}"`);
  }

  /* Run an action that opens a tab, wait for the context to report it, return the new tab. */
  static async openInNewTab(context: BrowserContext, action: () => Promise<void>): Promise<Page> {
    const [tab] = await Promise.all([context.waitForEvent('page'), action()]);
    await tab.waitForLoadState('domcontentloaded');
    log.info('openInNewTab', 'New tab reported by the context');
    return tab;
  }

  /* Read where the tab landed, then close it. The test carries on in the original tab. */
  static async readAndClose(tab: Page): Promise<string> {
    const landedOn = tab.url();
    await tab.close();
    log.info('readAndClose', `Tab landed on ${landedOn} and was closed`);
    return landedOn;
  }
}
