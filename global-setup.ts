import { FullConfig, chromium } from "@playwright/test";

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch({
        headless: process.env.CI === "true" ? true : process.env.HEADLESS === "true",
    });
    const page = await browser.newPage();

    //TODO

    await browser.close();
}

export default globalSetup;
