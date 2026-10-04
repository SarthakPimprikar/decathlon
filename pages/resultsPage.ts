import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { CommonLocators } from '../ui-store/commonLocators';
import { Expected } from '../ui-store/expected';
import { NetworkUtil } from '../utils/networkUtil';

/* A listing of products with facets: search results and aisles both behave like this. */
export class ResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /* Wait until at least one product is on show. */
  async waitForProducts(): Promise<void> {
    await this.page.locator(CommonLocators.productLink).first().waitFor({ state: 'visible' });
  }

  /* Click the header of a facet to unfold it. */
  async unfoldFacet(name: string): Promise<void> {
    await this.page.locator(CommonLocators.facetHeader(name)).first().click();
    this.log.info('unfoldFacet', `Clicked the ${name} facet`);
  }

  /* Tick the first choice of the facet that is already open. */
  async tickChoiceInOpenFacet(): Promise<void> {
    await this.page.locator(CommonLocators.openFacetChoice).first().click();
    await this.waitForProducts();
    this.log.info('tickChoiceInOpenFacet', 'Ticked a choice in the open facet');
  }

  /* Tick the first choice of a named facet (unfolding it first if its choices are hidden). */
  async tickChoiceInFacet(name: string): Promise<void> {
    const choice = this.page.locator(CommonLocators.facetChoice(name)).first();
    if (!(await choice.isVisible())) {
      await this.unfoldFacet(name);
    }
    await choice.click();
    await this.waitForProducts();
    this.log.info('tickChoiceInFacet', `Ticked a choice in ${name}`);
  }

  /* Take every narrowing off. */
  async clearAllFilters(): Promise<void> {
    await this.page.locator(CommonLocators.clearAll).first().click();
    await this.waitForProducts();
    this.log.info('clearAllFilters', 'Cleared all filters');
  }

  /* Open a product (not the one whose address is given). Returns the address it opened. */
  async openProduct(excludeHref?: string): Promise<string> {
    await this.waitForProducts();
    const selector = excludeHref
      ? `${CommonLocators.productLink}:not([href="${excludeHref}"])`
      : CommonLocators.productLink;
    const link = this.page.locator(selector).first();
    const href = (await link.getAttribute('href')) ?? '';
    // Click near the top-left corner of the card so the click lands on the product, not on a button.
    await link.click({ position: { x: 20, y: 20 } });
    await NetworkUtil.waitForUrlContaining(this.page, Expected.address.product);
    this.log.info('openProduct', `Opened ${href}`);
    return href;
  }

  /* Every tickable choice on show, so a test can count them. */
  openFacetChoices(): Locator {
    return this.page.locator(CommonLocators.openFacetChoice);
  }

  /* Open the product with the highest price on show. Returns the address it opened. */
  async openDearerProduct(): Promise<string> {
    await this.waitForProducts();
    const cards = this.page.locator(CommonLocators.productLink);
    const texts = await cards.allInnerTexts();

    let dearest = -1;
    let index = 0;
    texts.forEach((text, i) => {
      const match = text.match(/₹\s*([\d,]+)/);
      const price = match ? Number(match[1].replace(/,/g, '')) : -1;
      if (price > dearest) {
        dearest = price;
        index = i;
      }
    });

    const link = cards.nth(index);
    const href = (await link.getAttribute('href')) ?? '';
    await link.click({ position: { x: 20, y: 20 } });
    await NetworkUtil.waitForUrlContaining(this.page, Expected.address.product);
    this.log.info('openDearerProduct', `Opened ${href} (price ${dearest})`);
    return href;
  }
}
