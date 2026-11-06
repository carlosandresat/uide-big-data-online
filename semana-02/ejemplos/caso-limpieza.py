"""Caso en vivo · La limpieza que propuso la IA, paso a paso.
Le pedimos: «Limpia clientes.csv para analizarlo: duplicados, faltantes y formatos».
Este script ejecuta su propuesta y, después de cada paso, mide qué cambió:
filas, faltantes, ciudades distintas y la dispersión del ingreso.
Uso: python caso-limpieza.py   (antes: python generar-clientes.py)"""
import sys

import pandas as pd

sys.stdout.reconfigure(encoding="utf-8")


def reporte(paso, df):
    print(f"{paso:<34} filas={len(df):>3}  faltantes={int(df.isnull().sum().sum()):>2}  "
          f"ciudades={df['ciudad'].nunique():>2}  desv. ingreso={df['ingreso_mensual'].std():7.1f}")


df = pd.read_csv("clientes.csv")
reporte("0. Original", df)

# --- Propuesta de la IA ---
df = df.drop_duplicates()                                         # paso 1
reporte("1. drop_duplicates()", df)

df["ciudad"] = df["ciudad"].str.strip().str.title()               # paso 2
reporte("2. ciudad: strip + title", df)

df["edad"] = df["edad"].fillna(df["edad"].median())               # paso 3
reporte("3. edad: imputar mediana", df)

df["ingreso_mensual"] = df["ingreso_mensual"].fillna(df["ingreso_mensual"].mean())  # paso 4
reporte("4. ingreso: imputar media", df)

df = df.dropna()                                                   # paso 5
reporte("5. dropna()", df)
# --- Fin de la propuesta ---

print("\n¿Qué quedó sin resolver?")
print("Ciudades:", sorted(df["ciudad"].unique()))
print("Edad máxima:", df["edad"].max())
print("Fichas sin actualizar desde antes de 2021:", int((df["ficha_actualizada"] < "2021").sum()))
