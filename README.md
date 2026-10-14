Framework de automatización de pruebas Web UI con **Playwright + TypeScript + BDD (Gherkin)** y reportes **Allure**.

Los escenarios se escriben en Gherkin (`.feature`) y se ejecutan con el runner de Playwright mediante el adaptador [playwright-bdd](https://github.com/vitalets/playwright-bdd) — no requiere el runner de Cucumber.

## 📋 Prerrequisitos

| Componente | Versión | Verificación |
|---|---|---|
| Node.js | LTS (mín. 18) | `node --version` |
| pnpm | 8+ | `pnpm --version` |
| JDK | 17 | `java -version` |
| Allure Commandline | 2.x | `allure --version` |

## 🚀 Primeros pasos

```bash
# 1. Instalar dependencias
pnpm install

# 2. Ejecutar la suite (regenera .features-gen antes de correr)
pnpm run test:bdd

# 3. Ver el reporte de Allure
pnpm run allure:generate
pnpm run allure:open
```

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm run bdd:gen` | Genera los specs desde los `.feature` (bddgen) |
| `pnpm run test:bdd` | Genera specs + ejecuta la suite completa |
| `pnpm run test` | Ejecuta Playwright sin regenerar specs |
| `pnpm run test:headed` | Ejecuta con navegador visible |
| `pnpm run report` | Abre el reporte HTML de Playwright |
| `pnpm run allure:generate` | Convierte `allure-results/` → `allure-report/` |
| `pnpm run allure:open` | Sirve el reporte por HTTP y lo abre |
| `pnpm run allure:serve` | Sirve resultados crudos sin generar reporte |

> **Nota:** los reportes (Allure y HTML) deben abrirse a través de su servidor (`allure:open` / `report`). Si se abre el `index.html` con doble clic, el navegador bloquea los `fetch` internos y el reporte falla.

## 🌍 Ambientes y storefronts

La URL de ejecución se compone de **ambiente + storefront** y se elige con variables de entorno:

```bash
ENV=dev pnpm run test:bdd              # corre contra dev (default: qa)
STOREFRONT=en-us pnpm run test:bdd     # corre contra storefront en-us (default: es-mx)
```

- **Ambientes** definidos en `src/config/environments/` (qa, dev, prod).
- **Storefronts** catalogados en `src/config/storefronts.ts` (25 storefronts).

## 📁 Estructura del proyecto

```
src/
├── features/     # Qué se prueba — escenarios Gherkin (.feature)
├── steps/        # Cómo se ejecuta cada paso (Given/When/Then)
├── pages/        # POM: selectores + acciones (BasePage como base)
├── config/       # Dónde se ejecuta: ambientes + storefronts
├── data/         # Datos de prueba externalizados
└── utils/        # Helpers genéricos
```

## 🧭 Convenciones

- **Localizadores**: viven solo en los Page Objects (`src/pages/`), basados en `data-testid` vía `getByTestId()`.
- **Estado de tests**: mediante fixtures de Playwright — no se usan hooks globales (`beforeEach`/`afterEach`) ni `World`.
- **Nomenclatura**: `.feature` en minúsculas con guiones; steps con sufijo `.steps.ts`; Page Objects en PascalCase terminando en `Page`.
- **Artefactos generados** (`.features-gen/`, reportes, resultados) viven en la raíz y están excluidos de Git.
