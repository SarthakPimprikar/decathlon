import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { SearchLocators } from '../ui-store/searchLocators';
import { Expected } from '../ui-store/expected';
import { NetworkUtil } from '../utils/networkUtil';

/* The search field that sits on every page. */
export class SearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async typeTerm(term: string): Promise<void> {
    await this.page.locator(SearchLocators.searchInput).first().fill(term);
    this.log.info('typeTerm', `Typed "${term}"`);
  }

  /* Press Enter with the search field focused, then wait for the results address. */
  async submit(): Promise<void> {
    await this.page.locator(SearchLocators.searchInput).first().press(Expected.keyPressed);
    await NetworkUtil.waitForUrlContaining(this.page, Expected.address.search);
    this.log.info('submit', 'Search submitted');
  }
}
