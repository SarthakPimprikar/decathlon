import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  process.env.SUITE_STARTED_AT = String(Date.now());
}
export default globalSetup;
