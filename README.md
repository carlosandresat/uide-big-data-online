# Prácticas y Herramientas de Big Data

Trabajamos con datos de verdad en Python: exploración y calidad de datos, modelos de clasificación, regresión y *clustering*, procesos ETL y plataformas como Spark y MongoDB. Un mismo dataset te acompaña en los tres trabajos del curso.

**Sesiones en vivo:** jueves a las 19:00 por Microsoft Teams, del 26 de octubre al 13 de diciembre de 2026. Todas se graban.

**Sitio del curso:** abre `index.html` (o la página de GitHub Pages de este repositorio) para ver las presentaciones y copiar los tutores con un clic.

## Cómo aprovechar cada semana

1. **Antes de la sesión, repasa con el tutor** (20–30 minutos). Copia el `tutor.md` de la semana y pégalo completo en ChatGPT, Gemini, Claude o el asistente que uses. Te hará preguntas, no te dará respuestas, y al final te entregará un ticket de entrada con tu duda para la clase: envíalo en el formulario del curso hasta las 12:00 del día de la sesión (el enlace está en el anuncio de cada sesión).
2. **Ven a la sesión.** Empezamos en punto con una pista para el Aprendizaje Práctico de la semana, practicamos con casos reales y resolvemos dudas en vivo.
3. **¿No pudiste asistir?** Mira la grabación (los bloques se anuncian en voz alta para que puedas saltar entre ellos) y haz el ejercicio individual que aparece al cierre de la presentación.

## Sesiones

| Semana | Sesión |
|---|---|
| 1 | 29 oct |
| 2 | 5 nov |
| 3 | 12 nov |
| 4 | 19 nov |
| 5 | 26 nov |
| 6 | 3 dic |
| 7 | 10 dic |

La presentación y el tutor de cada semana se publican a medida que avanza el curso. Encuéntralos en el sitio del curso (`index.html` o la página de GitHub Pages de este repositorio), o en las carpetas `semana-01/`, `semana-02/`, etc.

## Evaluación (todo es individual)

| Componente | Qué es | Cubre | Puntos | Fecha límite | Guía |
|---|---|---|---|---|---|
| Aprendizaje Práctico (quiz) | Quiz semanal | Tema de la semana | — | Domingo de cada semana | — |
| Aprendizaje Autónomo 1 | Fundamentos de pandas: Series, DataFrames, CSV, `loc`/`iloc`; notebook y PDF | U1 | 12 | Domingo 15 nov | [Guía](entregas/aa1.md) |
| Aprendizaje Autónomo 2 | KNN y regresión lineal simple sobre el mismo dataset; notebook y PDF | U2–U3 | 12 | Domingo 6 dic | [Guía](entregas/aa2.md) |
| Evaluación en Contacto con el Docente | Consolidar los dos Aprendizajes Autónomos, cargarlos en MongoDB y consultarlos; informe de 3–5 páginas con ambos corregidos como anexos | U1–U4 | 34 | Domingo 13 dic | [Guía](entregas/ecd.md) |

Las guías en `entregas/` aclaran lo que pide cada trabajo y **cómo se califica**. Si el enunciado de la plataforma dice algo distinto (por ejemplo, «grupal»), vale lo que dice la guía.

## Temario por semana

