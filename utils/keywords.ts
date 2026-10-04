import { Page } from '@playwright/test';
import { ConfigReader } from './configReader';
import { getLogger } from './logger';

const log = getLogger('Keywords');

/* One row of a keyword table: what to do, on which control, with which value. */
export type Keyword = {
  action: 'open' | 'type' | 'press' | 'click' | 'hover' | 'scrollToFoot' | 'back' | 'reload' | 'title';
  target?: string;
  value?: string;
};

/* Runs the rows in order on one page. Returns the last title read. */
export async function runKeywords(page: Page, table: Keyword[]): Promise<string> {
  let title = '';
  for (const row of table) {
    try {
      log.info('runKeywords', `Running ${JSON.stringify(row)}`);
      switch (row.action) {
        case 'open':
          await page.goto(new URL(row.value as string, ConfigReader.baseUrl).toString(), {
            waitUntil: 'domcontentloaded',
          });
          break;
        case 'type':
          await page.locator(row.target as string).first().fill(row.value as string);
          break;
        case 'press':
          await page.locator(row.target as string).first().press(row.value as string);
          break;
        case 'click':
          await page.locator(row.target as string).first().click();
          break;
        case 'hover':
          await page.locator(row.target as string).first().hover();
          break;
        case 'scrollToFoot':
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          break;
        case 'back':
          await page.goBack();
          break;
        case 'reload':
          await page.reload();
          break;
        case 'title':
          title = await page.title();
          break;
      }
    } catch (error) {
      log.error('runKeywords', `Failed on ${row.action}: ${String(error)}`);
      throw error;
    }
  }
  return title;
}
