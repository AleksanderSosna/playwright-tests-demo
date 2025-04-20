import { PlaywrightTestConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const config: PlaywrightTestConfig = {
    timeout: 3 * 60 * 1000,
    expect: {
        timeout: 10 * 1000,
        toHaveScreenshot: {
            maxDiffPixelRatio: 0.05,
        },
    },
    testDir: process.env.TEST_DIR ? process.env.TEST_DIR : "./tests",
    snapshotPathTemplate: "{testDir}/__screenshots__/{platform}{/projectName}/{testFilePath}/{arg}{ext}",
    outputDir: "./output",
    reporter: process.env.CI === "true" ? "github" : [["line"], ["html"]],
    globalSetup: path.resolve("./global-setup"),
    fullyParallel: true,
    retries: 1,
    forbidOnly: process.env.CI === "true",
    workers: process.env.CI === "true" ? 1 : 3,
    use: {
        baseURL: process.env.BASE_URL,
        actionTimeout: 0,
        headless: process.env.CI === "true" ? true : process.env.HEADLESS === "true",
        locale: "pl-PL",
        geolocation: { longitude: 21, latitude: 52 },
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        trace: "retain-on-failure",
        // launchOptions: { slowMo: 500 },
    },
    projects: [
        /* desktop */
        {
            name: "Desktop Chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "Desktop Firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "Desktop WebKit",
            use: { ...devices["Desktop Safari"] },
        },
        /* mobile */
        {
            name: "Samsung Galaxy S9+ Chromium",
            use: { ...devices["Galaxy S9+"] },
            grep: /@visual/,
        },
        {
            name: "Samsung Galaxy S22 Chromium",
            use: {
                viewport: { width: 360, height: 780 },
                userAgent: "mobile",
                deviceScaleFactor: 3,
                isMobile: true,
                hasTouch: true,
                defaultBrowserType: "chromium",
            },
            grep: /@visual/,
        },
        {
            name: "Google Pixel 5 Chromium",
            use: { ...devices["Pixel 5"] },
            grep: /@visual/,
        },
        {
            name: "iPhone SE WebKit",
            use: { ...devices["iPhone SE"] },
            grep: /@visual/,
        },
        {
            name: "iPhone 13 WebKit",
            use: { ...devices["iPhone 13"] },
            grep: /@visual/,
        },
        /* tablet */
        {
            name: "Galaxy Tab S4 Chromium",
            use: { ...devices["Galaxy Tab S4"] },
            grep: /@visual/,
        },
        {
            name: "iPad Pro 11 WebKit",
            use: { ...devices["iPad Pro 11"] },
            grep: /@visual/,
        },
        /* branded browsers */
        // {
        //     name: "Google Chrome",
        //     use: { ...devices["Desktop Chrome"], channel: "chrome" },
        // },
        // {
        //     name: "Microsoft Edge",
        //     use: { ...devices["Desktop Edge"], channel: "msedge" },
        // },
    ],
};

export default config;
