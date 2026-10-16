import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { FlightSearchPage } from '../pages/FlightSearchPage';

/**
 * Step definitions de la home.
 * Reutilizan los Page Objects existentes (FlightSearchPage),
 * sin migrar a World/hooks clásicos.
 */
const { Given, When, Then } = createBdd();

Given('que el usuario se encuentra en la página principal de Aeroméxico', async ({ page }) => {
  const flightSearchPage = new FlightSearchPage(page);
  await flightSearchPage.open();
});

When(
  'el usuario ingresa el origen {string}, el destino {string} y una fecha válida',
  async ({ page }, origin: string, destination: string) => {
    const flightSearchPage = new FlightSearchPage(page);
    await flightSearchPage.selectOrigin(origin, 'MEX');
    await flightSearchPage.selectDestination(destination, 'GDL');
    await flightSearchPage.selectFirstAvailableDay();
  },
);

When(
  'el usuario busca un vuelo desde {string} hacia {string} para una fecha válida',
  async ({ page }, origin: string, destination: string) => {
    const flightSearchPage = new FlightSearchPage(page);
    await flightSearchPage.selectOrigin(origin, 'MEX');
    await flightSearchPage.selectDestination(destination, 'GDL');
    await flightSearchPage.selectFirstAvailableDay();
    await flightSearchPage.clickSearch();
  },
);

Then('el título de la página debe contener {string}', async ({ page }, text: string) => {
  // Tolerante a acentos: "Aeroméxico" (es-mx) vs "Aeromexico" (storefronts en inglés)
  const accentInsensitive = text
    .replace(/[aá]/gi, '[aá]')
    .replace(/[eé]/gi, '[eé]')
    .replace(/[ií]/gi, '[ií]')
    .replace(/[oó]/gi, '[oó]')
    .replace(/[uú]/gi, '[uú]');
  await expect(page).toHaveTitle(new RegExp(accentInsensitive, 'i'));
});

Then(
  'el formulario de búsqueda debe estar disponible con la opción de búsqueda deshabilitada',
  async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);
    await expect(flightSearchPage.originInput).toBeVisible();
    await expect(flightSearchPage.destinationInput).toBeVisible();
    await expect(flightSearchPage.searchButton).toBeVisible();
    await flightSearchPage.expectSearchDisabled();
  },
);

Then('la opción para realizar la búsqueda debe estar habilitada', async ({ page }) => {
  const flightSearchPage = new FlightSearchPage(page);
  await flightSearchPage.expectSearchEnabled();
});

Then(
  'el sistema debe procesar la solicitud y mostrar los vuelos disponibles para la ruta seleccionada',
  async ({ page }) => {
    // Al buscar, la app navega fuera de la home hacia resultados (SPA, transición lenta)
    await page.waitForURL((url) => !url.href.includes('/new/es-mx'), { timeout: 60000 });
    expect(page.url()).not.toContain('/new/es-mx');
  },
);
