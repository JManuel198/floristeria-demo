# CocoGifts — sitio web

Sitio web de **CocoGifts**, floristería de arte floral hecho a mano en Acarigua,
Edo. Portuguesa, Venezuela (ramos, bouquets con globos y rosas eternas). Es un sitio
estático, mobile-first y en español: una página principal (`index.html`) más una
página de catálogo completo (`catalogo.html`). El canal de venta es WhatsApp, mediante
enlaces `wa.me` de cotización.

## Tecnología

HTML semántico + CSS + JavaScript vanilla. **Sin framework, sin build, sin
dependencias de npm.** La única dependencia externa son las fuentes de Google Fonts
(Inter e Inter Tight).

## Cómo correrlo localmente

Al ser un sitio estático no requiere instalación ni compilación.

- **Opción rápida**: abrir `index.html` directamente en el navegador.
- **Con un servidor local** (recomendado, para que las rutas relativas y la caché se
  comporten como en producción):

  ```bash
  # Python 3
  python3 -m http.server 8000
  # luego abrir http://localhost:8000

  # o, con Node
  npx serve
  ```

## Estructura de carpetas

```
floristeria-demo/
├── index.html         Página principal (8 secciones)
├── catalogo.html      Catálogo completo
├── css/
│   └── styles.css     Hoja de estilos única
├── js/
│   └── main.js        Tabs del catálogo + feed de fotos
├── assets/
│   └── img/           Imágenes del sitio
├── CLAUDE.md          Guía técnica detallada del proyecto
└── README.md          Este archivo
```

Para el detalle técnico (paleta de colores, tipografía, secciones, convenciones y
qué queda pendiente del cliente), ver [`CLAUDE.md`](CLAUDE.md).

## Deploy a Vercel

El proyecto es un sitio estático, así que Vercel lo sirve sin configuración de build.

**Desde el dashboard de Vercel:**

1. Subir el proyecto a GitHub (repositorio: `JManuel198/floristeria-demo`).
2. En [vercel.com](https://vercel.com), **Add New → Project** e importar el
   repositorio.
3. En la configuración:
   - **Framework Preset**: `Other`.
   - **Build Command**: dejar vacío.
   - **Output Directory**: dejar vacío (se sirve la raíz del repo).
4. **Deploy**. Cada push a la rama principal genera un nuevo despliegue automático.

**Desde la CLI de Vercel** (alternativa):

```bash
npm i -g vercel   # una sola vez
vercel            # despliegue de previsualización
vercel --prod     # despliegue a producción
```

## Estado del proyecto

Contenido pendiente de definir con el cliente: precios, número de WhatsApp real (hoy
`584120000000` como placeholder), fotos reales, mapa de ubicación real y el catálogo
completo definitivo. Ver el detalle en [`CLAUDE.md`](CLAUDE.md).
