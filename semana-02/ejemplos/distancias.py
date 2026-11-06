"""Distancias con y sin escalar, y similitud entre atributos binarios asimétricos.
Uso: python distancias.py"""
import sys

import numpy as np

sys.stdout.reconfigure(encoding="utf-8")

# Tres clientes: (edad en años, ingreso mensual en dólares)
clientes = {"Ana": np.array([25, 1000]), "Beto": np.array([60, 1050]), "Carla": np.array([27, 1400])}
a = clientes["Ana"]


def euclidiana(x, y):
    return float(np.sqrt(((x - y) ** 2).sum()))


def manhattan(x, y):
    return float(np.abs(x - y).sum())


print("Sin escalar (años y dólares mezclados):")
for nombre in ("Beto", "Carla"):
    b = clientes[nombre]
    print(f"  Ana–{nombre}: euclidiana = {euclidiana(a, b):6.1f}   manhattan = {manhattan(a, b):6.1f}")

# Min-max con rangos de referencia del negocio: edad 18–80, ingreso 400–4000
minimos, maximos = np.array([18, 400]), np.array([80, 4000])
escalar = lambda x: (x - minimos) / (maximos - minimos)
print("\nCon min-max (cada atributo entre 0 y 1):")
for nombre in ("Beto", "Carla"):
    b = clientes[nombre]
    print(f"  Ana–{nombre}: euclidiana = {euclidiana(escalar(a), escalar(b)):.3f}")

# Binarios asimétricos: compró (1) o no (0) cada uno de 10 productos
ana = np.array([1, 0, 0, 0, 0, 0, 0, 0, 1, 0])
beto = np.array([0, 1, 0, 0, 0, 0, 0, 0, 0, 1])
m11 = int(((ana == 1) & (beto == 1)).sum())
m00 = int(((ana == 0) & (beto == 0)).sum())
distintos = int((ana != beto).sum())
smc = (m11 + m00) / len(ana)               # coincidencia simple: cuenta los 0-0
jaccard = m11 / (m11 + distintos)          # Jaccard: ignora los 0-0
print(f"\nCompras: coinciden en 1-1 = {m11}, en 0-0 = {m00}, distintos = {distintos}")
print(f"  Coincidencia simple = {smc:.1f}   Jaccard = {jaccard:.1f}")
