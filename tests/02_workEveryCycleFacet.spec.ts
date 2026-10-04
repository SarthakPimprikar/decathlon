import { test, expect, Page, BrowserContext } from '@playwright/test';
import { CataloguePage } from '../pages/cataloguePage';
import { DetailPage } from '../pages/detailPage';
import { Routes } from '../ui-store/routes';
import { Expected } from '../ui-store/expected';
import { ConfigReader } from '../utils/configReader';
import { getLogger } from '../utils/logger';
import { NetworkUtil } from '../utils/networkUtil';
import { ScreenshotUtil } from '../utils/screenshotUtil';

const log = getLogger('02_workEveryCycleFacet');

// One flow, one page: the steps run in order and each begins where the one before ended.
test.describe('Decathlon India - work Every Cycle Facet', () => {
  test.describe.configure({ mode: 'serial' });

  let context: BrowserContext;
  let page: Page;
  let catalogue: CataloguePage;
  let detail: DetailPage;
  let firstCycle = '';

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({ baseURL: ConfigReader.baseUrl, viewport: Expected.viewport });
    page = await context.newPage();
    catalogue = new CataloguePage(page);
    detail = new DetailPage(page);
  });

  test.afterAll(async () => {
    await context.close();
  });

  // Every step gets a screenshot in the report; a failed step also gets a full-page one.
  test.afterEach(async ({}, testInfo) => {
    await ScreenshotUtil.attach(page, testInfo, testInfo.title);
    await ScreenshotUtil.captureOnFailure(page, testInfo);
  });

  test('work_every_cycle_facet_01_open_the_cycles_aisle', async () => {
    await catalogue.openAisle(Routes.cyclesAisle);
  });

  test('work_every_cycle_facet_02_tick_a_choice_inside_the_facet_that_is_open', async () => {
    await catalogue.tickChoiceInOpenFacet();
  });

  test('work_every_cycle_facet_03_unfold_gender_a_different_facet', async () => {
    await catalogue.unfoldFacet(Expected.facets.gender);
  });

  test('work_every_cycle_facet_04_tick_a_choice_inside_gender', async () => {
    await catalogue.tickChoiceInFacet(Expected.facets.gender);
  });

  test('work_every_cycle_facet_05_unfold_category_a_different_facet', async () => {
    await catalogue.unfoldFacet(Expected.facets.category);
  });

  test('work_every_cycle_facet_06_tick_a_choice_inside_category', async () => {
    await catalogue.tickChoiceInFacet(Expected.facets.category);
  });

  test('work_every_cycle_facet_07_unfold_gender_the_second_facet', async () => {
    await catalogue.unfoldFacet(Expected.facets.gender);
  });

  test('work_every_cycle_facet_08_unfold_category_the_third', async () => {
    await catalogue.unfoldFacet(Expected.facets.category);
  });

  test('work_every_cycle_facet_09_unfold_size_the_fourth', async () => {
    await catalogue.unfoldFacet(Expected.facets.size);
  });

  test('work_every_cycle_facet_10_unfold_sport_the_fifth', async () => {
    await catalogue.unfoldFacet(Expected.facets.sport);
  });

  test('work_every_cycle_facet_11_unfold_brand_the_sixth', async () => {
    await catalogue.unfoldFacet(Expected.facets.brand);
  });

  test('work_every_cycle_facet_12_unfold_color_the_seventh', async () => {
    await catalogue.unfoldFacet(Expected.facets.color);
  });

  test('work_every_cycle_facet_13_unfold_discount_the_eighth', async () => {
    await catalogue.unfoldFacet(Expected.facets.discount);
  });

  test('work_every_cycle_facet_14_unfold_rating_the_ninth', async () => {
    await catalogue.unfoldFacet(Expected.facets.rating);
  });

  test('work_every_cycle_facet_15_open_a_cycle_from_the_narrowed_aisle', async () => {
    firstCycle = await catalogue.openProduct();
  });

  test('work_every_cycle_facet_16_the_cycle_is_named', async () => {
    await expect(detail.productName()).toBeVisible();
  });

  test('work_every_cycle_facet_17_step_back_to_the_aisle', async () => {
    await catalogue.returnToAisle();
  });

  test('work_every_cycle_facet_18_take_every_narrowing_off_again', async () => {
    await catalogue.clearAllFilters();
  });

  test('work_every_cycle_facet_19_open_a_different_cycle_from_the_wider_aisle', async () => {
    await catalogue.openProduct(firstCycle);
  });

  test('work_every_cycle_facet_20_that_cycle_is_named_too', async () => {
    await expect(detail.productName()).toBeVisible();
  });
});
