/* Animación · Por qué escalar cambia quién es «el más parecido»
   Datos de ejemplos/distancias.py (verificados con python): Ana (25 años, 1000 $), Beto (60, 1050), Carla (27, 1400).
   Sin escalar, 1 año pesa lo mismo que 1 dólar: Ana–Beto = 61,0 y Ana–Carla = 400,0 (euclidiana).
   Con min-max (edad 18–80, ingreso 400–4000): Ana–Beto = 0,565 y Ana–Carla = 0,116.
   Panel izquierdo: unidades crudas con la MISMA escala en los dos ejes (1 año = 1 dólar), por eso la franja es angosta:
   la edad casi no cuenta. Panel derecho: cada atributo entre 0 y 1.
   Pasos: 1 los datos crudos · 2 círculo de radio 61 alrededor de Ana: Beto queda adentro · 3 se escalan los dos atributos
          4 círculo de radio 0,116: ahora Carla queda adentro · 5 conclusión.
   En modo lectura se dibuja el estado final (paso 5). */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const fig = document.getElementById('anim-escala');
  if (!fig) return;
  const diapositiva = fig.closest('.diapositiva');

  function nodo(etiqueta, atributos, padre, texto) {
    const e = document.createElementNS(NS, etiqueta);
    for (const k in atributos) e.setAttribute(k, atributos[k]);
    if (texto !== undefined) e.textContent = texto;
    if (padre) padre.appendChild(e);
    return e;
  }

  const C = { Ana: [25, 1000], Beto: [60, 1050], Carla: [27, 1400] };
  const MIN = [18, 400], MAX = [80, 4000];
  const esc = (v) => v.map((x, i) => (x - MIN[i]) / (MAX[i] - MIN[i]));
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const dCrudaB = dist(C.Ana, C.Beto), dCrudaC = dist(C.Ana, C.Carla);
  const dEscB = dist(esc(C.Ana), esc(C.Beto)), dEscC = dist(esc(C.Ana), esc(C.Carla));
  const f1 = (x) => x.toFixed(1).replace('.', ','), f3 = (x) => x.toFixed(3).replace('.', ',');

  const svg = nodo('svg', { viewBox: '0 0 1000 470', role: 'img',
    'aria-label': `Sin escalar, Beto está a ${f1(dCrudaB)} de Ana y Carla a ${f1(dCrudaC)}: gana Beto. Con min-max, Beto queda a ${f3(dEscB)} y Carla a ${f3(dEscC)}: gana Carla.` });
  svg.style.cssText = 'width:100%;height:auto;max-height:calc(var(--u) * 62);display:block;font-family:var(--f-texto)';
  fig.prepend(svg);

  const estilo = {
    marco: 'fill:var(--superficie);stroke:var(--regla);stroke-width:2',
    texto: 'fill:var(--tinta-suave);font-size:15px',
    titulo: 'fill:var(--tinta);font-size:18px;font-weight:800',
    ana: 'fill:var(--guinda);stroke:var(--fondo);stroke-width:2',
    otro: 'fill:var(--caja-diagrama);stroke:var(--fondo);stroke-width:2',
    nombre: 'fill:var(--tinta);font-size:16px;font-weight:700',
    circulo: 'fill:var(--dorado);fill-opacity:.15;stroke:var(--dorado);stroke-width:3',
    linea: 'stroke-width:2.5;stroke-dasharray:6 5',
    nota: 'fill:var(--tinta);font-size:20px;font-weight:700',
  };

  // ---- Panel crudo: edad 0–80 años (x) e ingreso 950–1450 $ (y), misma escala: 0,64 px por unidad ----
  const S = 0.64;
  const R = { x: 60, y: 50, edad: [0, 80], ingreso: [950, 1450] };
  const rx = (e) => R.x + (e - R.edad[0]) * S;
  const ry = (i) => R.y + (R.ingreso[1] - i) * S;
  const crudo = nodo('g', {}, svg);
  crudo.style.transition = 'opacity 400ms ease';
  nodo('text', { x: R.x - 10, y: 30, style: estilo.titulo }, crudo, 'Sin escalar');
  nodo('rect', { x: rx(0), y: ry(1450), width: 80 * S, height: 500 * S, style: estilo.marco }, crudo);
  nodo('text', { x: rx(40), y: ry(950) + 22, 'text-anchor': 'middle', style: estilo.texto }, crudo, 'edad 0–80');
  nodo('text', { x: rx(80) + 8, y: ry(1450) + 12, style: estilo.texto }, crudo, '1450 $');
  nodo('text', { x: rx(80) + 8, y: ry(950), style: estilo.texto }, crudo, '950 $');
  nodo('text', { x: rx(80) + 8, y: ry(1200), style: estilo.texto }, crudo, '1 año = 1 $');
  const circCrudo = nodo('circle', { cx: rx(25), cy: ry(1000), r: dCrudaB * S + 2, style: estilo.circulo }, crudo);
  const ptsCrudo = Object.entries(C).map(([n, [e, i]]) => {
    nodo('circle', { cx: rx(e), cy: ry(i), r: 7, style: n === 'Ana' ? estilo.ana : estilo.otro }, crudo);
    nodo('text', { x: rx(e) + (n === 'Beto' ? 10 : n === 'Ana' ? -12 : 10), y: ry(i) + (n === 'Ana' ? 20 : -8), 'text-anchor': n === 'Ana' ? 'end' : 'start', style: estilo.nombre }, crudo, n);
  });
  const textoCrudo = nodo('text', { x: rx(80) + 8, y: ry(1100), style: estilo.texto }, crudo, '');

  // ---- Panel escalado: cuadrado 0–1 × 0–1 (zoom a 0–0,7 en x y 0–0,35 en y, misma escala) ----
  const E = { x: 420, y: 70, s: 760 }; // px por unidad escalada
  const ex = (v) => E.x + v * E.s * 0.65;
  const ey = (v) => E.y + (0.35 - v) * E.s * 0.65;
  const escalado = nodo('g', {}, svg);
  escalado.style.transition = 'opacity 400ms ease';
  nodo('text', { x: E.x, y: 30, style: estilo.titulo }, escalado, 'Con min-max (cada atributo de 0 a 1)');
  nodo('rect', { x: ex(0), y: ey(0.35), width: ex(0.7) - ex(0), height: ey(0) - ey(0.35), style: estilo.marco }, escalado);
  [0, 0.2, 0.4, 0.6].forEach((t) => nodo('text', { x: ex(t), y: ey(0) + 20, 'text-anchor': 'middle', style: estilo.texto }, escalado, String(t).replace('.', ',')));
  [0, 0.1, 0.2, 0.3].forEach((t) => nodo('text', { x: ex(0) - 8, y: ey(t) + 5, 'text-anchor': 'end', style: estilo.texto }, escalado, String(t).replace('.', ',')));
  nodo('text', { x: ex(0.35), y: ey(0) + 42, 'text-anchor': 'middle', style: estilo.texto }, escalado, 'edad escalada');
  nodo('text', { x: ex(0.7) + 8, y: ey(0.33), style: estilo.texto }, escalado, 'ingreso');
  nodo('text', { x: ex(0.7) + 8, y: ey(0.33) + 18, style: estilo.texto }, escalado, 'escalado');
  const circEsc = nodo('circle', { cx: ex(esc(C.Ana)[0]), cy: ey(esc(C.Ana)[1]), r: dEscC * E.s * 0.65 + 2, style: estilo.circulo }, escalado);
  const lineas = nodo('g', {}, escalado);
  Object.entries(C).forEach(([n, v]) => {
    const [a, b] = esc(v);
    if (n !== 'Ana') {
      nodo('line', { x1: ex(esc(C.Ana)[0]), y1: ey(esc(C.Ana)[1]), x2: ex(a), y2: ey(b), style: estilo.linea + ';stroke:var(--tinta-suave)' }, lineas);
      nodo('text', { x: (ex(esc(C.Ana)[0]) + ex(a)) / 2 + 6, y: (ey(esc(C.Ana)[1]) + ey(b)) / 2 - 8, style: 'fill:var(--tinta);font-family:var(--f-codigo);font-size:15px;font-weight:700' }, lineas, f3(n === 'Beto' ? dEscB : dEscC));
    }
    nodo('circle', { cx: ex(a), cy: ey(b), r: 9, style: n === 'Ana' ? estilo.ana : estilo.otro }, escalado);
    nodo('text', { x: ex(a) + 12, y: ey(b) + (n === 'Ana' ? 22 : -10), style: estilo.nombre }, escalado, n);
  });

  const nota = nodo('text', { x: 20, y: 432, style: estilo.nota }, svg, '');
  const nota2 = nodo('text', { x: 20, y: 460, style: 'fill:var(--tinta-suave);font-size:17px' }, svg, '');
  const TEXTOS = [
    ['Avanza para comparar a Ana con Beto y con Carla.', ''],
    ['En unidades crudas, con 1 año = 1 dólar, la franja de edad es angosta.', 'Las diferencias de ingreso (cientos de dólares) dominan cualquier distancia.'],
    [`Ana–Beto = ${f1(dCrudaB)} y Ana–Carla = ${f1(dCrudaC)}: gana Beto, aunque le lleva 35 años.`, 'El círculo de radio 61 alrededor de Ana contiene a Beto y no a Carla.'],
    ['Min-max lleva cada atributo a 0–1 con sus rangos: edad 18–80, ingreso 400–4000 $.', 'Ahora 1 unidad de edad y 1 de ingreso pesan lo mismo.'],
    [`Ana–Beto = ${f3(dEscB)} y Ana–Carla = ${f3(dEscC)}: gana Carla.`, 'El círculo de radio 0,116 contiene a Carla y deja fuera a Beto.'],
    ['KNN, K-Means y cualquier método por distancias cambian de respuesta al escalar.', 'Por eso se escala antes de medir distancias (y el escalador se ajusta solo con datos de entrenamiento).'],
  ];

  function dibujar(paso) {
    const p = Math.max(0, Math.min(5, paso));
    crudo.style.opacity = p >= 1 ? 1 : 0.15;
    circCrudo.style.opacity = p >= 2 ? 1 : 0;
    textoCrudo.textContent = p >= 2 ? `radio ${f1(dCrudaB)}` : '';
    escalado.style.opacity = p >= 3 ? 1 : 0;
    circEsc.style.opacity = p >= 4 ? 1 : 0;
    lineas.style.opacity = p >= 4 ? 1 : 0;
    nota.textContent = TEXTOS[p][0];
    nota2.textContent = TEXTOS[p][1];
  }

  diapositiva.addEventListener('paso', (e) => dibujar(e.detail.paso));
  dibujar(0);
})();
