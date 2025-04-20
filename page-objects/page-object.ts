import { Locator, Page, expect} from "@playwright/test";

export class PageObject {
    readonly page: Page;

    readonly cookiesPopup: Locator;
    readonly acceptCookies: Locator;

    readonly searchInput: Locator;
    readonly searchButton: Locator

    readonly addToCartButton: Locator

    readonly cartSummary: Locator

    constructor(page: Page) {
        this.cookiesPopup = page.locator("div.ne-piwik-cookies")
        this.acceptCookies = this.cookiesPopup.locator("button.ne-piwik-cookies__btn-save-all")

        this.searchInput = page.locator("#search")
        this.searchButton = page.locator("button.search-container__button")

        this.addToCartButton = page.locator("button.product-tile__action")

        this.cartSummary = page.locator("div.cart-summary")
    }

    async testFunction(): Promise<void> {
        expect(true).toBeTruthy();
    }
}
