import { test, expect, Page, BrowserContext } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';
import { ResultsPage } from '../pages/resultsPage';
import { DetailPage } from '../pages/detailPage';
import { FooterPage } from '../pages/footerPage';
import { Routes } from '../ui-store/routes';
import { Expected } from '../ui-store/expected';
import { ConfigReader } from '../utils/configReader';
import { getLogger } from '../utils/logger';
import { NetworkUtil } from '../utils/networkUtil';
import { ScreenshotUtil } from '../utils/screenshotUtil';

const log = getLogger('01_searchACycleAndNarrowIt');

// One flow, one page: the steps run in order and each begins where the one before ended.
test.describe('Decathlon India - search ACycle And Narrow It', () => {
  test.describe.configure({ mode: 'serial' });

  let context: BrowserContext;
  let page: Page;
  let home: HomePage;
  let search: SearchPage;
  let results: ResultsPage;
  let detail: DetailPage;
  let footer: FooterPage;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({ baseURL: ConfigReader.baseUrl, viewport: Expected.viewport });
    page = await context.newPage();
    home = new HomePage(page);
    search = new SearchPage(page);
    results = new ResultsPage(page);
    detail = new DetailPage(page);
    footer = new FooterPage(page);
  });

  test.afterAll(async () => {
    await context.close();
  });

  // Every step gets a screenshot in the report; a failed step also gets a full-page one.
  test.afterEach(async ({}, testInfo) => {
    await ScreenshotUtil.attach(page, testInfo, testInfo.title);
    await ScreenshotUtil.captureOnFailure(page, testInfo);
  });

  test('search_acycle_and_narrow_it_01_open_decathlon_india', async () => {
    await home.openHome();
  });

  test('search_acycle_and_narrow_it_02_ask_the_shop_for_a_cycle', async () => {
    await search.typeTerm(Expected.typed.cycle);
  });

  test('search_acycle_and_narrow_it_03_submit_the_search', async () => {
    await search.submit();
  });

  test('search_acycle_and_narrow_it_04_the_search_has_an_address_of_its_own', async () => {
    await expect(page).toHaveURL(new RegExp(Expected.address.search));
  });

  test('search_acycle_and_narrow_it_05_unfold_gender_a_facet_that_starts_closed', async () => {
    await results.unfoldFacet(Expected.facets.gender);
  });

  test('search_acycle_and_narrow_it_06_tick_a_choice_inside_the_facet_that_is_open', async () => {
    await results.tickChoiceInOpenFacet();
  });

  test('search_acycle_and_narrow_it_07_unfold_gender_a_different_facet', async () => {
    await results.unfoldFacet(Expected.facets.gender);
  });

  test('search_acycle_and_narrow_it_08_tick_a_choice_inside_gender', async () => {
    await results.tickChoiceInFacet(Expected.facets.gender);
  });

  test('search_acycle_and_narrow_it_09_unfold_category_a_different_facet', async () => {
    await results.unfoldFacet(Expected.facets.category);
  });

  test('search_acycle_and_narrow_it_10_tick_a_choice_inside_category', async () => {
    await results.tickChoiceInFacet(Expected.facets.category);
  });

  test('search_acycle_and_narrow_it_11_unfold_brand_a_facet_that_starts_closed', async () => {
    await results.unfoldFacet(Expected.facets.brand);
  });

  test('search_acycle_and_narrow_it_12_unfold_discount_a_different_facet', async () => {
    await results.unfoldFacet(Expected.facets.discount);
  });

  test('search_acycle_and_narrow_it_13_and_unfold_rating', async () => {
    await results.unfoldFacet(Expected.facets.rating);
  });

  test('search_acycle_and_narrow_it_14_open_a_cycle_from_what_survived', async () => {
    await results.openProduct();
  });

  test('search_acycle_and_narrow_it_15_the_cycle_is_named', async () => {
    await expect(detail.productName()).toBeVisible();
  });

  test('search_acycle_and_narrow_it_16_ask_the_shop_for_a_helmet_instead', async () => {
    await search.typeTerm(Expected.typed.helmet);
  });

  test('search_acycle_and_narrow_it_17_submit_the_second_search', async () => {
    await search.submit();
  });

  test('search_acycle_and_narrow_it_18_open_a_helmet', async () => {
    await results.openProduct();
  });

  test('search_acycle_and_narrow_it_19_go_on_to_the_support_pages', async () => {
    await footer.openSupport();
  });

  test('search_acycle_and_narrow_it_20_open_one_of_the_outside_links_there_in_a_tab_of_', async () => {
    const tab = await NetworkUtil.openInNewTab(context, () => footer.openOutsideLinkInTab());
    const landedOn = await NetworkUtil.readAndClose(tab);
    log.info('step20', `The outside link landed on ${landedOn}`);
  });
});
