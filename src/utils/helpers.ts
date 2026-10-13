/**
 * Utilidades genéricas reutilizables entre tests y page objects.
 */

/** Genera un string aleatorio (útil para datos de prueba únicos). */
export function randomString(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/** Pausa la ejecución N milisegundos (usar con moderación). */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Formatea la fecha actual como YYYY-MM-DD. */
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
