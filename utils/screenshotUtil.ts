import { Page, TestInfo } from '@playwright/test';
import { ConfigReader } from './configReader';
import { getLogger } from './logger';

const log = getLogger('ScreenshotUtil');

/* Screenshots always go under the test's own output path, never into the repository. */
export class ScreenshotUtil {
  /* Take a screenshot and attach it to the step (or test) that is running. */
  static async attach(page: Page, testInfo: TestInfo, name: string, fullPage = false): Promise<string> {
    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
    const file = testInfo.outputPath(ConfigReader.evidenceDir, `${safeName}.png`);
    await page.screenshot({ path: file, fullPage });
    await testInfo.attach(safeName, { path: file, contentType: 'image/png' });
    log.info('attach', `Saved ${file}`);
    return file;
  }

  /* Call from afterEach: takes a full-page screenshot only when the test failed. */
  static async captureOnFailure(page: Page, testInfo: TestInfo): Promise<void> {
    if (testInfo.status === testInfo.expectedStatus) {
      return;
    }
    try {
      await ScreenshotUtil.attach(page, testInfo, `FAILED_${testInfo.title}`, true);
    } catch (error) {
      log.error('captureOnFailure', `Could not take the failure screenshot: ${String(error)}`);
    }
  }
}
