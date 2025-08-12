// @ts-check
const { defineConfig, devices } = require('@playwright/test');
let sEnvironment = process.env.ENV || 'tech'
let sSystemName = process.env.SYSTEM || 'testAutomationPlaywrightJSChallenge'
let sEnvJson = `./.env/${sSystemName.toLowerCase()}.${sEnvironment.toLowerCase()}.environment.js`
require('dotenv').config({ path: sEnvJson });

module.exports = defineConfig({
  timeout: 120 * 1000,
  expect:{
    timeout: 90000,
  },
  actionTimeout: 30000,
  // globalTimeout: 600000,
  /*https://playwright.dev/docs/api/class-testconfig*/
  toMatchSnapshot: {
    maxDiffPixels: 10,
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:  [
    [ process.env.CI ? 'dot' : 'list',{
      printSteps:true
    }],
    ['html', {
      open: 'never',
      outputFolder: `results/${sSystemName.toLowerCase()}-${sEnvironment.toLowerCase()}/playwright-report/`
    }],
    ['junit', {
      outputFile: `results/${sSystemName.toLowerCase()}-${sEnvironment.toLowerCase()}/playwright-${sEnvironment.toLowerCase()}.xml`
    }],
    ['allure-playwright', {
      detail: true,
      outputFolder: `results/${sSystemName.toLowerCase()}-${sEnvironment.toLowerCase()}/allure-results/`,
      suiteTitle: false,
    }],
    [
      'json', {
      outputFile: `results/${sSystemName.toLowerCase()}-${sEnvironment.toLowerCase()}/result-${sEnvironment.toLowerCase()}.json`
    }],
  ],
  // testDir: './e2e',
  // /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot:'on'

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'lab-swagLabs',
      use: { ...devices['Desktop Chrome'] },
      testDir: `tests/swagLabs`
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // @ts-ignore
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

});

