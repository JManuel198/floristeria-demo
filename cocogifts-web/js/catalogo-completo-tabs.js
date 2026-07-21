/* Tabs de la página de catálogo completo (catalogo.html) — mejora progresiva.
 *
 * Comparte el patrón visual y ARIA del mini-catálogo de la home
 * (js/catalogo-tabs.js), pero es un archivo aparte a propósito: aquí añadimos
 * soporte de hash (catalogo.html#ramos abre esa categoría de entrada) y NO
 * existe el desplegable "Ver más". Meter esta lógica en el script compartido
 * cambiaría el comportamiento del mini-catálogo, que esta sesión no debe tocar.
 *
 * Sin este script: los 4 paneles quedan apilados y visibles, y la barra de tabs
 * es una fila de enlaces-ancla hacia cada categoría (catalogo.html#ramos hace un
 * salto normal). Nada del contenido ni de los CTA de WhatsApp depende de JS.
 *
 * Con este script: semántica WAI-ARIA de tabs (tablist/tab/tabpanel, roving
 * tabindex), un solo panel visible, y la categoría inicial se toma del hash.
 * Los roles ARIA se asignan aquí y no en el HTML porque, si el JS no carga, un
 * role="tab" estático prometería un comportamiento (paneles ocultos) que no existe.
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
    if (sincronizarHash) {
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

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', (evento) => {
      evento.preventDefault(); // sin JS el href ancla; con JS el salto sobra
      seleccionar(i, false, true);
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

  /* Deep-link: si la página abre con catalogo.html#ramos (p. ej. desde el botón
     "Ver más" del mini-catálogo), esa categoría queda activa desde el inicio.
     No sincronizamos el hash aquí: ya viene puesto y el navegador hará su salto. */
  const inicial = indiceDesdeHash();
  seleccionar(inicial >= 0 ? inicial : 0, false, false);

  /* Mantiene la tab en sincronía si el hash cambia después de cargar
     (botón atrás/adelante o edición manual de la URL). */
  window.addEventListener('hashchange', () => {
    const indice = indiceDesdeHash();
    if (indice >= 0 && indice !== activa) seleccionar(indice, false, false);
  });
})();
