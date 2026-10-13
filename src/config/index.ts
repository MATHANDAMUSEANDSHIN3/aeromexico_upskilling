import qa from './environments/qa.json';
import dev from './environments/dev.json';
import prod from './environments/prod.json';
import { defaultStorefront } from './storefronts';

/**
 * Mapa de ambientes disponibles.
 * Agregar un ambiente nuevo = agregar su JSON + una línea aquí.
 */
const environments = { qa, dev, prod } as const;

export type EnvironmentName = keyof typeof environments;

/**
 * Ambiente activo: se elige con la variable ENV (default: qa).
 * Nunca cae a prod por accidente.
 */
const envName = (process.env.ENV ?? 'qa') as EnvironmentName;

if (!environments[envName]) {
  throw new Error(
    `Ambiente desconocido: "${envName}". Ambientes válidos: ${Object.keys(environments).join(', ')}`,
  );
}

/**
 * Storefront activo: se elige con la variable STOREFRONT (default: es-mx).
 */
const storefrontCode = process.env.STOREFRONT ?? defaultStorefront;

export const config = {
  ...environments[envName],
  /** URL completa del ambiente + storefront activo. */
  storefrontUrl: `${environments[envName].baseUrl}/${storefrontCode}`,
  /** Código del storefront activo. */
  storefront: storefrontCode,
};

export const activeEnvironment = envName;
