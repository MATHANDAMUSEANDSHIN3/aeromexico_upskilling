import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage: clase padre de todos los Page Objects.
 * Contiene acciones y verificaciones comunes a cualquier página.
 */
export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navega a una URL relativa o absoluta y espera que la página cargue. */
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /** Espera a que un elemento sea visible. */
  async waitForElementVisible(selector: string, timeout = 10000): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible({ timeout });
  }

  /** Espera a que un elemento no esté visible. */
  async waitForElementHidden(selector: string, timeout = 10000): Promise<void> {
    await expect(this.page.locator(selector)).toBeHidden({ timeout });
  }

  /** Hace clic en un elemento identificado por selector. */
  async clickElement(selector: string): Promise<void>
  {
    await this.page.locator(selector).click();
  }

  /**
   * Acepta el banner de cookies (TrustArc) si aparece.
   * No falla si el banner no existe (ej. storefronts donde no se muestra).
   */
  async acceptCookieBannerIfVisible(): Promise<void> {
    const acceptButton = this.page.locator('#truste-consent-button');
    try {
      await acceptButton.click({ timeout: 5000 });
    } catch {
      // Banner no apareció o ya fue cerrado: continuar sin error.
    }
  }

  /** Escribe texto en un campo. */
  async fillField(selector: string, text: string): Promise<void> {
    await this.page.locator(selector).fill(text);
  }

  /** Obtiene el texto de un elemento. */
  async getElementText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent()) ?? '';
  }
}
