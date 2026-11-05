"""Caso en vivo · pandas: total vendido por ciudad (lee todo el archivo en memoria)."""
import time

import pandas as pd

inicio = time.perf_counter()
df = pd.read_csv("ventas.csv")                      # carga TODO en memoria, ya
print(df.shape)
print(f"Memoria: {df.memory_usage(deep=True).sum() / 1e6:.0f} MB")

df["total"] = df["cantidad"] * df["precio_unitario"]
resumen = df.groupby("ciudad")["total"].sum().sort_values(ascending=False)
print(resumen.round(0))
print(f"Tiempo: {time.perf_counter() - inicio:.1f} s")
