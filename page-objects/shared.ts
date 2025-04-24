import { Locator, Page, expect } from "@playwright/test";

export class Shared {
    readonly page: Page;

    readonly cookiesPopup: Locator;
    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {
        this.cookiesPopup = page.locator("div.ne-piwik-cookies");
        this.acceptCookiesButton = this.cookiesPopup.locator("button.ne-piwik-cookies__btn-save-all");
    }

    async acceptCookies(): Promise<void> {
        await this.acceptCookiesButton.click();
        await expect(this.cookiesPopup).toBeHidden();
    }
}
