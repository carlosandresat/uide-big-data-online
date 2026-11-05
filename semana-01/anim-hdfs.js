/* Animación · Cómo guarda HDFS un archivo de 300 MB
   Bloques de 128 MB (valor por defecto de Hadoop 2 y 3) y factor de replicación 3 (también por defecto).
   Escalas: en la barra del archivo, 2 px por MB; en los DataNodes, 1.25 px por MB.
   Pasos: 1 divide en bloques · 2 reparte 3 copias de cada bloque · 3 el NameNode anota dónde está cada copia
          4 falla el DataNode 3 · 5 el NameNode ordena copias nuevas hasta volver a 3 por bloque.
   En modo lectura se dibuja el estado final (paso 5). */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const fig = document.getElementById('anim-hdfs');
  if (!fig) return;
  const diapositiva = fig.closest('.diapositiva');

  function nodo(etiqueta, atributos, padre, texto) {
    const e = document.createElementNS(NS, etiqueta);
    for (const k in atributos) e.setAttribute(k, atributos[k]);
    if (texto !== undefined) e.textContent = texto;
    if (padre) padre.appendChild(e);
    return e;
  }

  const svg = nodo('svg', { viewBox: '0 0 1000 560', role: 'img',
    'aria-label': 'Un archivo de 300 MB se divide en bloques de 128, 128 y 44 MB; cada bloque se guarda tres veces en DataNodes distintos y el NameNode anota dónde está cada copia.' });
  svg.style.cssText = 'width:100%;height:auto;max-height:calc(var(--u) * 64);display:block;font-family:var(--f-texto)';
  fig.prepend(svg);

  const estilo = {
    caja: 'fill:var(--caja-diagrama)',
    textoCaja: 'fill:var(--texto-caja-diagrama);font-weight:800;font-size:24px',
    texto: 'fill:var(--tinta);font-size:21px;font-weight:700',
    suave: 'fill:var(--tinta-suave);font-size:18px',
    mono: 'fill:var(--tinta);font-family:var(--f-codigo);font-size:20px;font-weight:600',
    marco: 'fill:var(--superficie);stroke:var(--regla);stroke-width:2.5',
    bloque: 'fill:var(--guinda);stroke:var(--fondo);stroke-width:2',
    nuevo: 'fill:var(--guinda);stroke:var(--dorado);stroke-width:5',
    textoBloque: 'fill:#FFFFFF;font-weight:800;font-size:20px',
    acento: 'fill:var(--acento);font-size:20px;font-weight:800',
  };
  const capa = (paso) => {
    const g = nodo('g', { 'data-desde': paso }, svg);
    g.style.transition = 'opacity 450ms ease';
    return g;
  };

  // ---- Archivo (pasos 0 y 1) ----
  nodo('text', { x: 20, y: 34, style: estilo.texto }, svg, 'datos.csv · 300 MB');
  const entero = nodo('g', { 'data-hasta': 0 }, svg);
  entero.style.transition = 'opacity 450ms ease';
  nodo('rect', { x: 20, y: 50, width: 600, height: 54, rx: 4, style: estilo.bloque }, entero);
  nodo('text', { x: 320, y: 85, 'text-anchor': 'middle', style: estilo.textoBloque }, entero, 'un solo archivo');

  const BLOQUES = { B1: 128, B2: 128, B3: 44 };
  const partes = capa(1);
  let x = 20;
  for (const [b, mb] of Object.entries(BLOQUES)) {
    nodo('rect', { x, y: 50, width: mb * 2 - 4, height: 54, rx: 4, style: estilo.bloque }, partes);
    nodo('text', { x: x + mb - 2, y: 85, 'text-anchor': 'middle', style: estilo.textoBloque }, partes, b);
    nodo('text', { x: x + mb - 2, y: 128, 'text-anchor': 'middle', style: estilo.suave }, partes, `${mb} MB`);
    x += mb * 2;
  }
  nodo('text', { x: 20, y: 166, style: estilo.acento }, capa(2), '3 bloques × 3 copias = 9 copias · 900 MB en disco');

  // ---- NameNode ----
  nodo('rect', { x: 670, y: 14, width: 310, height: 222, rx: 6, style: estilo.caja }, svg);
  nodo('text', { x: 825, y: 48, 'text-anchor': 'middle', style: estilo.textoCaja }, svg, 'NameNode');
  nodo('rect', { x: 684, y: 62, width: 282, height: 160, rx: 4, style: 'fill:var(--fondo)' }, svg);
  const tabla = (lineas, g) => lineas.forEach((l, i) =>
    nodo('text', { x: 698, y: 94 + i * 36, style: estilo.mono }, g, l));
  const metaAntes = capa(3);
  metaAntes.dataset.hasta = 4;
  tabla(['datos.csv: B1 B2 B3', 'B1 → DN1 DN2 DN3', 'B2 → DN2 DN3 DN4', 'B3 → DN1 DN3 DN4'], metaAntes);
  const metaDespues = capa(5);
  tabla(['datos.csv: B1 B2 B3', 'B1 → DN1 DN2 DN4', 'B2 → DN2 DN4 DN1', 'B3 → DN1 DN4 DN2'], metaDespues);
  const metaVacia = nodo('g', { 'data-hasta': 2 }, svg);
  metaVacia.style.transition = 'opacity 450ms ease';
  nodo('text', { x: 825, y: 136, 'text-anchor': 'middle', style: estilo.suave }, metaVacia, 'solo guarda metadatos:');
  nodo('text', { x: 825, y: 162, 'text-anchor': 'middle', style: estilo.suave }, metaVacia, 'dónde está cada bloque');

  // ---- DataNodes ----
  const COPIAS = { // DataNode: bloques en el orden de sus ranuras
    1: [['B1', 2], ['B3', 2], ['B2', 5]],
    2: [['B1', 2], ['B2', 2], ['B3', 5]],
    3: [['B1', 2], ['B2', 2], ['B3', 2]],
    4: [['B2', 2], ['B3', 2], ['B1', 5]],
  };
  // Latidos (heartbeat) de cada DataNode al NameNode; el del DataNode 3 se corta cuando falla
  const latidos = capa(3);
  const latido3 = capa(3);
  latido3.dataset.hasta = 3;
  [1, 2, 3, 4].forEach((dn) => {
    nodo('line', { x1: 20 + (dn - 1) * 245 + 110, y1: 300, x2: 825, y2: 236,
      style: 'stroke:var(--regla);stroke-width:2.5;stroke-dasharray:8 7' }, dn === 3 ? latido3 : latidos);
  });
  [1, 2, 3, 4].forEach((dn) => {
    const x0 = 20 + (dn - 1) * 245;
    const g = nodo('g', { 'data-dn': dn }, svg);
    g.style.transition = 'opacity 450ms ease';
    nodo('rect', { x: x0, y: 300, width: 220, height: 245, rx: 6, style: estilo.marco }, g);
    nodo('rect', { x: x0, y: 300, width: 220, height: 44, rx: 6, style: estilo.caja }, g);
    nodo('text', { x: x0 + 110, y: 330, 'text-anchor': 'middle', style: estilo.textoCaja }, g, `DataNode ${dn}`);
    COPIAS[dn].forEach(([b, paso], ranura) => {
      const c = capa(paso);
      g.appendChild(c);
      const ancho = BLOQUES[b] * 1.25;
      nodo('rect', { x: x0 + 14, y: 362 + ranura * 60, width: ancho, height: 44, rx: 4,
        style: paso === 5 ? estilo.nuevo : estilo.bloque }, c);
      nodo('text', { x: x0 + 14 + ancho / 2, y: 391 + ranura * 60, 'text-anchor': 'middle', style: estilo.textoBloque }, c, b);
      if (paso === 5) nodo('text', { x: x0 + 14 + ancho + 10, y: 391 + ranura * 60, style: estilo.suave }, c, 'nueva');
    });
  });
  const falla = capa(4);
  const x3 = 20 + 2 * 245;
  nodo('line', { x1: x3 + 20, y1: 360, x2: x3 + 200, y2: 530, style: 'stroke:var(--acento);stroke-width:8' }, falla);
  nodo('line', { x1: x3 + 200, y1: 360, x2: x3 + 20, y2: 530, style: 'stroke:var(--acento);stroke-width:8' }, falla);
  nodo('text', { x: x3 + 110, y: 290, 'text-anchor': 'middle', style: estilo.acento }, falla, 'sin latido');

  function dibujar(paso) {
    svg.querySelectorAll('[data-desde], [data-hasta]').forEach((e) => {
      const desde = Number(e.dataset.desde || 0);
      const hasta = e.dataset.hasta === undefined ? Infinity : Number(e.dataset.hasta);
      e.style.opacity = paso >= desde && paso <= hasta ? 1 : 0;
    });
    const caida = svg.querySelector('[data-dn="3"]');
    caida.style.opacity = paso >= 4 ? 0.3 : 1;
  }

  diapositiva.addEventListener('paso', (e) => dibujar(e.detail.paso));
  dibujar(0);
})();
