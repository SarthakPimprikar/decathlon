import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  globalSetup: './utils/globalSetup.ts',
  /* one test walks the whole search journey once per row of the data file,
     and these are slow public sites; ninety seconds is not enough for three */
  timeout: 90000,
  workers: 1,

  use: {
    baseURL: process.env.BASE_URL || "https://www.decathlon.in",
    headless: false,
    viewport: { width: 1366, height: 768 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    testIdAttribute: 'data-test-id',
  },

  reporter: [['html', { open: 'never' }], ['list']],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
