"""Genera ventas.csv, un dataset sintético de ventas para practicar.
Uso: python generar-ventas.py [filas]   (por defecto, 2 000 000 de filas, unos 80 MB)
Con la misma semilla siempre salen los mismos datos."""
import sys

import numpy as np
import pandas as pd

filas = int(sys.argv[1]) if len(sys.argv) > 1 else 2_000_000
rng = np.random.default_rng(42)

ciudades = ["Quito", "Guayaquil", "Cuenca", "Ambato", "Manta", "Loja"]
categorias = ["Alimentos", "Hogar", "Tecnología", "Ropa", "Salud"]
precio_base = {"Alimentos": 4, "Hogar": 25, "Tecnología": 180, "Ropa": 30, "Salud": 12}

categoria = rng.choice(categorias, filas)
base = pd.Series(categoria).map(precio_base).to_numpy()
ventas = pd.DataFrame({
    "fecha": pd.Timestamp("2025-01-01") + pd.to_timedelta(rng.integers(0, 365, filas), unit="D"),
    "ciudad": rng.choice(ciudades, filas, p=[0.30, 0.30, 0.15, 0.10, 0.08, 0.07]),
    "categoria": categoria,
    "cantidad": rng.integers(1, 11, filas),
    "precio_unitario": (base * rng.uniform(0.5, 1.5, filas)).round(2),
})
ventas.to_csv("ventas.csv", index=False)
print(f"ventas.csv: {filas:,} filas".replace(",", " "))
