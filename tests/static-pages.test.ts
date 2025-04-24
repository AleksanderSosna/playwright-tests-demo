import { test, expect } from "@playwright/test";

import { Shared } from "@page-objects/shared";

let shared: Shared;

test.beforeEach(async ({ page }) => {
    shared = new Shared(page);
});

test.describe("Static Pages", () => {
    test.describe("FAQ", () => {
        test.fixme("popular topics @smoke", async ({ page }) => {
            await page.goto("/faq/popularne-tematy");
        });

        test.fixme("order", async ({ page }) => {
            await page.goto("/faq/zamowienie");
        });

        test.fixme("payment and shipping", async ({ page }) => {
            await page.goto("/faq/platnosc-i-dostawa");
        });

        test.fixme("returns", async ({ page }) => {
            await page.goto("/faq/zwrot-i-reklamacja");
        });

        test.fixme("discounts", async ({ page }) => {
            await page.goto("/faq/gratisy-i-rabaty");
        });

        test.fixme("account", async ({ page }) => {
            await page.goto("/faq/konto-moja-nowa-era");
        });

        test.fixme("terms and conditions", async ({ page }) => {
            await page.goto("/faq/regulaminy");
        });

        test.fixme("gdpr", async ({ page }) => {
            await page.goto("/faq/dane-osobowe");
        });

        test.fixme("contact", async ({ page }) => {
            await page.goto("/faq/kontakt");
        });
    });

    test.fixme("cookie policy", async ({ page }) => {
        await page.goto("/polityka-cookies");
    });
});
