/* Tabs del catálogo, para index.html (mini-catálogo) y catalogo.html (catálogo
 * completo). Mejora progresiva: sin este script los paneles quedan apilados y la
 * barra de tabs funciona como enlaces-ancla. Con él, aplica semántica WAI-ARIA
 * (tablist/tab/tabpanel, roving tabindex) y deja visible un solo panel.
 * En catalogo.html, además, sincroniza la categoría activa con el hash de la URL.
 * Los roles ARIA se asignan aquí (no en el HTML) para no prometer comportamiento
 * de tabs cuando el script no carga.
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

  /* El modo hash solo aplica en catalogo.html, cuya envoltura es .catalogo-completo. */
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

  /* Activa la tab y el panel del índice dado.
   * enfocar: mueve el foco a la tab. sincronizarHash: refleja la categoría en la URL. */
  function seleccionar(indice, enfocar, sincronizarHash) {
    tabs.forEach((tab, i) => {
      const esActiva = i === indice;
      tab.classList.toggle('catalogo-tabs__tab--activa', esActiva);
      tab.setAttribute('aria-selected', String(esActiva));
      /* Roving tabindex: solo la tab activa es tabulable; entre tabs se navega con flechas. */
      tab.tabIndex = esActiva ? 0 : -1;
      paneles[i].hidden = !esActiva;
    });
    activa = indice;
    if (conHash && sincronizarHash) {
      /* replaceState evita una entrada de historial y el salto de scroll de location.hash. */
      const destino = tabs[indice].getAttribute('href');
      if (destino && destino !== location.hash) {
        history.replaceState(null, '', destino);
      }
    }
    if (enfocar) {
      tabs[indice].focus();
      tabs[indice].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  /* Índice de la tab cuyo destino coincide con el hash actual, o -1 si no hay coincidencia. */
  function indiceDesdeHash() {
    const objetivo = location.hash.slice(1);
    if (!objetivo) return -1;
    return tabs.findIndex((tab) => tab.getAttribute('href').slice(1) === objetivo);
  }

  const ALTURA_NAV = 56; // altura de la nav fija

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', (evento) => {
      evento.preventDefault();
      seleccionar(i, false, true);
      /* Solo catalogo.html: sube al inicio de la categoría. Se mide contra `raiz`
         (no la lista, que es sticky) para obtener su posición real en el documento. */
      if (conHash) {
        const destinoY = raiz.getBoundingClientRect().top + window.scrollY - ALTURA_NAV;
        window.scrollTo({ top: destinoY, behavior: 'smooth' });
      }
    });
  });

  /* Navegación por teclado entre tabs (flechas, Home, End) con activación inmediata. */
  lista.addEventListener('keydown', (evento) => {
    let destino = null;
    if (evento.key === 'ArrowRight') destino = (activa + 1) % tabs.length;
    else if (evento.key === 'ArrowLeft') destino = (activa - 1 + tabs.length) % tabs.length;
    else if (evento.key === 'Home') destino = 0;
    else if (evento.key === 'End') destino = tabs.length - 1;
    if (destino !== null) {
      evento.preventDefault();
      seleccionar(destino, true, true);
    }
  });

  /* Estado inicial: en catalogo.html abre la categoría del hash (deep-link) si existe. */
  const inicial = conHash ? indiceDesdeHash() : -1;
  seleccionar(inicial >= 0 ? inicial : 0, false, false);

  if (conHash) {
    /* Mantiene la tab en sincronía con los cambios de hash (atrás/adelante o edición manual). */
    window.addEventListener('hashchange', () => {
      const indice = indiceDesdeHash();
      if (indice >= 0 && indice !== activa) seleccionar(indice, false, false);
    });
  }
})();

/* Feed horizontal de fotos del mini-catálogo (.tarjeta-categoria__feed, index.html):
 * desvanece la flecha de swipe al primer scroll de cada tarjeta y marca con dots la
 * foto visible mediante IntersectionObserver. Sin este script el feed sigue siendo
 * un scroll-snap nativo funcional, solo sin flecha ni dots.
 */
(function () {
  'use strict';

  const feeds = document.querySelectorAll('.tarjeta-categoria__feed');

  feeds.forEach((feed) => {
    /* Estado por tarjeta: cada feed desvanece su propia flecha al deslizarse. */
    feed.addEventListener(
      'scroll',
      () => feed.classList.add('tarjeta-categoria__feed--interactuado'),
      { once: true, passive: true }
    );

    const dots = feed.parentElement.querySelector('.tarjeta-categoria__dots');
    const imagenes = Array.from(feed.querySelectorAll('.tarjeta-categoria__feed-img'));
    if (!dots || imagenes.length === 0) return;

    /* Un dot por foto real del feed. */
    imagenes.forEach(() => {
      const dot = document.createElement('span');
      dot.className = 'tarjeta-categoria__dot';
      dots.appendChild(dot);
    });
    const listaDots = Array.from(dots.children);

    /* Marca como activo el dot de la foto visible dentro del feed. */
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
