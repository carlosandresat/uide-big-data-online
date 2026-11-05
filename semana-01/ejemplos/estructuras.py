"""Estructuras de Python que vas a usar en Big Data, y su versión en pandas y NumPy."""
import numpy as np
import pandas as pd

ciudades = ["Quito", "Cuenca"]          # lista: ordenada y mutable
ciudades.append("Loja")
print(ciudades)

coordenada = (-0.18, -78.47)            # tupla: ordenada e inmutable
try:
    coordenada[0] = 0
except TypeError as error:
    print("Tupla:", error)

poblacion = {"Quito": 2.7, "Cuenca": 0.6}   # diccionario: pares clave-valor
poblacion["Loja"] = 0.2
print(poblacion["Cuenca"])

provincias = {"Pichincha", "Azuay", "Pichincha"}  # conjunto: sin repetidos
print(len(provincias))

precios = np.array([4.5, 25.0, 180.0])  # array de NumPy: un solo tipo, operaciones vectorizadas
print(precios * 1.15)

serie = pd.Series(poblacion)            # Series: una dimensión, con etiquetas
print(serie.shape)
tabla = pd.DataFrame({"ciudad": ["Quito", "Cuenca"], "habitantes_millones": [2.7, 0.6]})
print(tabla.shape)                      # DataFrame: dos dimensiones (filas y columnas)
print(type(tabla["ciudad"]).__name__, type(tabla[["ciudad"]]).__name__)
