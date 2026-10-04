import { FullConfig } from '@playwright/test';

/* [W6 D1] Runs once before the suite. */
async function globalSetup(config: FullConfig) {
  process.env.SUITE_STARTED_AT = String(Date.now());
}
export default globalSetup;
