import { Locator, Page, expect } from "@playwright/test";

export class Shared {
    readonly page: Page;

    readonly cookiesPopup: Locator;
    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {
        this.cookiesPopup = page.locator("div.ne-piwik-cookies");
        this.acceptCookiesButton = this.cookiesPopup.locator("button.ne-piwik-cookies__btn-save-all");
    }

    async setLocalStorageItem(key: string, value: string): Promise<void> {
        await this.page.evaluate(
            ([key, value]) => {
                window.localStorage.setItem(key, value);
            },
            [key, value]
        );
    }

    async acceptCookies(storageOrUI: "storage" | "ui"): Promise<void> {
        if (storageOrUI === "storage") {
            //TODO
        } else if (storageOrUI === "ui") {
            await this.acceptCookiesButton.click();
            await expect(this.cookiesPopup).toBeHidden();
        }
    }

    async waitForResponse(urls: Array<string>, options?: { responseOk?: boolean; notIncludedUrls?: Array<string>; timeout?: number }): Promise<void> {
        await this.page.waitForResponse(
            (response) => {
                const bool =
                    urls.every((url) => {
                        return response.url().includes(url);
                    }) &&
                    response.ok() &&
                    !options?.notIncludedUrls?.some((notIncludedUrl) => {
                        return response.url().includes(notIncludedUrl);
                    });
                return bool;
            },
            { timeout: options?.timeout ? options.timeout : 10 * 1000 }
        );
    }

    getTimestamp(options?: { dayTimestamp?: boolean }): number {
        const today = new Date();
        if (options?.dayTimestamp) {
            today.setHours(0);
        }
        const timestamp: number = today.getTime();

        return timestamp;
    }

    getDateDaysFromToday(daysFromToday = 0): string {
        const today = new Date(new Date().toLocaleString("en-US"));

        today.setDate(today.getDate() + daysFromToday);

        let dd: number | string = today.getDate();
        let mm: number | string = today.getMonth() + 1;
        const yyyy: number | string = today.getFullYear();

        if (dd < 10) {
            dd = `0${dd}`;
        }
        if (mm < 10) {
            mm = `0${mm}`;
        }

        return `${dd}.${mm}.${yyyy}`;
    }

    async getScrollPosition(element: Locator): Promise<number> {
        const scrollPosition = await element.evaluate((node) => node.scrollTop);
        return scrollPosition;
    }

    async getClipboardText(): Promise<string> {
        const clipboardText = await this.page.evaluate(() => {
            return navigator.clipboard.readText();
        });
        return clipboardText;
    }
}