| Sem. | Fecha | Unidad · Tema | Subtemas | Vence el domingo |
|---|---|---|---|---|
| 01 | 26 oct – 1 nov | U1 · T1 Ecosistemas Big Data (Hadoop, Spark, HDFS, Python, R); exploración de datasets con pandas; computación paralela | 1.1 Dask · 1.2 Modin · 1.3 Vaex y Polars (instalación, arquitectura, uso con grandes volúmenes) | Aprendizaje Práctico |
| 02 | 2 – 8 nov | U1 · T2 Comprensión y calidad de los datos: ISO 25012 | 2.1 Comprensión de datos, duplicados, faltantes · 2.2 Clasificación de problemas de calidad, impacto en modelos, ruido · 2.3 Preprocesamiento y métricas de proximidad y distancia | Aprendizaje Práctico |
| 03 | 9 – 15 nov | U2 · T1 Clasificación y árboles de decisión | 1.1 Aprendizaje supervisado y no supervisado · 1.2 Árboles de decisión, criterios de división, índice Gini · 1.3 KNN y SVM, comparación | Aprendizaje Práctico · **Aprendizaje Autónomo 1** |
| 04 | 16 – 22 nov | U2 · T2 Entrenamiento y validación de modelos | 2.1 Sobreajuste y cómo prevenirlo · 2.2 Validación cruzada K-Fold · 2.3 Selección y evaluación de modelos (clasificación de imágenes) | Aprendizaje Práctico |
| 05 | 23 – 29 nov | U3 · T1 Regresión y *clustering* | 1.1 Evaluación de modelos de regresión, regresión logística, series temporales y pronóstico · 1.2 K-Means, aglomerativo, DBSCAN y cómo elegir · 1.3 Casos: segmentación de clientes, clasificación de imágenes | Aprendizaje Práctico |
| 06 | 30 nov – 6 dic | U3 · T2 Detección de anomalías y ETL | 2.1 Métodos estadísticos (desviación estándar, distribución, percentiles) · 2.2 ETL: valores comunes, rangos, consistencia · 2.3 Transformación entre formatos, ETL para *data warehouse* | Aprendizaje Práctico · **Aprendizaje Autónomo 2** |
| 07 | 7 – 13 dic | U4 · T1 Plataformas de Big Data **+** T2 Sistemas complejos y automatización | 1.1 Hadoop y Spark, sistemas distribuidos · 1.2 Almacenamiento Big Data vs. RDBMS (grafos, documentales, clave-valor) · 1.3 Almacenamiento columnar y particionamiento · 2.1 Sistemas de recomendación · 2.2 Automatización de procesos · 2.3 Rol de TI: infraestructura, seguridad y gobierno de datos | Aprendizaje Práctico · **Evaluación en Contacto con el Docente** |

## Unidades: resumen y resultados de aprendizaje

**U1 · Python para Big Data y calidad de los datos.** Fundamentos y las 4V (volumen, velocidad, variedad, veracidad); Hadoop y Spark; herramientas Python para datos grandes. Calidad de datos: atributos, tipos de datasets y preprocesamiento.
- RA1: Analizar datasets utilizando herramientas de Python implementando estructuras de datos para el manejo de datos masivos.
- RA2: Aplicar métodos estadísticos básicos para el análisis de datos con énfasis en el cálculo de medidas de proximidad y correlación entre datos.

**U2 · Clasificación, entrenamiento y validación.** Supervisado vs. no supervisado; árboles de decisión, KNN y SVM; mejora y evaluación de modelos; validación cruzada y sobreajuste.
- RA1: Implementar algoritmos de árboles de decisión usando Spark comprendiendo los fundamentos de la clasificación en Big Data.
- RA2: Construir clasificadores robustos usando Spark ML.

**U3 · Regresión, clustering y ETL.** Regresión, series temporales y agrupamiento con sus métricas; detección de anomalías; estadística descriptiva; ETL y ELT; formatos optimizados; arquitectura de *data warehouse*.
- RA1: Implementar diferentes algoritmos de *clustering* y desarrollar modelos de regresión para predicción aplicados a casos de estudio reales.
- RA2: Diseñar y ejecutar procesos ETL completos transformando datos entre diferentes formatos y estructuras.

**U4 · Plataformas de Big Data y automatización.** Hadoop y Spark, sistemas distribuidos, NoSQL, almacenamiento columnar y particionamiento; sistemas de recomendación; automatización y visualización; rol de TI y gobierno de datos.
- RA1: Diseñar sistemas escalables de procesamiento de datos implementando soluciones de almacenamiento eficientes.
- RA2: Implementar flujos de trabajo automatizados para Big Data mediante el diseño de sistemas de recomendación automatizados.
