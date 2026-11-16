/* Animación · Validación cruzada K-Fold (K = 5)
   Datos: iris (150 muestras). Modelo: MinMaxScaler + KNN con k = 5, dentro de un pipeline.
   KFold(n_splits=5, shuffle=True, random_state=0): cada pliegue tiene 30 muestras; se entrena con 120 y se prueba con 30.
   Exactitud por pliegue (verificada con scikit-learn, cross_val_score):
     1,000 · 0,867 · 1,000 · 1,000 · 0,933 → media 0,960 · desviación estándar 0,053
   Una sola división entrenamiento/prueba podría haber dado 0,867 o 1,000 según la suerte: K-Fold promedia las cinco.
   Pasos: 1 se baraja y se divide en 5 pliegues · 2–6 cada pliegue es la prueba una vez · 7 promedio y dispersión.
   En modo lectura se dibuja el estado final (paso 7). */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const fig = document.getElementById('anim-kfold');
  if (!fig) return;
  const diapositiva = fig.closest('.diapositiva');

  function nodo(etiqueta, atributos, padre, texto) {
    const e = document.createElementNS(NS, etiqueta);
    for (const k in atributos) e.setAttribute(k, atributos[k]);
    if (texto !== undefined) e.textContent = texto;
    if (padre) padre.appendChild(e);
    return e;
  }

  const EXACTITUD = [1.0, 0.867, 1.0, 1.0, 0.933];
  const media = EXACTITUD.reduce((a, b) => a + b, 0) / EXACTITUD.length;
  const f3 = (x) => x.toFixed(3).replace('.', ',');

  const svg = nodo('svg', { viewBox: '0 0 1000 470', role: 'img',
    'aria-label': 'Los 150 datos se dividen en 5 pliegues de 30. En cada ronda un pliegue distinto es la prueba y los otros cuatro entrenan. Las exactitudes son 1,000, 0,867, 1,000, 1,000 y 0,933, con media 0,960.' });
  svg.style.cssText = 'width:100%;height:auto;max-height:calc(var(--u) * 62);display:block;font-family:var(--f-texto)';
  fig.prepend(svg);

  const estilo = {
    entrena: 'fill:var(--caja-diagrama)',
    prueba: 'fill:var(--guinda);stroke:var(--dorado);stroke-width:4',
    vacio: 'fill:var(--superficie);stroke:var(--regla);stroke-width:2',
    textoCaja: 'fill:var(--texto-caja-diagrama);font-size:16px;font-weight:700',
    textoPrueba: 'fill:#FFFFFF;font-size:16px;font-weight:800',
    rotulo: 'fill:var(--tinta-suave);font-size:17px',
    mono: 'fill:var(--tinta);font-family:var(--f-codigo);font-size:20px;font-weight:700',
    barra: 'fill:var(--acento)',
    nota: 'fill:var(--tinta);font-size:20px;font-weight:700',
  };

  const X0 = 150, ANCHO = 108, ESP = 6, Y0 = 70, ALTO = 46, DY = 62;
  nodo('text', { x: 20, y: 40, style: estilo.rotulo }, svg, '150 muestras barajadas → 5 pliegues de 30');
  ['ronda', 'exactitud'].forEach((t, i) => nodo('text', { x: i === 0 ? 20 : 760, y: Y0 - 12 + 0, style: estilo.rotulo }, svg, ''));

  const filas = [];
  for (let r = 0; r < 5; r++) {
    const y = Y0 + r * DY;
    const g = nodo('g', {}, svg);
    g.style.transition = 'opacity 400ms ease';
    nodo('text', { x: 20, y: y + 30, style: estilo.rotulo }, g, `ronda ${r + 1}`);
    const celdas = [];
    for (let p = 0; p < 5; p++) {
      const x = X0 + p * (ANCHO + ESP);
      const rect = nodo('rect', { x, y, width: ANCHO, height: ALTO, rx: 6, style: estilo.vacio }, g);
      const t = nodo('text', { x: x + ANCHO / 2, y: y + 29, 'text-anchor': 'middle', style: estilo.textoCaja }, g, '');
      celdas.push({ rect, t });
    }
    // barra de exactitud: escala 0,8–1,0 en 150 px
    const xb = X0 + 5 * (ANCHO + ESP) + 20;
    const barra = nodo('rect', { x: xb, y: y + 10, height: 26, rx: 4, width: 0, style: estilo.barra }, g);
    const valor = nodo('text', { x: xb + 160, y: y + 30, style: estilo.mono }, g, '');
    filas.push({ g, celdas, barra, valor });
  }
  const xb = X0 + 5 * (ANCHO + ESP) + 20;
  nodo('text', { x: xb, y: Y0 - 12, style: estilo.rotulo }, svg, 'exactitud (escala 0,80–1,00)');
  const escala = (a) => ((a - 0.8) / 0.2) * 150;
  const lineaMedia = nodo('line', { y1: Y0 - 4, y2: Y0 + 5 * DY - 10, style: 'stroke:var(--dorado);stroke-width:3;stroke-dasharray:6 5' }, svg);
  const nota = nodo('text', { x: 20, y: Y0 + 5 * DY + 36, style: estilo.nota }, svg, '');
  const nota2 = nodo('text', { x: 20, y: Y0 + 5 * DY + 66, style: 'fill:var(--tinta-suave);font-size:18px' }, svg, '');

  function dibujar(paso) {
    const p = Math.max(0, Math.min(7, paso));
    filas.forEach((f, r) => {
      // La ronda r aparece en el paso r + 2; en el paso 1 solo se ve la división (fila 1 sin colores)
      const visible = p >= 1 && (r === 0 || p >= r + 2);
      f.g.style.opacity = visible ? 1 : 0;
      const activa = p >= r + 2;
      f.celdas.forEach((c, k) => {
        if (!activa) {
          c.rect.setAttribute('style', estilo.vacio);
          c.t.textContent = `pliegue ${k + 1}`;
          c.t.setAttribute('style', 'fill:var(--tinta);font-size:16px;font-weight:700');
        } else if (k === r) {
          c.rect.setAttribute('style', estilo.prueba);
          c.t.textContent = 'prueba · 30';
          c.t.setAttribute('style', estilo.textoPrueba);
        } else {
          c.rect.setAttribute('style', estilo.entrena);
          c.t.textContent = 'entrena';
          c.t.setAttribute('style', estilo.textoCaja);
        }
      });
      f.barra.setAttribute('width', activa ? escala(EXACTITUD[r]) : 0);
      f.valor.textContent = activa ? f3(EXACTITUD[r]) : '';
    });
    const xm = xb + escala(media);
    lineaMedia.setAttribute('x1', xm); lineaMedia.setAttribute('x2', xm);
    lineaMedia.style.opacity = p >= 7 ? 1 : 0;
    const TEXTOS = {
      0: ['Avanza para dividir los datos.', ''],
      1: ['Se barajan los 150 datos y se reparten en 5 pliegues de 30.', 'Cada muestra cae en un solo pliegue.'],
      7: [`Media ${f3(media)} · desviación estándar 0,053.`, 'Cada muestra fue prueba exactamente una vez. Una sola división pudo dar 0,867 o 1,000 por suerte.'],
    };
    const t = TEXTOS[p] || [`Ronda ${p - 1}: el pliegue ${p - 1} es la prueba; los otros 4 (120 muestras) entrenan.`, 'El escalado se ajusta solo con los datos de entrenamiento (por eso va dentro del pipeline).'];
    nota.textContent = t[0];
    nota2.textContent = t[1];
  }

  diapositiva.addEventListener('paso', (e) => dibujar(e.detail.paso));
  dibujar(0);
})();
