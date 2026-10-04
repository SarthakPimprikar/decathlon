import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { SearchLocators } from '../ui-store/searchLocators';

/* Actions for this page go here; selectors come from ui-store. */
export class SearchPage extends BasePage {
  protected readonly locators = SearchLocators;

  constructor(page: Page) {
    super(page);
  }
}
