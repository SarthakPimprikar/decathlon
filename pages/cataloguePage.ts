import { Locator, Page } from '@playwright/test';
import { ResultsPage } from './resultsPage';
import { CatalogueLocators } from '../ui-store/catalogueLocators';

/* A product aisle, e.g. /c/cycles-25536. It lists products with facets just like search results. */
export class CataloguePage extends ResultsPage {
  constructor(page: Page) {
    super(page);
  }

  async openAisle(route: string): Promise<void> {
    await this.open(route);
    await this.waitForProducts();
  }

  /* Step back from a product to the aisle. */
  async returnToAisle(): Promise<void> {
    await this.goBack();
    await this.waitForProducts();
  }

  /* The aisle's heading, for the test to check it is visible. */
  heading(): Locator {
    return this.page.locator(CatalogueLocators.aisleHeading).first();
  }
}
