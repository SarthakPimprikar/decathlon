import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { CommonLocators } from '../ui-store/commonLocators';

/* A product page (/p/...). */
export class DetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /* The product's name, for the test to check it is visible. */
  productName(): Locator {
    return this.page.locator(CommonLocators.productName).first();
  }
}
