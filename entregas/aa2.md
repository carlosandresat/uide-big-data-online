# Aprendizaje Autónomo 2 · Aplicación de clasificación y regresión

**Prácticas y Herramientas de Big Data** · Vence el **domingo 6 de diciembre de 2026** · 12 puntos · **Individual** · Temas de las unidades 2 y 3

## En resumen

Sobre **el mismo dataset del Aprendizaje Autónomo 1**, entrenas dos modelos en un solo notebook:

- **Clasificación con KNN**: predecir tu variable categórica.
- **Regresión lineal simple**: predecir una variable numérica a partir de otra.

Al final respondes cuatro preguntas de reflexión. Guarda bien tus resultados: los vas a usar en la Evaluación en Contacto con el Docente.

## Aclaraciones sobre el enunciado de la plataforma

| La plataforma dice | Qué hacer |
|---|---|
| «Replicar los modelos desarrollados en base a los **anexos** incluidos en este documento» | **Esos anexos no existen en la plataforma.** No hace falta replicar nada: sigue el paso a paso de esta guía, que cubre lo que se pide. |
| «Evalúa el rendimiento del modelo» | Evalúa con **datos de prueba**, no con los mismos datos con que entrenaste (lo vemos en la semana 4). |
| «Si puedes, incluye matriz de confusión» | Inclúyela: se toma en cuenta al calificar. |

## Paso a paso

### Parte 1 · Clasificación con KNN

1. **Elige las variables**: la categórica como objetivo (`y`) y dos o más numéricas como predictoras (`X`). Trata los valores faltantes.
2. **Separa entrenamiento y prueba**: `train_test_split(X, y, test_size=0.25, random_state=42)`.
3. **Escala** con `MinMaxScaler`, ajustándolo **solo con los datos de entrenamiento** (`fit_transform` en entrenamiento, `transform` en prueba). Así el modelo no «ve» los datos de prueba.
4. **Entrena** `KNeighborsClassifier(n_neighbors=k)`. Prueba varios valores de `k` y quédate con uno, explicando por qué.
5. **Evalúa** en prueba: exactitud (`accuracy_score`) y matriz de confusión (`ConfusionMatrixDisplay`). Explica qué clases confunde el modelo.
6. **Grafica** la separación entre clases: un diagrama de dispersión de dos variables coloreado por clase (por ejemplo, `sns.scatterplot(..., hue=...)`).

### Parte 2 · Regresión lineal simple

1. **Elige dos variables numéricas**: una predictora (`X`) y una objetivo (`Y`). Justifica por qué podrían estar relacionadas.
2. **Entrena** `LinearRegression()`. `X` debe tener dos dimensiones: `df[["x"]]`, no `df["x"]`.
3. **Reporta**:
   - La ecuación `Y = pendiente · X + intercepto`, con `coef_` e `intercept_`.
   - El **R²** (`r2_score` o `.score`).
   - La **correlación** (`df[["x", "y"]].corr()`).
4. **Grafica** con `sns.regplot(x=..., y=..., data=df)` e interpreta: ¿la relación se ve lineal? ¿Qué significa tu R²?

### Reflexión

Responde las cuatro preguntas del enunciado **con tus propios resultados**: tus cifras, el `k` que elegiste, tu R².

## Qué entregar

Un `.zip` con:
- [ ] El `.ipynb` con todas las celdas ejecutadas, organizado por partes con títulos en Markdown.
- [ ] El PDF exportado desde el notebook.

## Cómo se califica

| Criterio | Excelente | Bueno | Insuficiente |
|---|---|---|---|
| **Implementación de modelos** (3.6 / 2.16 / 1.08) | KNN con `k` justificado, evaluado en prueba con exactitud y matriz de confusión; regresión con ecuación, R² y correlación. | Ambos modelos, pero falta la evaluación en prueba, la matriz o alguna métrica. | Falta un modelo o está mal aplicado. |
| **Preparación y limpieza** (2.4 / 1.44 / 0.72) | Variables justificadas, faltantes tratados y escalado ajustado solo con entrenamiento. | Preparación correcta pero sin justificar, o escala antes de separar. | Sin normalización, con faltantes sin tratar o variables inadecuadas. |
| **Visualización e interpretación** (2.4 / 1.44 / 0.72) | Dispersión por clase y `regplot` con ejes rotulados, cada uno con un párrafo de interpretación. | Gráficos sin interpretación, o poco legibles. | Faltan gráficos. |
| **Reflexión crítica** (2.4 / 1.44 / 0.72) | Las 4 respuestas usan sus propios resultados. | Respuestas correctas pero genéricas. | Faltan respuestas o no se relacionan con la práctica. |
| **Presentación del notebook** (1.2 / 0.72 / 0.36) | Ordenado por partes con Markdown, celdas ejecutadas, comentarios y PDF legible. | Organización aceptable con detalles por mejorar. | Desordenado, sin comentarios o sin ejecutar. |
