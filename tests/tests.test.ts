import { test, expect } from "@playwright/test";

import { PageObject } from "@page-objects/page-object";

let pageObject: PageObject;

test.beforeEach(async ({ page }) => {
    pageObject = new PageObject(page);
});

test.describe("Tests", () => {
    test(`smoke test @smoke`, async ({ page }) => {
        await page.goto("/");
    });
});
