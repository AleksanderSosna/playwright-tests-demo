# PLAYWRIGHT-TESTS-DEMO

# Description

This repository serves as a demonstration of how I - @AleksanderSosna - structure my Playwright automated tests.

It may also be useful on new projects where there is no test automation developed yet to just copy-paste the code and get started fast without spending too much time on configuration.

Please keep in mind that the "tests" included here were not developed for a real life test cases. They just serve a demonstration purpose.

The codebase and use examples will be expanded over time to show a broader range of Playwright possibilities to parametrize, parallelize, shard tests etc. It should also include examples of E2E tests, API tests, Frontend tests with mocked Backend etc.

# How To Run Tests

## environment variables

To run the tests you need to fill in the environment variables stored in a .env file in root folder.

All the needed variables are stored in .env.example file in root folder. Just copy the .env.example file into the same folder and rename it to .env. Then fill the needed variables values.

-   `HEADLESS` - OPTIONAL (handled also by CI env variable - but can be overriden)
    -   if `true`, the browser window will not be displayed when running tests (default value if `CI === true`)
    -   if `false`, the tests will be run in headful mode, that means that the browser window will be displayed when running tests (default value by default and if `CI === false`)
-   `BASE_URL` - MANDATORY - **base url** defining the environment the tests will be run on

<!-- TODO: needed for reporters
-   `TESTRAIL_API_KEY` - MANDATORY if `CI === true`
-   `TESTRAIL_PROJECT_ID` - MANDATORY if `CI === true`
-   `SLACK_TOKEN` - MANDATORY if `CI === true` - Slack bot token from **test-reporter** Slack App
-   `SLACK_CHANNEL_ID` - MANDATORY if `CI === true` - Slack **channel ID** to post test run reports to
 -->

 <!-- TODO: needed for email testing
-   `TESTMAIL_API_KEY` - MANDATORY - API key needed to perform API requests to testmail.app
-   `TESTMAIL_NAMESPACE` - MANDATORY - testmail.app namespace needed to perform actions such as reading, sending, removing emails from specific inbox on testmail.app
 -->

-   `CI` - OPTIONAL - `true` if tests are run in CI/CD environment, `false` if run locally. This variable changes some of the config based on the environment the tests are run on (`false` if left empty)
-   `VISUAL` - OPTIONAL - if set to `false` visual assertions will be omitted
-   `TEST_DIR` - OPTIONAL - path to directory where test files are stored, to include all the tests available its value should be set to `./tests` (defaut value `./tests` if left empty)

## installing packages

To install all packages nedded for running the automated tests, run the `npm install` command in the root folder.

## running the tests

If you have installed all the packages by running the `npm install` command in the root folder, and filled in all the environment variables in .env file, then you can run your Playwright automated tests.

-   `npm run test` - run this command to run all available tests
-   `npm run test:smoke` - run this command to run smoke tests, smoke tests are tagged with @smoke tag
-   `npm run test:smoke-regenerate` - run this command to regenerate base screenshots used in smoke tests, smoke tests are tagged with @smoke tag and only these will run after firing this script, however, the visual assertions will be omitted and will not affect the pass rate
-   `npm run test:visual` - run this command to run visual tests, visual tests are tagged with @visual tag
-   `npm run test:visual-regenerate` - run this command to regenerate base screenshots used in visual tests, visual tests are tagged with @visual tag and only these will run after firing this script, however, the visual assertions will be omitted and will not affect the pass rate

## other commands

Besides running the Playwright tests there are also other commands available to use, such as the following:

-   `npm run lint:check` - runs prettier, eslint and TypeScript checks
-   `npm run lint:fix` - fixes what's automatically fixable in code based on prettier and eslint configuration and performs a TypeScript check
-   `npm run eslint:check` - performs only an eslint check
-   `npm run eslint:fix` - fixes only eslint problems in code
-   `npm run prettier:write` - fixes only prettier problems in code
-   `npm run lint:types` - performs a TypeScript check
