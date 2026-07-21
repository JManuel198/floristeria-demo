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

## Las 8 secciones del sitio

> La sección **Ocasiones** (carrusel `#ocasiones`) se eliminó el 2026-07-21; el sitio
> pasó de 9 a 8 secciones. Ver "Decisiones de implementación".

1. **Nav** — barra fija superior, logo "CocoGifts" (Coco negro + Gifts rosa), menú hamburguesa a pantalla completa con enlaces ancla + botones WhatsApp/Instagram.
2. **Hero** (`#hero`) — imagen **inmersiva** a sangre (4/5 en mobile, 16/9 en desktop) con el h1 "Flores que dicen lo que las palabras no alcanzan." y el subtítulo **superpuestos abajo** sobre un scrim oscuro (texto blanco). **Sin CTA** (eliminado el 2026-07-21). Debajo: **tarjeta PROMO** opcional (badge, título, descripción y CTA verde "Consultar promoción" a WhatsApp con mensaje placeholder `[PROMOCIÓN]`).
3. **Nosotras** (`#nosotras`) — foto de Maru y Ana, texto de presentación, chip de ubicación "Acarigua, Edo. Portuguesa".
4. **Catálogo** (`#catalogo`) — 3 categorías (Ramos, Globos, Rosas Eternas) en **tabs**. Cada tab muestra **una tarjeta de la categoría** con un **feed horizontal de fotos** (scroll-snap nativo, tipo Instagram, con flecha de swipe y dots) + CTA "Cotizar" a nivel categoría, y un enlace **"Ver más"** al catálogo completo anclado a esa categoría (`catalogo.html#ramos`/`#globos`/`#eternas`). Botón "Ver catálogo completo" junto al título.
5. **Galería** (`#galeria`) — grid 2 columnas, 6 fotos de trabajos reales.
6. **Comunidad** (`#comunidad`) — tarjeta rosada: "31K seguidores en Instagram", 2 posts, botón "Seguir @cocogifts.ca".
7. **Footer** (`#contacto`) — descripción, horario (L–S 9:00 am–6:00 pm, domingo cerrado), dirección (Av. Los Próceres con Calle 33, Acarigua), mapa, CTAs WhatsApp/Instagram, copyright. (El grupo de enlaces "Nosotras/Catálogo/Galería/Contacto" se quitó por redundar con el menú hamburguesa.)
8. **Burbuja WhatsApp** — botón flotante fijo abajo a la derecha, 56px, verde WhatsApp, con `env(safe-area-inset-bottom)`.

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

La categoría **Ocasiones Especiales** (Arreglo Cumpleaños, Detalle Aniversario) se
eliminó del catálogo el 2026-07-21 junto con la sección Ocasiones.

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
  (hoy `?v=5`). Al editar CSS y no verse el cambio, subir ese número en ambos HTML.
  Los `<script>` llevan su propio `?v=N` con el mismo criterio (hoy `js/main.js?v=2`).
- No volver a fragmentar en parciales ni reintroducir @import entre archivos.

## Página catalogo.html

Catálogo completo en página dedicada (rediseñada a **tabs** por Manuel el 2026-07-20,
revirtiendo la versión previa de chips-ancla + categorías apiladas):

- **Encabezado** (`.catalogo-completo__encabezado`): h1 "Catálogo completo", subtítulo
  y aviso `TODO` visible.
- **Tabs por categoría** reutilizando el componente `.catalogo-tabs` (mismo patrón
  visual y ARIA que el mini-catálogo de la home): barra `.catalogo-tabs__lista` con 3
  enlaces-tab y 3 `.catalogo-tabs__panel` con id `ramos`, `globos`, `eternas`. Cada panel
  tiene un grid `.catalogo-tabs__productos` con **varios** productos (bloque
  `.tarjeta-categoria`), no un resumen único. (La 4.ª categoría, Ocasiones Especiales, se
  eliminó el 2026-07-21.)
- **Mejora progresiva**: sin JS los paneles quedan apilados y visibles y la barra es
  una fila de enlaces-ancla. `js/main.js` los convierte en tabs WAI-ARIA
  (tablist/tab/tabpanel, roving tabindex, aria-selected, indicador de barra inferior
  además de color) dejando visible un solo panel.
- **Soporte de hash / deep-link**: `js/main.js` lee `location.hash` al cargar y activa
  esa categoría de entrada (p. ej. `catalogo.html#ramos`). También refleja la tab activa
  en la URL con `history.replaceState` (sin salto de scroll) y escucha `hashchange`
  (atrás/adelante). Los id de panel coinciden con el hash. El enlace **"Ver más"** del
  mini-catálogo apunta aquí (`#ramos`/`#globos`/`#eternas`; ⚠️ el de Rosas Eternas usa
  `#eternas`, no `#rosas-eternas`).
- **Grid de productos**: **2 columnas en todos los tamaños** (mobile incluido), definido
  en la regla base de `.catalogo-tabs__productos` (2026-07-21). Aplica igual al
  mini-catálogo y al catálogo completo; ya no hay override por `@media`. El contenedor
  del catálogo completo se centra a `max-width: 1080px` en `≥1024px`.

### JS: script único (refactor 2026-07-20)

`js/main.js` fusiona los antiguos `catalogo-tabs.js` (home) y
`catalogo-completo-tabs.js` (catálogo completo): comparten toda la lógica de tabs y
solo se diferencian en el soporte de hash, que se autoactiva según la página:

