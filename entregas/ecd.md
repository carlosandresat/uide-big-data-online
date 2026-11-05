# Evaluación en Contacto con el Docente · Integración de análisis predictivo en una base de datos NoSQL

**Prácticas y Herramientas de Big Data** · Vence el **domingo 13 de diciembre de 2026** · 34 puntos · **Individual** · Integra todo el curso

## En resumen

Juntas tus dos trabajos anteriores en un solo DataFrame (datos originales y predicciones), lo cargas en **MongoDB**, haces consultas y escribes un informe breve. Como anexos van el Aprendizaje Autónomo 1 y el 2 **corregidos** con la retroalimentación recibida.

MongoDB se ve en la semana 7, pero en la sesión de la semana 6 haremos un arranque técnico (conectarte e insertar datos) para que empieces antes.

## Aclaraciones sobre el enunciado de la plataforma

| La plataforma dice | Qué hacer |
|---|---|
| `MongoClient("mongodb://localhost:27017")` | Esa dirección solo funciona si MongoDB está instalado **en tu computadora** y usas Jupyter local. En **Colab** usa un *cluster* gratuito de **MongoDB Atlas** y su cadena de conexión. Cualquiera de las dos opciones vale. |
| (no lo dice) | **Nunca pongas tu contraseña en el notebook ni en el PDF.** Léela con `getpass()` o desde una variable de entorno. |
| «Resultados del modelo de regresión (valores predichos, R², error, etc.)» | Por fila guarda el **valor predicho** y el **error** (residuo = real − predicho). El R² es una métrica de todo el modelo: guárdalo aparte o explica por qué lo repites en cada fila. |
| `"prediccion_KNN": "positivo"` | Es solo un ejemplo: filtra por una clase **de tu propio dataset**. |
| La rúbrica pide referencias APA, el enunciado no | Inclúyelas en APA 7: como mínimo, la documentación de pandas, scikit-learn y pymongo o MongoDB. |
| «Anexos corregidos» | Corrige con la retroalimentación recibida. En la sesión de la semana 7 repasamos los errores frecuentes del Aprendizaje Autónomo 2. |

## Paso a paso

1. **Consolida** en `df_final`:
   - Tus variables originales.
   - La predicción de KNN de cada fila.
   - El valor predicho y el residuo de la regresión.
   
   Usa nombres claros (`prediccion_knn`, `prediccion_regresion`, `residuo`) y comprueba que `df_final.isnull().sum()` dé cero.
2. **Convierte** a registros: `registros = df_final.to_dict(orient="records")`. Si `insert_many` falla con tipos de NumPy, convierte a tipos nativos de Python (por ejemplo, con `df_final.astype(object)` o pasando por JSON).
3. **Conéctate e inserta** con `pymongo`. Antes de insertar, vacía la colección para no duplicar datos si vuelves a ejecutar. Comprueba que `count_documents({})` coincide con el número de filas.
4. **Consulta** (al menos 3): el total de registros, un filtro por una clase predicha y un filtro por umbral de error (`{"residuo": {"$gt": ...}}`). Muestra cada resultado y explica para qué serviría.
5. **Responde** las cinco preguntas de reflexión refiriéndote a tu propio trabajo.
6. **Escribe el informe** (3–5 páginas sin anexos): introducción, desarrollo técnico, resultados (capturas de código y consultas), reflexión y referencias.

## Qué entregar

- [ ] El `.ipynb` con el desarrollo completo.
- [ ] El informe en PDF.
- [ ] Anexos: Aprendizaje Autónomo 1 y 2 corregidos.
- [ ] El `.json` con el dataset insertado (opcional).

## Cómo se califica

| Criterio | Excelente | Bueno | Insuficiente |
|---|---|---|---|
| **Preparación y consolidación** (6.8 / 3.8 / 1.5) | Un solo DataFrame con originales, predicción KNN, predicción y residuo de regresión; métricas globales documentadas; nombres claros; sin nulos. | Falta alguna columna o métrica, o nombres poco claros. | No consolida, o quedan nulos o variables clave fuera. |
| **Carga en MongoDB** (5.3 / 3.1 / 1.2) | Conexión sin exponer credenciales; inserción sin errores; el conteo coincide con las filas (sin duplicados). | Carga con duplicados o estructura inadecuada. | No conecta o no inserta. |
| **Consultas e interpretación** (5.3 / 3.1 / 1.2) | Al menos 3 consultas con su resultado y su utilidad explicada. | Menos de 3 consultas, o sin interpretación. | Sin consultas o incorrectas. |
| **Calidad del código** (3.4 / 2.1 / 1) | Corre de principio a fin, organizado por partes, con funciones y comentarios útiles. | Funciona, pero con pocos comentarios o algo desordenado. | Errores de ejecución o desorden. |
| **Reflexión crítica** (6.8 / 3.8 / 2) | Responde las 5 preguntas refiriéndose a su propio trabajo y resultados. | Responde al menos 3, o de forma genérica. | Faltan respuestas o no se relacionan con la práctica. |
| **Presentación del notebook e informe** (3.4 / 1.8 / 0.9) | PDF de 3–5 páginas con la estructura pedida y capturas; notebook con explicaciones; buena redacción. | Estructura incompleta o faltan explicaciones. | Notebook o informe incompletos. |
| **Referencias APA y entrega completa** (3 / 2 / 1) | Todos los archivos (notebook, PDF y anexos) y referencias APA 7 correctas. | Falta un archivo menor o el formato APA tiene errores. | Faltan los anexos o no hay referencias. |
