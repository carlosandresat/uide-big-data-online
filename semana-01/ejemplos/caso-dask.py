"""Caso en vivo · Dask: divide el archivo en particiones y arma un plan de tareas."""
import time

import dask.dataframe as dd

inicio = time.perf_counter()
ddf = dd.read_csv("ventas.csv", blocksize="16MB")   # particiones de unos 16 MB
print("Particiones:", ddf.npartitions)
print("Filas de la primera partición:", len(ddf.partitions[0]))

ddf["total"] = ddf["cantidad"] * ddf["precio_unitario"]
resumen = ddf.groupby("ciudad")["total"].sum()      # todavía no calcula nada
print(resumen)                                      # solo la estructura: los valores aparecen como ...
print(resumen.compute().sort_values(ascending=False).round(0))  # ahora sí
print(f"Tiempo: {time.perf_counter() - inicio:.1f} s")
