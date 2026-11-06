"""Genera clientes.csv: 312 clientes sintéticos de una cadena de tiendas, con problemas de calidad a propósito.
Uso: python generar-clientes.py
Problemas que trae (para practicar): 12 filas duplicadas, faltantes en edad, ingreso y nivel educativo,
ciudades escritas de varias formas, una edad imposible y fichas sin actualizar desde hace años."""
import random

import numpy as np
import pandas as pd

rng = np.random.default_rng(2026)
random.seed(2026)
N = 300

ciudades = rng.choice(["Quito", "Guayaquil", "Cuenca", "Loja"], size=N, p=[0.35, 0.35, 0.18, 0.12])
niveles = rng.choice(["básica", "bachillerato", "tercer nivel", "posgrado"], size=N, p=[0.15, 0.40, 0.35, 0.10])
edad = rng.integers(18, 76, size=N)
# El ingreso crece con el nivel educativo (relación plausible para practicar)
base = {"básica": 520, "bachillerato": 780, "tercer nivel": 1350, "posgrado": 2300}
ingreso = np.array([base[n] for n in niveles]) * rng.lognormal(0, 0.25, size=N)
compras_anio = rng.poisson(lam=6, size=N)
premium = rng.random(N) < 0.08          # binario asimétrico: casi todos son «no»
anio_ficha = rng.choice(np.arange(2016, 2027), size=N, p=[0.02] * 5 + [0.04, 0.06, 0.10, 0.15, 0.25, 0.30])

df = pd.DataFrame({
    "id_cliente": [f"C{1000 + i}" for i in range(N)],
    "ciudad": ciudades,
    "edad": edad.astype(float),
    "nivel_educativo": niveles,
    "ingreso_mensual": ingreso.round(2),
    "compras_anio": compras_anio,
    "premium": np.where(premium, "sí", "no"),
    "ficha_actualizada": [f"{a}-{rng.integers(1, 13):02d}-{rng.integers(1, 29):02d}" for a in anio_ficha],
})

# Ciudades escritas de varias formas (inconsistencia)
variantes = {"Quito": ["quito", "QUITO", " Quito "], "Guayaquil": ["guayaquil", "Gye"], "Cuenca": ["cuenca "], "Loja": ["LOJA"]}
for i in rng.choice(N, size=24, replace=False):
    df.loc[i, "ciudad"] = random.choice(variantes[df.loc[i, "ciudad"]])

# Faltantes (completitud)
df.loc[rng.choice(N, size=9, replace=False), "edad"] = np.nan
df.loc[rng.choice(N, size=18, replace=False), "ingreso_mensual"] = np.nan
df.loc[rng.choice(N, size=6, replace=False), "nivel_educativo"] = np.nan

# Una edad imposible (exactitud)
df.loc[57, "edad"] = 230

# Duplicados exactos (unicidad): 12 filas repetidas
duplicadas = df.sample(12, random_state=7)
df = pd.concat([df, duplicadas]).sample(frac=1, random_state=11).reset_index(drop=True)

df.to_csv("clientes.csv", index=False)
print("clientes.csv:", df.shape)
