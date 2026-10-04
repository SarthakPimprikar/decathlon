/* Selectors shared by every listing (aisle or search results) and every product page. */
export const CommonLocators = {
  // The header text of a facet, e.g. "Gender". Clicking it folds or unfolds the facet.
  facetHeader: (name: string): string => `xpath=(//*[normalize-space(text())="${name}"])[1]`,

  // The first tickable choice that comes after that facet's header.
  facetChoice: (name: string): string =>
    `xpath=(//*[normalize-space(text())="${name}"])[1]/following::label[.//input[@type="checkbox"]][1]`,

  // The first visible tickable choice on the page (the facet that is open), skipping the stock switch.
  openFacetChoice: 'label:has(input[type="checkbox"]):not(:has-text("out of stock")):visible',

  clearAll: 'xpath=(//*[normalize-space(text())="Clear all"])[1]',

  productLink: 'a[href*="/p/"]',
  productName: 'h1',
};
