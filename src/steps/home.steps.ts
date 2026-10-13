import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { FlightSearchPage } from '../pages/FlightSearchPage';

/**
 * Step definitions de la home.
 * Reutilizan los Page Objects existentes (FlightSearchPage),
 * sin migrar a World/hooks clásicos.
 */
const { Given, When, Then } = createBdd();

Given('que estoy en la página principal', async ({ page }) => {
  const flightSearchPage = new FlightSearchPage(page);
  await flightSearchPage.open();
});

When(
  'completo origen {string}, destino {string} y selecciono una fecha',
  async ({ page }, origin: string, destination: string) => {
    const flightSearchPage = new FlightSearchPage(page);
    await flightSearchPage.selectOrigin(origin, 'MEX');
    await flightSearchPage.selectDestination(destination, 'GDL');
    await flightSearchPage.selectFirstAvailableDay();
  },
);

When('presiono el botón de búsqueda', async ({ page }) => {
  const flightSearchPage = new FlightSearchPage(page);
  await flightSearchPage.clickSearch();
});

Then('el título de la página contiene {string}', async ({ page }, text: string) => {
  // Tolerante a acentos: "Aeroméxico" (es-mx) vs "Aeromexico" (storefronts en inglés)
  const accentInsensitive = text
    .replace(/[aá]/gi, '[aá]')
    .replace(/[eé]/gi, '[eé]')
    .replace(/[ií]/gi, '[ií]')
    .replace(/[oó]/gi, '[oó]')
    .replace(/[uú]/gi, '[uú]');
  await expect(page).toHaveTitle(new RegExp(accentInsensitive, 'i'));
});

Then('el campo de origen es visible', async ({ page }) => {
  const flightSearchPage = new FlightSearchPage(page);
  await expect(flightSearchPage.originInput).toBeVisible();
});

Then('el campo de destino es visible', async ({ page }) => {
  const flightSearchPage = new FlightSearchPage(page);
  await expect(flightSearchPage.destinationInput).toBeVisible();
});

Then('el botón de búsqueda es visible', async ({ page }) => {
  const flightSearchPage = new FlightSearchPage(page);
  await expect(flightSearchPage.searchButton).toBeVisible();
});

Then('el botón de búsqueda está deshabilitado', async ({ page }) => {
  const flightSearchPage = new FlightSearchPage(page);
  await flightSearchPage.expectSearchDisabled();
});

Then('el botón de búsqueda está habilitado', async ({ page }) => {
  const flightSearchPage = new FlightSearchPage(page);
  await flightSearchPage.expectSearchEnabled();
});

Then('se dispara la búsqueda de vuelos', async ({ page }) => {
  // Al buscar, la app navega fuera de la home hacia resultados (SPA, transición lenta)
  await page.waitForURL((url) => !url.href.includes('/new/es-mx'), { timeout: 60000 });
  expect(page.url()).not.toContain('/new/es-mx');
});
