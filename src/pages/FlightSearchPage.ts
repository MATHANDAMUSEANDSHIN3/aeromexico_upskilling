import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config';

/**
 * FlightSearchPage: Page Object del booker de búsqueda de vuelos
 * de la home (config.baseUrl).
 *
 * Todos los localizadores usan EXCLUSIVAMENTE data-testid.
 * Excepción documentada: los días del calendario (react-datepicker)
 * no exponen data-testid; se localizan por su clase dentro del popup.
 */
export class FlightSearchPage extends BasePage {
  // ---------- Localizadores (solo data-testid) ----------
  readonly loader: Locator;
  readonly originInput: Locator;
  readonly destinationInput: Locator;
  readonly searchButton: Locator;
  readonly datepickerInput: Locator;

  /** Acceso público a la Page para aserciones de título/URL desde los tests. */
  get pageInstance(): Page {
    return this.page;
  }

  constructor(page: Page) {
    super(page);
    this.loader = page.getByTestId('static-loader');
    this.originInput = page.getByTestId('booker-origin-input');
    this.destinationInput = page.getByTestId('booker-destination-input');
    this.searchButton = page.getByTestId('booker-search');
    this.datepickerInput = page.getByTestId('booker-datepicker');
  }

  // ---------- Navegación ----------
  async open(): Promise<void> {
    await this.page.goto(config.storefrontUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    // Aceptar el banner de cookies si aparece (varía por país/storefront).
    await this.acceptCookieBannerIfVisible();
    // La app hidrata después del loader estático; esperar a que desaparezca
    // y a que el booker esté disponible (la hidratación tarda unos segundos más).
    await this.loader.waitFor({ state: 'detached', timeout: 60000 }).catch(() => {
      // Si el loader no aparece o ya se fue, continuar.
    });
    await this.originInput.waitFor({ state: 'visible', timeout: 60000 });
  }

  // ---------- Acciones ----------
  /**
   * Selecciona un aeropuerto en el autocomplete: busca por código IATA
   * (invariante de idioma entre storefronts) y hace clic en la opción
   * del dropdown con el código indicado.
   */
  async selectAirport(input: Locator, airportName: string, airportCode: string): Promise<void> {
    await input.click();
    await input.fill(airportCode);
    await this.page.getByTestId(`booker-airport-option-${airportCode}`).click({
      timeout: 10000,
    });
  }

  async selectOrigin(airportName: string, airportCode: string): Promise<void> {
    await this.selectAirport(this.originInput, airportName, airportCode);
  }

  async selectDestination(airportName: string, airportCode: string): Promise<void> {
    await this.selectAirport(this.destinationInput, airportName, airportCode);
  }

  /**
   * Tras elegir origen y destino, el calendario se abre automáticamente.
   * Espera el auto-open y hace clic en el primer día disponible.
   */
  async selectFirstAvailableDay(): Promise<void> {
    const popup = this.page.locator('.Calendar-module__popup__em1J5');
    await popup.waitFor({ state: 'visible', timeout: 15000 });
    const firstDay = popup
      .locator('.react-datepicker__day:not(.react-datepicker__day--disabled)')
      .filter({ hasText: /\d/ })
      .first();
    await firstDay.click({ timeout: 10000 });
  }

  async clickSearch(): Promise<void> {
    await this.searchButton.click();
  }

  // ---------- Verificaciones ----------
  async expectSearchEnabled(): Promise<void> {
    await this.searchButton.waitFor({ state: 'visible' });
    if (await this.searchButton.isDisabled()) {
      throw new Error('El botón Buscar está deshabilitado');
    }
  }

  async expectSearchDisabled(): Promise<void> {
    await this.searchButton.waitFor({ state: 'visible' });
    if (!(await this.searchButton.isDisabled())) {
      throw new Error('Se esperaba que el botón Buscar estuviera deshabilitado');
    }
  }
}
