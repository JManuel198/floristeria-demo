# CocoGifts — sitio web

Sitio de una sola página (más una página de catálogo completo), mobile-first, en
español, para la floristería **CocoGifts**.

## Negocio

Floristería en Acarigua, Edo. Portuguesa, Venezuela. Fundadoras: Maru y Ana.
Productos: arte floral hecho a mano — ramos, bouquets con globos, rosas eternas.
Comunidad: 31K seguidores en Instagram ([@cocogifts.ve](https://www.instagram.com/cocogifts.ve/)).
Canal de venta principal: WhatsApp (cotizaciones vía enlaces `wa.me`).

Referencia de diseño: `../example-design/CocoGifts.dc.html` (exportación de Claude
Design con sintaxis propia — `<x-dc>`, `<image-slot>`, `sc-for`, `{{ vars }}`). Es
**solo referencia** de colores, tipografía, copy, contenido y disposición visual; su
sintaxis no se copia. Todo el sitio es HTML semántico + CSS + JS vanilla.

## Estructura del proyecto

```
floristeria-demo/
├── CLAUDE.md          esta guía
├── README.md          documentación de entrega (qué es, cómo correr, deploy)
├── index.html         one-page con las 8 secciones
├── catalogo.html      página de catálogo completo
├── css/
│   └── styles.css     hoja de estilos única
├── js/
│   └── main.js        script único (tabs + feed de fotos) para ambas páginas
└── assets/img/        imágenes del sitio
```

Sin build ni dependencias de npm: se abre `index.html` directamente en el navegador o
se sirve como sitio estático (ver "Sin dependencias externas" en Convenciones técnicas
para las dos excepciones de scripts/fuentes cargados por `<script>`/`<link>`).

## Arquitectura

- **CSS en una sola hoja** (`css/styles.css`), en orden de cascada
  **BASE → SECTIONS → COMPONENTS**, con separadores comentados navegables
  (`/* === SECTIONS: hero === */`, etc.). El `@import` de Google Fonts es la primera
  regla del archivo (requisito de CSS). No fragmentar en parciales ni reintroducir
  `@import` entre archivos.
- **JS en un solo archivo** (`js/main.js`), con dos IIFE independientes: tabs del
  catálogo y feed horizontal de fotos. Mejora progresiva: todo funciona sin JS.
- **Cache-busting**: el `<link>` del CSS y el `<script>` de cada HTML llevan un
  `?v=N`; subir ese número cuando un cambio no se refleje por caché.
- **Nav y footer duplicados** en `index.html` y `catalogo.html` (HTML estático, sin
  includes): replicar cualquier edición en ambos archivos.

### Mismo layout en todos los tamaños

El sitio usa la misma composición móvil en cualquier ancho de pantalla; no hay un
layout de escritorio distinto. En pantallas anchas el contenido se centra mediante la
variable `--max-width-contenido` (520px) con `margin: 0 auto`, sin ensancharse. Esto
no usa `@media`: en móvil el tope de ancho no se alcanza. El hero y la promo usan
`width: min(var(--max-width-contenido), calc(100% - 40px))` para conservar el gutter
de 20px. El nav y el footer mantienen su franja de fondo a todo el ancho y centran
solo su contenido interno (`.nav__barra`, `.footer__contenido`, `.footer__legal`).

La única `@media (min-width: 1024px)` del proyecto es la del feed de fotos del
mini-catálogo (`.tarjeta-categoria__feed`), que muestra varias fotos a la vez en
pantallas anchas. Se permiten ajustes finos de fuente/espaciado para teléfonos muy
chicos (<360px) o muy grandes (>480px), pero no un breakpoint de tablet/desktop con
columnas o composición propia.

## Paleta de colores

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
| `--color-fondo-exterior` | `#EDEBE8` | Fondo fuera del contenedor |
| `--color-fondo-neutro` | `#F7F5F3` | Fondos neutros (footer, chips) |
| `--color-superficie` | `#FFFFFF` | Tarjetas, nav |
| `--color-borde` | `#F0EDEA` | Bordes de tarjetas y separadores |
| `--color-borde-suave` | `#F5F2EF` | Separadores finos (menú) |

Tokens de radio: `--radio-tarjeta: 16px`, `--radio-boton: 12px`.

### Verde WhatsApp — regla fija

- `--color-whatsapp: #25D366`, hover `--color-whatsapp-hover: #1EBE5A`.
- Exclusivo para acciones de WhatsApp (burbuja flotante, botones "Cotizar por
  WhatsApp", cualquier enlace `wa.me`). No se usa en ningún otro elemento.

## Tipografía

- **Inter** (400, 500, 600, 700): cuerpo de texto, familia base del `body`.
- **Inter Tight** (600, 700, 800): titulares y logo. Peso 800 para h1/h2, 700 para
  h3/h4; `letter-spacing: -0.02em` en titulares grandes.
- Carga vía Google Fonts:
  `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@600;700;800&display=swap`
  (una de las dos dependencias externas del proyecto; ver "Sin dependencias
  externas" en Convenciones técnicas).

## Las 8 secciones de index.html

1. **Nav** — barra fija superior; logo "CocoGifts" (Coco negro + Gifts rosa) y menú
   hamburguesa a pantalla completa con enlaces ancla y botones WhatsApp/Instagram. La
   hamburguesa se usa en todos los tamaños de pantalla.
2. **Hero** (`#hero`) — imagen inmersiva a sangre (relación 4/5) con el h1 "Flores que
   dicen lo que las palabras no alcanzan." y el subtítulo superpuestos abajo sobre un
   scrim oscuro (texto blanco). Debajo, una **tarjeta PROMO** opcional (badge, título,
   descripción y CTA verde "Consultar" a WhatsApp).
3. **Nosotras** (`#nosotras`) — foto de Maru y Ana, texto de presentación y chip de
   ubicación "Acarigua, Edo. Portuguesa".
4. **Catálogo** (`#catalogo`) — 3 categorías (Ramos, Globos, Rosas Eternas) en tabs.
   Cada tab muestra una tarjeta de categoría con un **feed horizontal de fotos**
   (scroll-snap nativo, con flecha de swipe y dots) + CTA "Cotizar por WhatsApp" a
   nivel categoría, y un enlace "Ver más" a esa categoría del catálogo completo
   (`catalogo.html#ramos` / `#globos` / `#eternas`). Botón "Ver catálogo completo"
   junto al título.
5. **Galería** (`#galeria`) — grid de 2 columnas, 6 fotos de trabajos.
6. **Comunidad** (`#comunidad`) — tarjeta rosada: "31K seguidores en Instagram", 2
   posts (miniaturas enlazadas a Instagram, ver "Instagram" más abajo) y botón "Seguir
   @cocogifts.ve".
7. **Footer** (`#contacto`) — descripción, horario (L–S 9:00 am–6:00 pm, domingo
   cerrado), dirección (Av. Los Próceres con Calle 33, Acarigua), mapa, CTAs
   WhatsApp/Instagram y copyright.
8. **Burbuja WhatsApp** — botón flotante fijo abajo a la derecha, 56px, verde
   WhatsApp, con `env(safe-area-inset-bottom)`.

### Nav / menú móvil sin JS

El menú abre y cierra con el patrón `:target`: la hamburguesa enlaza a `#menu-movil` y
el botón de cerrar a `#cerrar-menu` (fragmento inexistente que limpia el `:target` sin
provocar scroll). Los enlaces del menú cambian el hash a su sección, así que el overlay
se cierra al navegar. Sin JS no hay gestión de foco ni cierre con Esc.

### Instagram

Los enlaces a Instagram del sitio (nav, botón "Seguir" de Comunidad y footer) apuntan
al perfil real `https://www.instagram.com/cocogifts.ve/`, y "31K seguidores" es un dato
real.

Los 2 posts de la sección Comunidad son `<img>` normales envueltas en un `<a>` a la
publicación real (sin embed oficial de Instagram):

- Miniatura 1 → `assets/img/ramo1.jpg` → `https://www.instagram.com/p/DV9XEy_FAyK/`
- Miniatura 2 → `assets/img/ramo2.jpg` → `https://www.instagram.com/p/DYw1OBeFoWW/`

⚠️ `ramo1.jpg` y `ramo2.jpg` son **placeholders temporales** (fotos de muestra del
sitio, no las fotos reales de cada publicación) mientras se suben las imágenes
correspondientes a esos dos posts específicos. Cada `<img>` lleva un comentario HTML
que identifica cuál reemplazar.

## Página catalogo.html

Catálogo completo en página dedicada, con el mismo componente `.catalogo-tabs` que el
mini-catálogo de la home:

- **Encabezado** (`.catalogo-completo__encabezado`): h1 "Catálogo completo", subtítulo
  y un aviso `TODO` sobre el estado del contenido.
- **Tabs por categoría**: barra `.catalogo-tabs__lista` con 3 enlaces-tab y 3
  `.catalogo-tabs__panel` con id `ramos`, `globos`, `eternas`. Cada panel tiene un grid
  `.catalogo-tabs__productos` de **2 columnas en todos los tamaños** con varios
  productos (`.tarjeta-categoria`).
- **Mejora progresiva**: sin JS los paneles quedan apilados y la barra es una fila de
  enlaces-ancla; `js/main.js` los convierte en tabs WAI-ARIA con un solo panel visible.
- **Deep-link por hash**: `js/main.js` lee `location.hash` al cargar para abrir esa
  categoría (p. ej. `catalogo.html#ramos`), refleja la tab activa en la URL con
  `history.replaceState` y escucha `hashchange`. Los id de panel coinciden con el hash;
  el de Rosas Eternas es `#eternas` (no `#rosas-eternas`).
- **Modo hash**: se activa solo en esta página, detectando que `.catalogo-tabs` vive
  dentro de `.catalogo-completo` (`raiz.closest('.catalogo-completo')`). La home nunca
  toca la URL al cambiar de tab. Si se renombra `.catalogo-completo`, actualizar ese
  detector.
- La barra de tabs queda fija (`sticky`) bajo la nav al hacer scroll.

## Contenido del catálogo

Copy de referencia (de example-design), 2 productos por categoría:

- **Ramos** — "Diseños frescos para cada ocasión."
  - Ramo Primavera — "Flores de temporada en envoltura kraft."
  - Ramo Clásico de Rosas — "Rosas frescas seleccionadas a mano."
- **Globos** — "Bouquets con globos que sorprenden."
  - Bouquet Globo & Flores — "Globo personalizado con flores frescas."
  - Combo Sorpresa — "Globo gigante más detalle floral."
- **Rosas Eternas** — "Duran hasta un año, siempre frescas."
  - Caja Mini Rosa Eterna — "Una rosa eterna en caja de regalo."
  - Caja Premium — "Rosas eternas en caja de lujo."

Además, `catalogo.html` incluye productos de muestra ilustrativos (contenido no final,
para completar la vista mientras se define el catálogo real con el cliente):

- **Ramos**: Ramo Tropical, Ramo Girasoles, Ramo Mixto Pastel.
- **Globos**: Globo Cumpleaños Feliz, Globo Corazón y Rosas, Globo Metálico XL.
- **Rosas Eternas**: Caja Corazón Eterna, Caja Trío Eterno, Caja Eterna Deluxe.

### Enlaces de WhatsApp

Formato: `https://wa.me/584120000000?text=<mensaje URL-encoded>`. Cada botón "Cotizar
por WhatsApp" de un producto arma su propio mensaje con el nombre exacto del producto
(patrón "Hola CocoGifts, quiero cotizar: <nombre>."); ninguno comparte mensaje con
otro. Los CTA a nivel de categoría del mini-catálogo usan el nombre de la categoría.

## Convenciones técnicas

- **Mobile-first**: el CSS base es móvil; la misma composición se centra en pantallas
  anchas sin un layout de escritorio propio (ver "Mismo layout en todos los tamaños").
- **BEM** en todo HTML/CSS (`.bloque__elemento--modificador`).
- **JS vanilla**, mínimo indispensable. Sin librerías, frameworks ni npm. Todo debe
  funcionar razonablemente sin JS (mejora progresiva).
- **Sin dependencias externas** — una excepción documentada: Google Fonts
  (Inter / Inter Tight).
- **Comentarios**: formales y funcionales; explican el porqué de lo no evidente, sin
  narrar historial.
- **Contenido**: solo copy/estructura que exista en `example-design/`. Lo que falte se
  marca como `TODO` visible y se consulta al cliente — nunca inventarlo.
- **Accesibilidad**: targets táctiles mínimos de 44px; semántica ARIA en componentes
  interactivos (tabs, feed).
- **Git**: los commits los hace Manuel manualmente. Claude no ejecuta `git add`,
  `git commit` ni `git push`.

## Pendiente del cliente

- Precios reales (hoy ningún producto lleva precio).
- Número de WhatsApp real (placeholder `584120000000` en todos los enlaces `wa.me`).
- Fotos reales (las actuales son de muestra).
- Fotos reales de los 2 posts de Instagram en Comunidad (hoy `ramo1.jpg` / `ramo2.jpg`
  como placeholder temporal, ver "Instagram" arriba).
- Mapa real de ubicación (el footer usa un embed provisional).
- Catálogo completo definitivo (los productos de muestra ilustrativos son provisionales).