- **Modo hash** (solo catalogo.html): se activa cuando `.catalogo-tabs` vive dentro
  de `.catalogo-completo`, contenedor exclusivo de esa página
  (`raiz.closest('.catalogo-completo')`). La home nunca toca la URL al cambiar de tab.
  ⚠️ Si algún día se renombra `.catalogo-completo`, actualizar ese detector.

El "Ver más" del mini-catálogo ya **no** es un acordeón JS: es un enlace a
`catalogo.html#<cat>` (se eliminó la lógica expandir/colapsar el 2026-07-21).

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
  se centra (max-width 760–1080px según sección), nosotras pasa a 2 columnas, la
  galería a 3, y el hero se ve como una tarjeta ancha (imagen 16/9) con el texto
  superpuesto.
- **Sección Ocasiones eliminada (2026-07-21)**: se quitó por completo el carrusel
  `#ocasiones` (8 tarjetas `.tarjeta-ocasion`), su enlace en el nav y menú móvil, la
  categoría "Ocasiones Especiales" del catálogo (tab + panel) en ambas páginas, y su CSS
  (`.ocasiones`, `.tarjeta-ocasion`). Las imágenes `assets/img/ocasion-*.svg`,
  `arreglo-cumpleanos.svg` y `detalle-aniversario.svg` quedaron sin uso pero **no** se
  borraron (assets fuera de alcance).
- **Enlaces del footer eliminados (2026-07-21)**: el grupo "Nosotras/Catálogo/Galería/
  Contacto" (`.footer__enlaces`/`.footer__enlace`) se quitó de ambos footers por redundar
  con el menú hamburguesa; su CSS también, y el grid del footer bajó de 4 a 3 columnas.
- La **tarjeta `.promo`** se elimina del HTML cuando no haya promo activa (equivale
  al flag showPromo del diseño). Para cambiar de promo: editar `.promo__titulo`,
  `.promo__texto` y el `[PROMOCIÓN]` del `href` del `.promo__cta`.
- **Hero inmersivo + Promo tarjeta (2026-07-21)**: el hero pasó a imagen a sangre con
  `.hero__contenido` en `position:absolute` sobre un scrim (`.hero::after`, degradado
  oscuro) y texto blanco; se **eliminó `.hero__cta`**. La `.promo` pasó de banner a
  tarjeta (badge + título + descripción + CTA verde "Consultar promoción").
- **Mini-catálogo: tarjeta = categoría (2026-07-21)**: cada tab muestra una sola
  `.tarjeta-categoria` (ancho completo, sin el grid de 2 columnas) cuya imagen es un
  **feed horizontal** `.tarjeta-categoria__feed` (varias `.tarjeta-categoria__feed-img`,
  `scroll-snap-type: x mandatory`, una foto por vista en mobile (varias en desktop,
  ver más abajo), scrollbar oculta, `tabindex="0"` para scroll por teclado). Hoy 2 fotos
  reales + 2 placeholder por categoría. El grid de 2 columnas `.catalogo-tabs__productos`
  queda solo para catalogo.html.
- **"Ver más" = enlace (2026-07-21)**: `.catalogo-tabs__ver-mas` pasó de botón acordeón
  a `<a>` hacia `catalogo.html#<cat>`; se quitó la lógica JS y el CSS de rotación del ícono.
- **Ícono WhatsApp del footer (2026-07-21)**: `.footer__cta-whatsapp` no tenía SVG inline
  (el CSS reservaba `gap` para él); se agregó el ícono en ambos footers.
- **Feed del mini-catálogo: flecha, dots y snap por foto (2026-07-21)**: 3 mejoras
  independientes sobre `.tarjeta-categoria__feed` (solo index.html; catalogo.html usa
  `.tarjeta-categoria__imagen`, una sola foto, no feed):
  - `scroll-snap-stop: always` en `.tarjeta-categoria__feed-img` para que un swipe
    rápido no salte de largo una foto.
  - Flecha `.tarjeta-categoria__feed-flecha` (SVG, overlay `position:absolute` sobre
    el feed, no se mueve con el scroll horizontal) que indica que se puede deslizar.
    `js/main.js` le agrega `.tarjeta-categoria__feed--interactuado` (que la desvanece
    por CSS) en el primer evento `scroll` de **ese** feed — estado por tarjeta, no un
    flag global, así cada categoría mantiene su propia flecha hasta que la deslizan.
  - Dots `.tarjeta-categoria__dots` (uno por foto, `.tarjeta-categoria__dot`): generados
    en JS a partir de las `.tarjeta-categoria__feed-img` reales (no hay conteo fijo en
    el HTML) y marcados `--activo` con un `IntersectionObserver` (`root` = el feed)
    cuando su foto es la visible.
  - Todo vive en un segundo IIFE al final de `js/main.js`, separado del de tabs.

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

- ✅ Las 8 secciones de index.html construidas (nav, hero+promo, nosotras,
  catálogo con tabs, galería, comunidad, footer, burbuja WhatsApp).
- ✅ catalogo.html (catálogo completo con **tabs** por categoría, varios productos por
  categoría y soporte de hash para deep-link; `js/main.js`).
- ⬜ Pendiente del cliente: precios reales, número de WhatsApp real
  (placeholder `584120000000`), fotos reales (ahora SVG placeholder), mapa real,
  y los productos del catálogo completo (hoy los 8 de muestra de example-design
  más productos "Producto de ejemplo N" marcados como placeholder).
