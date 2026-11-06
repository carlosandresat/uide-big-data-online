"""Clínica · Diagnóstico de calidad de tu dataset.
Reemplaza cada ___ y ejecuta. En Colab, sube tu CSV y pega este código en una celda.
Si todavía no tienes dataset, usa clientes.csv (se crea con: python generar-clientes.py)."""
import sys

import pandas as pd

sys.stdout.reconfigure(encoding="utf-8")  # para ver tildes en la consola de Windows

ARCHIVO = "clientes.csv"                 # cambia por tu CSV
df = pd.read_csv(ARCHIVO)

# 1. Unicidad: ¿hay filas repetidas?
print("Filas duplicadas:", df.___().sum())

# 2. Completitud: faltantes por columna, en cantidad y en porcentaje
faltantes = df.isnull().sum()
print(pd.DataFrame({"faltantes": faltantes, "%": (faltantes / len(df) * 100).round(1)}))

# 3. Consistencia: ¿la misma categoría escrita de varias formas?
CATEGORICA = "___"
print(df[CATEGORICA].___())

# 4. Exactitud: ¿valores imposibles? Mira el mínimo y el máximo de cada numérica
print(df.describe().loc[["min", "max"]])

# 5. Tipos de atributo: completa a mano, para cada columna:
#    nominal, ordinal, binario (simétrico o asimétrico), discreto o continuo;
#    y si es numérica, ¿de intervalo o de razón? (¿tiene un cero absoluto?)
TIPOS = {
    "___": "___",
}

# 6. Para cada problema, decide: ¿borrar o imputar? ¿Qué información pierdes en cada caso?
#    Prueba tu decisión y compara la desviación estándar antes y después.
NUMERICA = "___"
antes = df[NUMERICA].std()
imputada = df[NUMERICA].fillna(df[NUMERICA].___())
print(f"Desviación de {NUMERICA}: antes {antes:.2f} · después de imputar {imputada.std():.2f}")
