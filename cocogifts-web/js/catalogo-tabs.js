/* Tabs del catálogo — mejora progresiva sobre HTML que ya funciona solo.
 *
 * Sin este script: los 4 paneles quedan apilados y visibles, la barra de tabs
 * es una fila de enlaces-ancla, el contenido "extra" está desplegado y los
 * botones "Ver más" quedan ocultos (atributo hidden en el HTML). Todos los CTA
 * de WhatsApp son enlaces wa.me normales, así que nada depende de JS.
 *
 * Con este script: semántica WAI-ARIA de tabs (tablist/tab/tabpanel, roving
 * tabindex), un solo panel visible, y "Ver más" colapsable con aria-expanded.
 * Los roles ARIA se asignan aquí y no en el HTML a propósito: si el JS no
 * carga, un role="tab" estático prometería un comportamiento que no existe.
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

  function seleccionar(indice, enfocar) {
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
    if (enfocar) {
      tabs[indice].focus();
      /* En la barra scrolleable, la tab enfocada podría quedar fuera de vista. */
      tabs[indice].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', (evento) => {
      evento.preventDefault(); // sin JS el href ancla; con JS el salto sobra
      seleccionar(i, false);
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
      seleccionar(destino, true);
    }
  });

  seleccionar(0, false);

  /* "Ver más": expande el segundo producto de la categoría sin navegar.
     El botón nace con hidden en el HTML y solo se muestra aquí, porque sin JS
     el contenido extra ya está visible y el botón no tendría nada que hacer. */
  raiz.querySelectorAll('.catalogo-tabs__ver-mas').forEach((boton) => {
    const extra = document.getElementById(boton.getAttribute('aria-controls'));
    const etiqueta = boton.querySelector('.catalogo-tabs__ver-mas-texto');
    if (!extra || !etiqueta) return;

    boton.hidden = false;
    boton.setAttribute('aria-expanded', 'false');
    extra.hidden = true;

    boton.addEventListener('click', () => {
      const abierto = boton.getAttribute('aria-expanded') === 'true';
      boton.setAttribute('aria-expanded', String(!abierto));
      extra.hidden = abierto;
      etiqueta.textContent = abierto ? boton.dataset.labelMas : boton.dataset.labelMenos;
    });
  });
})();
