import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { CommonLocators } from '../ui-store/commonLocators';

/* Actions for this page go here; selectors come from ui-store. */
export class DetailPage extends BasePage {
  protected readonly locators = CommonLocators;

  constructor(page: Page) {
    super(page);
  }
}
