import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { CatalogueLocators } from '../ui-store/catalogueLocators';

/* Actions for this page go here; selectors come from ui-store. */
export class CataloguePage extends BasePage {
  protected readonly locators = CatalogueLocators;

  constructor(page: Page) {
    super(page);
  }
}
