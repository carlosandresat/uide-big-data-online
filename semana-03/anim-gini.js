/* Animación · Cómo elige un árbol la mejor división (índice de Gini)
   12 clientes con dos variables (gasto mensual en dólares y visitas al mes) y la clase «compra / no compra».
   Gini de un nodo = 1 − Σ p_i². Gini ponderado de una división = Σ (n_hijo / n) · Gini_hijo.
   Valores verificados en Python y con scikit-learn (DecisionTreeClassifier, criterion="gini", max_depth=1),
   que elige visitas ≤ 2.5: la misma división que «visitas ≤ 2» con datos enteros.
     raíz: 7 compran, 5 no → 0.486
     gasto ≤ 30 → 0.375 · gasto ≤ 50 → 0.419 · visitas ≤ 4 → 0.361 · visitas ≤ 2 → 0.259 (la mejor)
   Pasos: 1 raíz · 2–5 cada división candidata · 6 se elige la de menor Gini ponderado.
   En modo lectura se dibuja el estado final (paso 6). */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const fig = document.getElementById('anim-gini');
  if (!fig) return;
  const diapositiva = fig.closest('.diapositiva');

  function nodo(etiqueta, atributos, padre, texto) {
    const e = document.createElementNS(NS, etiqueta);
    for (const k in atributos) e.setAttribute(k, atributos[k]);
    if (texto !== undefined) e.textContent = texto;
    if (padre) padre.appendChild(e);
    return e;
  }

  // gasto (USD), visitas, clase (1 = compra)
  const DATOS = [[10, 2, 0], [15, 6, 0], [20, 3, 0], [25, 8, 1], [35, 2, 0], [40, 7, 1], [45, 5, 1], [55, 1, 0], [60, 6, 1], [70, 4, 1], [75, 8, 1], [85, 3, 1]];
  const CANDIDATAS = [
    { nombre: 'gasto ≤ 30', eje: 0, umbral: 30 },
    { nombre: 'gasto ≤ 50', eje: 0, umbral: 50 },
    { nombre: 'visitas ≤ 4', eje: 1, umbral: 4 },
    { nombre: 'visitas ≤ 2', eje: 1, umbral: 2 },
  ];
  const gini = (g) => {
    if (g.length === 0) return 0;
    const p = g.filter((d) => d[2] === 1).length / g.length;
    return 1 - p * p - (1 - p) * (1 - p);
  };
  const cuenta = (g) => `${g.filter((d) => d[2] === 1).length} sí · ${g.filter((d) => d[2] === 0).length} no`;
  CANDIDATAS.forEach((c) => {
    c.izq = DATOS.filter((d) => d[c.eje] <= c.umbral);
    c.der = DATOS.filter((d) => d[c.eje] > c.umbral);
    c.ponderado = (c.izq.length * gini(c.izq) + c.der.length * gini(c.der)) / DATOS.length;
  });
  const mejor = CANDIDATAS.reduce((a, b) => (b.ponderado < a.ponderado ? b : a));
  const f3 = (x) => x.toFixed(3).replace('.', ',');

  const svg = nodo('svg', { viewBox: '0 0 1000 470', role: 'img',
    'aria-label': `Doce clientes en un plano de gasto y visitas. La raíz tiene Gini ${f3(gini(DATOS))}. Se prueban cuatro divisiones; la de menor Gini ponderado es ${mejor.nombre}, con ${f3(mejor.ponderado)}.` });
  svg.style.cssText = 'width:100%;height:auto;max-height:calc(var(--u) * 64);display:block;font-family:var(--f-texto);font-variant-ligatures:none';
  fig.prepend(svg);

  const estilo = {
    eje: 'stroke:var(--tinta-suave);stroke-width:2',
    rejilla: 'stroke:var(--regla);stroke-width:1',
    texto: 'fill:var(--tinta-suave);font-size:16px',
    titulo: 'fill:var(--tinta);font-size:18px;font-weight:700',
    si: 'fill:var(--guinda);stroke:var(--fondo);stroke-width:2',
    no: 'fill:var(--fondo);stroke:var(--caja-diagrama);stroke-width:3.5',
    corte: 'stroke:var(--acento);stroke-width:4;stroke-dasharray:10 6',
    zona: 'fill:var(--dorado);fill-opacity:.16',
    th: 'fill:var(--tinta-suave);font-size:15px;font-weight:700',
    td: 'fill:var(--tinta);font-family:var(--f-codigo);font-size:17px',
    tdMejor: 'fill:var(--acento);font-family:var(--f-codigo);font-size:17px;font-weight:700',
    fila: 'fill:var(--superficie)',
    filaMejor: 'fill:var(--superficie);stroke:var(--acento);stroke-width:3',
  };

  // ---- Plano: gasto 0–100 (x), visitas 0–9 (y) ----
  const P = { x: 60, y: 30, w: 400, h: 360 };
  const px = (g) => P.x + (g / 100) * P.w;
  const py = (v) => P.y + P.h - (v / 9) * P.h;
  for (let g = 0; g <= 100; g += 20) {
    nodo('line', { x1: px(g), y1: P.y, x2: px(g), y2: P.y + P.h, style: estilo.rejilla }, svg);
    nodo('text', { x: px(g), y: P.y + P.h + 22, 'text-anchor': 'middle', style: estilo.texto }, svg, String(g));
  }
  for (let v = 0; v <= 9; v += 3) {
    nodo('line', { x1: P.x, y1: py(v), x2: P.x + P.w, y2: py(v), style: estilo.rejilla }, svg);
    nodo('text', { x: P.x - 10, y: py(v) + 5, 'text-anchor': 'end', style: estilo.texto }, svg, String(v));
  }
  nodo('line', { x1: P.x, y1: P.y + P.h, x2: P.x + P.w, y2: P.y + P.h, style: estilo.eje }, svg);
  nodo('line', { x1: P.x, y1: P.y, x2: P.x, y2: P.y + P.h, style: estilo.eje }, svg);
  nodo('text', { x: P.x + P.w / 2, y: P.y + P.h + 46, 'text-anchor': 'middle', style: estilo.texto }, svg, 'gasto mensual (USD)');
  nodo('text', { x: 18, y: P.y + P.h / 2, 'text-anchor': 'middle', transform: `rotate(-90 18 ${P.y + P.h / 2})`, style: estilo.texto }, svg, 'visitas al mes');

  const zona = nodo('rect', { style: estilo.zona }, svg);
  const corte = nodo('line', { style: estilo.corte }, svg);
  DATOS.forEach(([g, v, c]) => {
    if (c === 1) nodo('circle', { cx: px(g), cy: py(v), r: 11, style: estilo.si }, svg);
    else nodo('circle', { cx: px(g), cy: py(v), r: 10, style: estilo.no }, svg);
  });
  // Leyenda
  nodo('circle', { cx: P.x + 12, cy: 14, r: 8, style: estilo.si }, svg);
  nodo('text', { x: P.x + 26, y: 19, style: estilo.texto }, svg, 'compra');
  nodo('circle', { cx: P.x + 112, cy: 14, r: 7, style: estilo.no }, svg);
  nodo('text', { x: P.x + 126, y: 19, style: estilo.texto }, svg, 'no compra');

  // ---- Tabla de candidatas ----
  const T = { x: 500, y: 40 };
  const raiz = nodo('text', { x: T.x, y: T.y, style: estilo.titulo }, svg, '');
  const COL = [0, 150, 280, 410];
  ['división', 'lado ≤', 'lado >', 'Gini ponderado'].forEach((h, i) => nodo('text', { x: T.x + COL[i], y: T.y + 40, style: estilo.th }, svg, h));
  const filas = CANDIDATAS.map((c, i) => {
    const y = T.y + 56 + i * 64;
    const g = nodo('g', {}, svg);
    g.style.transition = 'opacity 400ms ease';
    const fondo = nodo('rect', { x: T.x - 8, y, width: 500, height: 56, rx: 6, style: estilo.fila }, g);
    const celdas = [
      [c.nombre],
      [cuenta(c.izq), `Gini ${f3(gini(c.izq))}`],
      [cuenta(c.der), `Gini ${f3(gini(c.der))}`],
      [f3(c.ponderado)],
    ].map((lineas, k) => lineas.map((l, j) => nodo('text', { x: T.x + COL[k], y: y + (lineas.length === 1 ? 34 : 24 + j * 22), style: estilo.td }, g, l)));
    return { g, fondo, celdas, c };
  });
  const conclusion = nodo('text', { x: T.x, y: T.y + 56 + 4 * 64 + 34, style: 'fill:var(--tinta);font-size:18px;font-weight:700' }, svg, '');
  const conclusion2 = nodo('text', { x: T.x, y: T.y + 56 + 4 * 64 + 60, style: 'fill:var(--tinta-suave);font-size:16px' }, svg, '');

  function marcarCorte(c) {
    if (!c) { corte.style.opacity = 0; zona.style.opacity = 0; return; }
    corte.style.opacity = 1; zona.style.opacity = 1;
    if (c.eje === 0) {
      const x = px(c.umbral + 2.5);
      corte.setAttribute('x1', x); corte.setAttribute('x2', x); corte.setAttribute('y1', P.y); corte.setAttribute('y2', P.y + P.h);
      zona.setAttribute('x', P.x); zona.setAttribute('y', P.y); zona.setAttribute('width', x - P.x); zona.setAttribute('height', P.h);
    } else {
      const y = py(c.umbral + 0.5);
      corte.setAttribute('x1', P.x); corte.setAttribute('x2', P.x + P.w); corte.setAttribute('y1', y); corte.setAttribute('y2', y);
      zona.setAttribute('x', P.x); zona.setAttribute('y', y); zona.setAttribute('width', P.w); zona.setAttribute('height', P.y + P.h - y);
    }
  }

  function dibujar(paso) {
    raiz.textContent = paso >= 1 ? `Raíz: ${cuenta(DATOS)} → Gini ${f3(gini(DATOS))}` : '12 clientes. Avanza para probar divisiones.';
    filas.forEach((f, i) => {
      f.g.style.opacity = paso >= i + 2 ? 1 : 0;
      const esMejor = paso >= 6 && f.c === mejor;
      f.fondo.setAttribute('style', esMejor ? estilo.filaMejor : estilo.fila);
      f.celdas[3][0].setAttribute('style', esMejor ? estilo.tdMejor : estilo.td);
    });
    const actual = paso >= 6 ? mejor : (paso >= 2 && paso <= 5 ? CANDIDATAS[paso - 2] : null);
    marcarCorte(actual);
    conclusion.textContent = paso >= 6 ? `Gana ${mejor.nombre}: el menor Gini ponderado (${f3(mejor.ponderado)}).` : '';
    conclusion2.textContent = paso >= 6 ? 'scikit-learn prueba todos los cortes posibles y elige este mismo.' : '';
  }

  diapositiva.addEventListener('paso', (e) => dibujar(e.detail.paso));
  dibujar(0);
})();
