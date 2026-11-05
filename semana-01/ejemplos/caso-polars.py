"""Caso en vivo · Polars en modo lazy: primero arma un plan; lee y calcula solo al final."""
import sys
import time

import polars as pl

sys.stdout.reconfigure(encoding="utf-8")         # el plan usa símbolos como π (necesario en Windows)

inicio = time.perf_counter()
consulta = (
    pl.scan_csv("ventas.csv")                       # no lee nada todavía
    .with_columns((pl.col("cantidad") * pl.col("precio_unitario")).alias("total"))
    .group_by("ciudad")
    .agg(pl.col("total").sum())
    .sort("total", descending=True)
)
print(consulta.explain())                           # el plan, antes de ejecutar
print(consulta.collect())                           # ahora sí lee y calcula
print(f"Tiempo: {time.perf_counter() - inicio:.1f} s")
