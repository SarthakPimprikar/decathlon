import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { HeaderLocators } from '../ui-store/headerLocators';

/* Actions for this page go here; selectors come from ui-store. */
export class HeaderPage extends BasePage {
  protected readonly locators = HeaderLocators;

  constructor(page: Page) {
    super(page);
  }
}
