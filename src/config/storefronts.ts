/**
 * Catálogo de storefronts de Aeroméxico.
 * Un storefront = combinación idioma-país que vive como segmento de ruta
 * (ej. https://qa.amlab7.com/new/es-mx).
 *
 * Cada entrada agrupa los storefronts de un país/región.
 */
export interface Storefront {
  /** Código idioma-país (segmento de ruta). */
  code: string;
  /** Nombre legible del país/región. */
  country: string;
}

export const storefronts: Storefront[] = [
  { code: 'es-mx', country: 'México' },
  { code: 'en-us', country: 'Estados Unidos' },
  { code: 'es-us', country: 'Estados Unidos' },
  { code: 'en-ca', country: 'Canadá' },
  { code: 'fr-ca', country: 'Canadá' },
  { code: 'es-ar', country: 'Argentina' },
  { code: 'pt-br', country: 'Brasil' },
  { code: 'es-cl', country: 'Chile' },
  { code: 'es-co', country: 'Colombia' },
  { code: 'es-cr', country: 'Costa Rica' },
  { code: 'es-ec', country: 'Ecuador' },
  { code: 'es-sv', country: 'El Salvador' },
  { code: 'es-es', country: 'España' },
  { code: 'en-eu', country: 'Europa' },
  { code: 'fr-fr', country: 'Francia' },
  { code: 'en-gb', country: 'Gran Bretaña' },
  { code: 'es-gt', country: 'Guatemala' },
  { code: 'es-hn', country: 'Honduras' },
  { code: 'en-nl', country: 'Holanda' },
  { code: 'es-ni', country: 'Nicaragua' },
  { code: 'es-pa', country: 'Panamá' },
  { code: 'es-pe', country: 'Perú' },
  { code: 'es-do', country: 'República Dominicana' },
  { code: 'it-it', country: 'Italia' },
  { code: 'jp-jp', country: 'Japón' },
];

/** Storefront por defecto (México). */
export const defaultStorefront = 'es-mx';

/**
 * Resuelve un storefront por su código.
 * Lanza error claro si el código no existe en el catálogo.
 */
export function getStorefront(code: string): Storefront {
  const found = storefronts.find((s) => s.code === code);
  if (!found) {
    throw new Error(
      `Storefront desconocido: "${code}". Válidos: ${storefronts.map((s) => s.code).join(', ')}`,
    );
  }
  return found;
}
