/* Tabs del catálogo — script único para index.html (mini-catálogo) y
 * catalogo.html (catálogo completo). Fusión de los antiguos catalogo-tabs.js
 * y catalogo-completo-tabs.js: comparten toda la lógica de tabs y solo se
 * diferencian en el soporte de hash, que se autoactiva según la página:
 *
 * - Soporte de hash (solo catalogo.html): se activa cuando las tabs viven
 *   dentro de .catalogo-completo, el contenedor exclusivo de esa página.
 *   Así el deep-link catalogo.html#ramos abre esa categoría de entrada
 *   sin que la home mueva el hash al cambiar de tab.
 *
 * Mejora progresiva sobre HTML que ya funciona solo. Sin este script: los
 * paneles quedan apilados y visibles y la barra de tabs es una fila de
 * enlaces-ancla. Todos los CTA de WhatsApp son enlaces wa.me normales y el
 * "Ver más" del mini-catálogo es un enlace a catalogo.html, así que nada
 * depende de JS.
 *
 * Con este script: semántica WAI-ARIA de tabs (tablist/tab/tabpanel, roving
 * tabindex) y un solo panel visible. Los roles ARIA se asignan aquí y no en
 * el HTML a propósito: si el JS no carga, un role="tab" estático prometería
 * un comportamiento que no existe.
 */
(function () {
  'use strict';

  const raiz = document.querySelector('.catalogo-tabs');
  if (!raiz) return;

  const lista = raiz.querySelector('.catalogo-tabs__lista');
  const tabs = Array.from(raiz.querySelectorAll('.catalogo-tabs__tab'));
  const paneles = tabs.map((tab) =>
    document.getElementById(tab.getAttribute('href').slice(1))
  );
  if (!lista || tabs.length === 0 || paneles.some((p) => !p)) return;

  /* Interruptor de página: solo catalogo.html envuelve las tabs en
     .catalogo-completo; la home no debe tocar la URL al cambiar de tab. */
  const conHash = raiz.closest('.catalogo-completo') !== null;

  raiz.classList.add('catalogo-tabs--js');

  lista.setAttribute('role', 'tablist');
  tabs.forEach((tab, i) => {
    const panel = paneles[i];
    tab.id = tab.id || panel.id + '-tab';
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
  });

  let activa = 0;

  function seleccionar(indice, enfocar, sincronizarHash) {
    tabs.forEach((tab, i) => {
      const esActiva = i === indice;
      tab.classList.toggle('catalogo-tabs__tab--activa', esActiva);
      tab.setAttribute('aria-selected', String(esActiva));
      /* Roving tabindex: solo la tab activa entra en el orden de tabulación;
         entre tabs se navega con flechas, no con Tab (patrón WAI-ARIA Tabs). */
      tab.tabIndex = esActiva ? 0 : -1;
      paneles[i].hidden = !esActiva;
    });
    activa = indice;
    if (conHash && sincronizarHash) {
      /* Refleja la categoría activa en la URL para poder compartir/recargar el
         enlace profundo, con replaceState: sin nueva entrada de historial y sin
         provocar el salto de scroll que haría asignar location.hash. */
      const destino = tabs[indice].getAttribute('href');
      if (destino && destino !== location.hash) {
        history.replaceState(null, '', destino);
      }
    }
    if (enfocar) {
      tabs[indice].focus();
      /* En la barra scrolleable, la tab enfocada podría quedar fuera de vista. */
      tabs[indice].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  /* Índice de la tab cuyo destino coincide con el hash actual, o -1 si el hash
     está vacío o no corresponde a ninguna categoría. */
  function indiceDesdeHash() {
    const objetivo = location.hash.slice(1);
    if (!objetivo) return -1;
    return tabs.findIndex((tab) => tab.getAttribute('href').slice(1) === objetivo);
  }

  /* Altura de la nav fija (.nav__barra), igual en mobile y desktop; usada para
     no dejar el inicio de la categoría tapado por la nav. */
  const ALTURA_NAV = 56;

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', (evento) => {
      evento.preventDefault(); // sin JS el href ancla; con JS el salto sobra
      seleccionar(i, false, true);
      /* Solo catalogo.html: cada categoría arranca desde el inicio en vez de
         quedar a mitad de scroll de la categoría anterior. No se usa
         lista.scrollIntoView: al estar "pegada" (sticky) por el scroll previo,
         su posición ya reportada es top:56 y el navegador cree que no hace
         falta mover nada. Se calcula contra `raiz` (.catalogo-tabs), que no es
         sticky, para obtener siempre su posición real en el documento. */
      if (conHash) {
        const destinoY = raiz.getBoundingClientRect().top + window.scrollY - ALTURA_NAV;
        window.scrollTo({ top: destinoY, behavior: 'smooth' });
      }
    });
  });

  /* Activación automática con las flechas: cambiar de panel es un show/hide
     instantáneo, así que no hace falta el patrón manual (flecha + Enter). */
  lista.addEventListener('keydown', (evento) => {
    let destino = null;
    if (evento.key === 'ArrowRight') destino = (activa + 1) % tabs.length;
    else if (evento.key === 'ArrowLeft') destino = (activa - 1 + tabs.length) % tabs.length;
    else if (evento.key === 'Home') destino = 0;
    else if (evento.key === 'End') destino = tabs.length - 1;
    if (destino !== null) {
      evento.preventDefault(); // evita que las flechas/Home/End hagan scroll de página
      seleccionar(destino, true, true);
    }
  });

  /* Deep-link (solo catalogo.html): si la página abre con catalogo.html#ramos,
     esa categoría queda activa desde el inicio. No sincronizamos el hash aquí:
     ya viene puesto y el navegador hará su salto. */
  const inicial = conHash ? indiceDesdeHash() : -1;
  seleccionar(inicial >= 0 ? inicial : 0, false, false);

  if (conHash) {
    /* Mantiene la tab en sincronía si el hash cambia después de cargar
       (botón atrás/adelante o edición manual de la URL). */
    window.addEventListener('hashchange', () => {
      const indice = indiceDesdeHash();
      if (indice >= 0 && indice !== activa) seleccionar(indice, false, false);
    });
  }
})();

