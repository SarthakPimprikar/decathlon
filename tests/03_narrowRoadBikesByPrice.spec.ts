import { test, expect, Page, BrowserContext } from '@playwright/test';
import { CataloguePage } from '../pages/cataloguePage';
import { DetailPage } from '../pages/detailPage';
import { Routes } from '../ui-store/routes';
import { Expected } from '../ui-store/expected';
import { ConfigReader } from '../utils/configReader';
import { ScreenshotUtil } from '../utils/screenshotUtil';

// One flow, one page: the steps run in order and each begins where the one before ended.
test.describe('Decathlon India - narrow Road Bikes By Price', () => {
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

  test('narrow_road_bikes_by_price_01_open_the_road_bikes_aisle', async () => {
    await catalogue.openAisle(Routes.roadBikesAisle);
  });

  test('narrow_road_bikes_by_price_02_tick_a_choice_inside_the_facet_that_is_open', async () => {
    await catalogue.tickChoiceInOpenFacet();
  });

  test('narrow_road_bikes_by_price_03_the_unfolded_facet_offers_choices_to_tick', async () => {
    await expect.poll(() => catalogue.openFacetChoices().count()).toBeGreaterThanOrEqual(2);
  });

  test('narrow_road_bikes_by_price_04_tick_a_choice_inside_the_facet_that_is_open', async () => {
    await catalogue.tickChoiceInOpenFacet();
  });

  test('narrow_road_bikes_by_price_05_unfold_gender_a_different_facet', async () => {
    await catalogue.unfoldFacet(Expected.facets.gender);
  });

  test('narrow_road_bikes_by_price_06_tick_a_choice_inside_gender', async () => {
    await catalogue.tickChoiceInFacet(Expected.facets.gender);
  });

  test('narrow_road_bikes_by_price_07_unfold_brand', async () => {
    await catalogue.unfoldFacet(Expected.facets.brand);
  });

  test('narrow_road_bikes_by_price_08_unfold_rating_a_different_facet', async () => {
    await catalogue.unfoldFacet(Expected.facets.rating);
  });

  test('narrow_road_bikes_by_price_09_open_a_road_bike_from_what_survived', async () => {
    await catalogue.openProduct();
  });

  test('narrow_road_bikes_by_price_10_bring_the_foot_of_the_bike_page_into_view', async () => {
    await detail.scrollToFoot();
  });

  test('narrow_road_bikes_by_price_11_step_back_to_the_aisle', async () => {
    await catalogue.returnToAisle();
  });

  test('narrow_road_bikes_by_price_12_take_the_narrowing_off', async () => {
    await catalogue.clearAllFilters();
  });

  test('narrow_road_bikes_by_price_13_tick_a_choice_inside_the_facet_that_is_open', async () => {
    await catalogue.tickChoiceInOpenFacet();
  });

  test('narrow_road_bikes_by_price_14_unfold_gender_a_different_facet', async () => {
    await catalogue.unfoldFacet(Expected.facets.gender);
  });

  test('narrow_road_bikes_by_price_15_tick_a_choice_inside_gender', async () => {
    await catalogue.tickChoiceInFacet(Expected.facets.gender);
  });

  test('narrow_road_bikes_by_price_16_unfold_color', async () => {
    await catalogue.unfoldFacet(Expected.facets.color);
  });

  test('narrow_road_bikes_by_price_17_open_a_dearer_road_bike', async () => {
    await catalogue.openDearerProduct();
  });

  test('narrow_road_bikes_by_price_18_reload_it_to_be_sure_it_stands_on_its_own', async () => {
    await detail.reload();
  });

  test('narrow_road_bikes_by_price_19_the_bike_is_named', async () => {
    await expect(detail.productName()).toBeVisible();
  });
});
