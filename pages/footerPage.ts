import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { FooterLocators } from '../ui-store/footerLocators';

/* Actions for this page go here; selectors come from ui-store. */
export class FooterPage extends BasePage {
  protected readonly locators = FooterLocators;

  constructor(page: Page) {
    super(page);
  }
}