/* Mejora progresiva del feed horizontal de fotos (.tarjeta-categoria__feed,
 * mini-catálogo de index.html): flecha de swipe que se desvanece al primer
 * scroll de cada tarjeta, y dots que reflejan la foto visible con
 * IntersectionObserver. Sin este script el feed sigue siendo scroll-snap
 * nativo funcional, solo sin flecha ni dots.
 */
(function () {
  'use strict';

  const feeds = document.querySelectorAll('.tarjeta-categoria__feed');

  feeds.forEach((feed) => {
    /* Modificador scoped a este feed (no una clase/flag global): cada
       tarjeta guarda su propio estado de "ya me deslizaron". */
    feed.addEventListener(
      'scroll',
      () => feed.classList.add('tarjeta-categoria__feed--interactuado'),
      { once: true, passive: true }
    );

    const dots = feed.parentElement.querySelector('.tarjeta-categoria__dots');
    const imagenes = Array.from(feed.querySelectorAll('.tarjeta-categoria__feed-img'));
    if (!dots || imagenes.length === 0) return;

    /* Un dot por foto real del feed, para no desincronizar un conteo fijo
       en el HTML si el número de fotos cambia. */
    imagenes.forEach(() => {
      const dot = document.createElement('span');
      dot.className = 'tarjeta-categoria__dot';
      dots.appendChild(dot);
    });
    const listaDots = Array.from(dots.children);

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          const indice = imagenes.indexOf(entrada.target);
          if (indice === -1) return;
          listaDots[indice].classList.toggle('tarjeta-categoria__dot--activo', entrada.isIntersecting);
        });
      },
      { root: feed, threshold: 0.6 }
    );
    imagenes.forEach((img) => observador.observe(img));
  });
})();
