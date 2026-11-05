# Aprendizaje Autónomo 1 · Fundamentos de Pandas

**Prácticas y Herramientas de Big Data** · Vence el **domingo 15 de noviembre de 2026** · 12 puntos · **Individual** · Temas de la unidad 1

## En resumen

Un notebook (Jupyter o Google Colab) donde practicas lo básico de pandas: Series, DataFrames, carga de un CSV, exploración, selección y filtrado con `.loc` e `.iloc`. Al final respondes cinco preguntas.

## Lo más importante: elige bien tu dataset

**El dataset que uses aquí te acompaña en los tres trabajos del curso**: en el Aprendizaje Autónomo 2 entrenarás con él un modelo KNN y una regresión lineal, y en la Evaluación en Contacto con el Docente lo cargarás en MongoDB. Elige uno que tenga:

- **Al menos una variable categórica** con pocas clases (por ejemplo, «tipo de cliente», «especie», «aprobado o reprobado»): se usará para clasificar con KNN.
- **Al menos dos variables numéricas que probablemente estén relacionadas** (por ejemplo, «horas de estudio» y «nota»): se usarán para la regresión.
- Un tamaño manejable en Colab: de cientos a decenas de miles de filas.

Fuentes de datasets públicos: Kaggle, el repositorio de UCI o los datos abiertos del Ecuador.

## Aclaraciones sobre el enunciado de la plataforma

| La plataforma dice | Qué hacer |
|---|---|
| «Descarga un archivo .csv de ejemplo» | Sirve cualquier CSV, pero elige pensando en los tres trabajos (ver arriba). |
| La exploración del CSV menciona `.head()`, `.info()` y `.shape` | Agrega también **`.describe()`**: se toma en cuenta al calificar. |

## Paso a paso

1. **Entorno**: importa `pandas as pd` y `numpy as np`.
2. **Series**: crea una con etiquetas propias y muestra `type()`, `.index`, `.values` y `.dtype`.
3. **DataFrames**: convierte la Series en DataFrame y crea otro desde un diccionario de listas o un *array* de NumPy.
4. **CSV**: cárgalo con `pd.read_csv()` y explóralo con `.head()`, `.info()`, `.shape` y `.describe()`. Escribe un párrafo que describa tu dataset: qué representa, filas, columnas, tipos y valores faltantes.
5. **Selección**:
   - Una columna como Series (`df["col"]`) y como DataFrame (`df[["col"]]`).
   - Varias columnas.
   - Filtros con condiciones, al menos uno combinado (`&` o `|`), usando `.loc`.
6. **`.iloc`**: selección por posición, con *slicing* de filas y columnas.
7. **Preguntas**: respóndelas usando **ejemplos de tu propio dataset**, no definiciones copiadas.
8. **Revisa que todo corre**: *Reiniciar y ejecutar todo* sin errores.

## Qué entregar

Un `.zip` con:
- [ ] El `.ipynb` con todas las celdas ejecutadas.
- [ ] Un PDF con el código comentado, capturas de cada paso y las 5 respuestas.

## Cómo se califica

| Criterio | Excelente | Bueno | Insuficiente |
|---|---|---|---|
| **Configuración del entorno** (1.5 / 0.9 / 0.45) | El notebook corre de principio a fin con las importaciones funcionando. | Corre, pero hay celdas sin ejecutar o errores menores. | No ejecuta. |
| **Series y DataFrames** (3 / 1.8 / 0.9) | Series con etiquetas propias y sus atributos; DataFrame desde la Series y otro desde diccionario o *array*. | Falta una forma de creación o algún atributo. | Estructuras incorrectas o ausentes. |
| **Carga y exploración del CSV** (2.5 / 1.5 / 0.75) | `read_csv`, `.head()`, `.info()`, `.shape` y `.describe()`, más un párrafo que describe el dataset. | Carga, pero falta exploración o interpretación. | No carga el archivo. |
| **Selección y filtrado** (3 / 1.8 / 0.9) | Columna como Series y DataFrame, varias columnas, filtro combinado con `.loc` e `.iloc` con *slicing*. | Falta alguna variante o hay errores en las condiciones. | Selecciones incorrectas. |
| **Documento y respuestas** (2 / 1.2 / 0.6) | PDF con código comentado, capturas y las 5 respuestas con ejemplos de su dataset. | Respuestas genéricas o faltan capturas. | Faltan respuestas o el documento está incompleto. |
