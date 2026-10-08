import { Page } from '@playwright/test';
export class BasePage {
    constructor(protected page: Page) { }

    async open() {
        await this.page.goto('/');
    }
}