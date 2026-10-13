import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { config } from './src/config';

const testDir = defineBddConfig({
  featuresRoot: 'src/features',
  steps: ['src/steps/**/*.ts'],
});

export default defineConfig({
  testDir,
  timeout: 90000,
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: 'allure-results', detail: true }],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? config.baseUrl,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
