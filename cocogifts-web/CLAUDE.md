# CocoGifts — sitio web

## Negocio

Floristería en Acarigua, Edo. Portuguesa, Venezuela. Fundadoras: Maru y Ana.
Productos: arte floral hecho a mano — ramos, bouquets con globos, rosas eternas.
Comunidad: 31K seguidores en Instagram ([@cocogifts.ca](https://instagram.com/cocogifts.ca)).
Canal de venta principal: WhatsApp (cotizaciones vía enlaces `wa.me`).
Sitio de una sola página, mobile-first, en español.

Referencia de diseño aprobada: `../example-design/CocoGifts.dc.html` (exportación de
Claude Design con sintaxis propia — `<x-dc>`, `<image-slot>`, `sc-for`, `{{ vars }}`).
**No copiar esa sintaxis**: es solo referencia de colores, copy, contenido y disposición
visual. Todo se reconstruye como HTML semántico + CSS + JS vanilla.

## Paleta de colores (extraída de example-design)

| Token | Valor | Uso |
|---|---|---|
| `--color-texto` | `#1C1B1A` | Texto principal, titulares |
| `--color-texto-suave` | `#4B4844` | Párrafos largos |
| `--color-texto-secundario` | `#6B655F` | Descripciones, subtítulos |
| `--color-texto-mute` | `#9A948C` | Labels pequeños, copyright |
| `--color-acento` | `#D6487A` | Rosa de marca: enlaces, acentos, logo |
| `--color-acento-hover` | `#B23A63` | Hover del rosa |
| `--color-acento-suave` | `#FBEDF2` | Fondos rosados (promo, comunidad) |
| `--color-acento-borde` | `#F0C7D8` | Bordes sobre fondo rosado |
| `--color-acento-oscuro` | `#5A2A3E` | Texto sobre fondos rosados |
| `--color-fondo` | `#FDFDFC` | Fondo de página |
| `--color-fondo-exterior` | `#EDEBE8` | Fondo fuera del contenedor (body) |
| `--color-fondo-neutro` | `#F7F5F3` | Fondos neutros (footer, chips) |
| `--color-superficie` | `#FFFFFF` | Tarjetas, nav |
| `--color-borde` | `#F0EDEA` | Bordes de tarjetas y separadores |
| `--color-borde-suave` | `#F5F2EF` | Separadores finos (menú) |

### Verde WhatsApp — REGLA FIJA, sin excepción

- `--color-whatsapp: #25D366`, hover `--color-whatsapp-hover: #1EBE5A`.
- Exclusivo para acciones de WhatsApp (burbuja flotante, "Cotizar por WhatsApp",
  cualquier enlace `wa.me`). No se usa en ningún otro elemento.
- Si example-design trae otro verde, se ajusta a estos valores.

## Tipografía (extraída de example-design)

- **Inter** (400, 500, 600, 700): cuerpo de texto. Familia base del `body`.
- **Inter Tight** (600, 700, 800): titulares (h1–h4, logo). Peso 800 para h1/h2,
  700 para h3/h4. `letter-spacing: -0.02em` en titulares grandes.
- Carga vía Google Fonts (única dependencia externa permitida):
  `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@600;700;800&display=swap`

## Las 9 secciones del sitio

1. **Nav** — barra fija superior, logo "CocoGifts" (Coco negro + Gifts rosa), menú hamburguesa a pantalla completa con enlaces ancla + botones WhatsApp/Instagram.
2. **Hero** (`#hero`) — foto destacada 4/5, h1 "Flores que dicen lo que las palabras no alcanzan.", subtítulo, CTA verde "Pedir por WhatsApp". Debajo: banner PROMO opcional sobre fondo rosado.
3. **Nosotras** (`#nosotras`) — foto de Maru y Ana, texto de presentación, chip de ubicación "Acarigua, Edo. Portuguesa".
4. **Catálogo** (`#catalogo`) — 4 categorías (Ramos, Globos, Rosas Eternas, Ocasiones Especiales). En este sitio se implementa con **tabs** (no las tarjetas apiladas del diseño original) para reducir scroll en mobile. Botón "Ver catálogo completo" junto al título.
5. **Galería** (`#galeria`) — grid 2 columnas, 6 fotos de trabajos reales.
6. **Comunidad** (`#comunidad`) — tarjeta rosada: "31K seguidores en Instagram", 2 posts, botón "Seguir @cocogifts.ca".
7. **Ocasiones** (`#ocasiones`) — carrusel horizontal de 8 tarjetas (San Valentín, Día de la Madre, Aniversarios, Cumpleaños, Graduaciones, Condolencias, Bautizos, Baby Shower), cada una con botón "Cotizar".
8. **Footer** (`#contacto`) — descripción, enlaces, horario (L–S 9:00 am–6:00 pm, domingo cerrado), dirección (Av. Los Próceres con Calle 33, Acarigua), mapa, CTAs WhatsApp/Instagram, copyright.
9. **Burbuja WhatsApp** — botón flotante fijo abajo a la derecha, 56px, verde WhatsApp, con `env(safe-area-inset-bottom)`.

## Contenido del catálogo (copy exacto de example-design)

- **Ramos** — "Diseños frescos para cada ocasión."
  - Ramo Primavera — "Flores de temporada en envoltura kraft."
  - Ramo Clásico de Rosas — "Rosas frescas seleccionadas a mano."
- **Globos** — "Bouquets con globos que sorprenden."
  - Bouquet Globo & Flores — "Globo personalizado con flores frescas."
  - Combo Sorpresa — "Globo gigante más detalle floral."
- **Rosas Eternas** — "Duran hasta un año, siempre frescas."
  - Caja Mini Rosa Eterna — "Una rosa eterna en caja de regalo."
  - Caja Premium — "Rosas eternas en caja de lujo."
- **Ocasiones Especiales** — "Arreglos para cada momento importante."
  - Arreglo Cumpleaños — "Alegre y colorido para celebrar en grande."
  - Detalle Aniversario — "Romántico, para su fecha especial."

⚠️ **example-design NO trae precios** de ningún producto. Los precios en el sitio
son TODO hasta que el cliente los defina — no inventarlos.

Enlaces WhatsApp: `https://wa.me/584120000000?text=<mensaje URL-encoded>`.
El número `584120000000` es placeholder — TODO: número real.
Patrón de mensaje: "Hola CocoGifts, quiero cotizar: <producto>."

## Estructura de carpetas

```
cocogifts-web/
├── CLAUDE.md
├── index.html         one-page con las 9 secciones
├── catalogo.html      página de catálogo completo (ver abajo)
├── css/
│   └── styles.css     hoja ÚNICA consolidada (sin @import entre archivos)
├── js/
│   └── main.js        script ÚNICO de tabs para ambas páginas (ver abajo)
└── assets/img/        imágenes (por ahora placeholders SVG locales)
```

### CSS: hoja única + cache-busting (refactor 2026-07-20)

- Antes: 16 parciales (`css/base/`, `css/sections/`, `css/components/`) encadenados
  con `@import` desde `main.css`, cada URL con su propio `?v=N`. Eso obligaba a
  sincronizar ~18 números y provocaba que ediciones no se reflejaran (caché) además
  de una cascada de peticiones secuenciales.
- Ahora: **todo vive en `css/styles.css`**, en el mismo orden de cascada que tenían
  los @import (**BASE → SECTIONS → COMPONENTS**), con separadores comentados
  navegables: `/* === BASE: variables === */`, `/* === SECTIONS: hero === */`,
  `/* === COMPONENTS: nav === */`, etc. La única `@import` que queda es la de
  Google Fonts, que **debe seguir siendo la primera regla del archivo** (CSS exige
  @import antes de cualquier otra regla).
- **Cache-busting**: un único `?v=N` en el `<link>` de `css/styles.css` de cada HTML
  (hoy `?v=3`). Al editar CSS y no verse el cambio, subir ese número en ambos HTML.
  Los `<script>` llevan su propio `?v=N` con el mismo criterio.
- No volver a fragmentar en parciales ni reintroducir @import entre archivos.

## Página catalogo.html

Catálogo completo en página dedicada (rediseñada a **tabs** por Manuel el 2026-07-20,
revirtiendo la versión previa de chips-ancla + categorías apiladas):

- **Encabezado** (`.catalogo-completo__encabezado`): h1 "Catálogo completo", subtítulo
  y aviso `TODO` visible.
- **Tabs por categoría** reutilizando el componente `.catalogo-tabs` (mismo patrón
  visual y ARIA que el mini-catálogo de la home): barra `.catalogo-tabs__lista` con 4
  enlaces-tab y 4 `.catalogo-tabs__panel` con id `ramos`, `globos`, `eternas`,
  `ocasiones-especiales`. Cada panel tiene un grid `.catalogo-tabs__productos` con
  **varios** productos (bloque `.tarjeta-categoria`), no un resumen único.
- **Mejora progresiva**: sin JS los 4 paneles quedan apilados y visibles y la barra es
  una fila de enlaces-ancla. `js/main.js` los convierte en tabs WAI-ARIA
  (tablist/tab/tabpanel, roving tabindex, aria-selected, indicador de barra inferior
  además de color) dejando visible un solo panel.
- **Soporte de hash / deep-link**: `js/main.js` lee `location.hash` al cargar y activa
  esa categoría de entrada (p. ej. `catalogo.html#ramos`). También refleja la tab activa
  en la URL con `history.replaceState` (sin salto de scroll) y escucha `hashchange`
  (atrás/adelante). Los id de panel coinciden con el hash. El botón "Ver más" del
  mini-catálogo (otra sesión) usará estos enlaces.
- **Grid responsive**: 1 columna en mobile; en `≥1024px`, **2 columnas**
  (`.catalogo-completo .catalogo-tabs__productos`, gana por especificidad al 1fr 1fr del
  componente) y contenedor centrado a `max-width: 1080px`.

### JS: script único (refactor 2026-07-20)

`js/main.js` fusiona los antiguos `catalogo-tabs.js` (home) y
`catalogo-completo-tabs.js` (catálogo completo): compartían toda la lógica de tabs.
Los dos extras se autoactivan según la página, sin atributos en el HTML:

- **"Ver más"** (solo home): el bloque es un no-op si no existen botones
  `.catalogo-tabs__ver-mas` en la página.
- **Modo hash** (solo catalogo.html): se activa cuando `.catalogo-tabs` vive dentro
  de `.catalogo-completo`, contenedor exclusivo de esa página
  (`raiz.closest('.catalogo-completo')`). La home nunca toca la URL al cambiar de tab.
  ⚠️ Si algún día se renombra `.catalogo-completo`, actualizar ese detector.

Ambas páginas cargan `js/main.js?v=N` (mismo criterio de cache-busting que el CSS).

El botón "Ver catálogo completo" de index.html enlaza aquí.
⚠️ TODO visible: hoy la página combina los 8 productos de muestra de example-design
(copy real de referencia) con productos **placeholder** inventados ("Producto de ejemplo N",
imagen `placeholder-producto.svg`); el catálogo real completo está pendiente del cliente.

## Decisiones de implementación

- **Nav/menú móvil sin JS**: patrón `:target` — la hamburguesa es un enlace a
  `#menu-movil` y "cerrar" apunta a `#cerrar-menu` (fragmento inexistente que
  limpia el :target sin scroll). Limitación asumida: sin gestión de foco ni Esc.
  En desktop (≥1024px) los enlaces van inline y la hamburguesa se oculta.
- **Nav y footer están duplicados** en index.html y catalogo.html (HTML estático,
  sin includes): cualquier edición debe replicarse en ambos archivos.
- **Desktop**: el mockup aprobado es solo móvil (430px); en desktop cada sección
  se centra (max-width 760–1080px según sección), el hero y nosotras pasan a 2
  columnas, la galería a 3, y ocasiones mantiene el carrusel horizontal.
- Botones "Cotizar" de ocasiones: 44px de alto (el diseño trae 34px; se sube al
  target táctil mínimo del proyecto).
- El banner `.promo` se elimina del HTML cuando no haya promo activa (equivale
  al flag showPromo del diseño).

## Convenciones técnicas

- **Mobile-first real**: CSS base = mobile; un solo breakpoint `@media (min-width: 1024px)`
  para desktop. Nunca al revés. Sin breakpoints intermedios salvo necesidad clara de una
  sección específica.
- **BEM** en todo HTML/CSS (`.bloque__elemento--modificador`).
- **JS vanilla**, mínimo indispensable. Sin librerías, frameworks ni npm. Todo debe
  funcionar razonablemente sin JS (mejora progresiva).
- **Sin dependencias externas** — única excepción: Google Fonts (Inter / Inter Tight).
- Comentarios explican el **porqué** de decisiones no obvias, no el qué.
- **Contenido**: solo copy/precios/estructura que existan en `example-design/`. Lo que
  falte se marca como `TODO` visible y se consulta al cliente — nunca inventarlo.
- **Git**: Claude NO ejecuta `git add`, `git commit` ni `git push` bajo ninguna
  circunstancia. Los commits los hace Manuel manualmente.
- Targets táctiles mínimos de 44px; accesibilidad ARIA en componentes interactivos.

## Estado

- ✅ Las 9 secciones de index.html construidas (nav, hero+promo, nosotras,
  catálogo con tabs, galería, comunidad, ocasiones, footer, burbuja WhatsApp).
- ✅ catalogo.html (catálogo completo con **tabs** por categoría, varios productos por
  categoría y soporte de hash para deep-link; `js/main.js`).
- ⬜ Pendiente del cliente: precios reales, número de WhatsApp real
  (placeholder `584120000000`), fotos reales (ahora SVG placeholder), mapa real,
  y los productos del catálogo completo (hoy los 8 de muestra de example-design
  más productos "Producto de ejemplo N" marcados como placeholder).
