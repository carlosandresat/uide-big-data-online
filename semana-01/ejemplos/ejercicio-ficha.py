"""Clínica · La ficha de tu dataset.
Reemplaza cada ___ y ejecuta. En Colab, sube tu CSV y pega este código en una celda.
Si todavía no tienes dataset, genera uno pequeño con: python generar-ventas.py 50000"""
import os

import pandas as pd

ARCHIVO = "ventas.csv"                  # cambia por tu CSV

# 1. Carga y forma
df = pd.read_csv(ARCHIVO)
print("Filas y columnas:", df.shape)
print(df.head())

# 2. Tipos y faltantes
df.info()
print(df.isnull().sum())

# 3. Resumen de las columnas numéricas
print(df.describe())

# 4. Tu variable categórica: ¿cuántas clases tiene y cuántas filas hay en cada una?
CATEGORICA = "categoria"
print(df[CATEGORICA].value_counts())

# 5. Dos numéricas que podrían estar relacionadas: ¿qué tan fuerte es la relación?
X, Y = "cantidad", "precio_unitario"
print(df[[X, Y]].corr())

# 6. ¿Cuánto ocupa en memoria frente al archivo?
en_disco = os.path.getsize(ARCHIVO) / 1e6
en_memoria = df.memory_usage(deep=True).sum() / 1e6
print(f"Disco: {en_disco:.1f} MB · Memoria: {en_memoria:.1f} MB · {en_memoria / en_disco:.1f} veces")
