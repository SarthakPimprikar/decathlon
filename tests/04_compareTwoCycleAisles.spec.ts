import { test, expect, Page, BrowserContext } from '@playwright/test';
import { CataloguePage } from '../pages/cataloguePage';
import { DetailPage } from '../pages/detailPage';
import { Routes } from '../ui-store/routes';
import { Expected } from '../ui-store/expected';
import { ConfigReader } from '../utils/configReader';
import { ScreenshotUtil } from '../utils/screenshotUtil';

// One flow, one page: the steps run in order and each begins where the one before ended.
test.describe('Decathlon India - compare Two Cycle Aisles', () => {
  test.describe.configure({ mode: 'serial' });

  let context: BrowserContext;
  let page: Page;
  let catalogue: CataloguePage;
  let detail: DetailPage;

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

  test('compare_two_cycle_aisles_01_open_the_mountain_bikes_aisle', async () => {
    await catalogue.openAisle(Routes.mountainBikesAisle);
  });

  test('compare_two_cycle_aisles_02_tick_a_choice_inside_the_facet_that_is_open', async () => {
    await catalogue.tickChoiceInOpenFacet();
  });

  test('compare_two_cycle_aisles_03_unfold_gender_a_different_facet', async () => {
    await catalogue.unfoldFacet(Expected.facets.gender);
  });

  test('compare_two_cycle_aisles_04_tick_a_choice_inside_gender', async () => {
    await catalogue.tickChoiceInFacet(Expected.facets.gender);
  });

  test('compare_two_cycle_aisles_05_unfold_category_a_different_facet', async () => {
    await catalogue.unfoldFacet(Expected.facets.category);
  });

  test('compare_two_cycle_aisles_06_tick_a_choice_inside_category', async () => {
    await catalogue.tickChoiceInFacet(Expected.facets.category);
  });

  test('compare_two_cycle_aisles_07_unfold_brand', async () => {
    await catalogue.unfoldFacet(Expected.facets.brand);
  });

  test('compare_two_cycle_aisles_08_open_a_mountain_bike', async () => {
    await catalogue.openProduct();
  });

  test('compare_two_cycle_aisles_09_the_bike_is_named', async () => {
    await expect(detail.productName()).toBeVisible();
  });

  test('compare_two_cycle_aisles_10_try_the_kids_aisle_instead', async () => {
    await catalogue.openAisle(Routes.kidsCyclesAisle);
  });

  test('compare_two_cycle_aisles_11_tick_a_choice_inside_the_facet_that_is_open', async () => {
    await catalogue.tickChoiceInOpenFacet();
  });

  test('compare_two_cycle_aisles_12_unfold_gender_a_different_facet', async () => {
    await catalogue.unfoldFacet(Expected.facets.gender);
  });

  test('compare_two_cycle_aisles_13_tick_a_choice_inside_gender', async () => {
    await catalogue.tickChoiceInFacet(Expected.facets.gender);
  });

  test('compare_two_cycle_aisles_14_unfold_category_a_different_facet', async () => {
    await catalogue.unfoldFacet(Expected.facets.category);
  });

  test('compare_two_cycle_aisles_15_tick_a_choice_inside_category', async () => {
    await catalogue.tickChoiceInFacet(Expected.facets.category);
  });

  test('compare_two_cycle_aisles_16_open_a_kids_cycle', async () => {
    await catalogue.openProduct();
  });

  test('compare_two_cycle_aisles_17_bring_the_foot_of_the_cycle_page_into_view', async () => {
    await detail.scrollToFoot();
  });

  test('compare_two_cycle_aisles_18_step_back_to_the_aisle', async () => {
    await catalogue.returnToAisle();
  });

  test('compare_two_cycle_aisles_19_take_the_narrowing_off', async () => {
    await catalogue.clearAllFilters();
  });

  test('compare_two_cycle_aisles_20_the_aisle_is_headed', async () => {
    await expect(catalogue.heading()).toBeVisible();
  });
});
