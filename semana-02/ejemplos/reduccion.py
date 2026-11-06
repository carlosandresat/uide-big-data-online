"""Reducción de dimensionalidad: PCA (crea componentes nuevos) frente a selección recursiva de
características (RFE, se queda con algunas columnas originales).
Usa el dataset de vinos que trae scikit-learn: 178 vinos, 13 atributos químicos y 3 variedades.
Uso: python reduccion.py"""
import sys

from sklearn.datasets import load_wine
from sklearn.decomposition import PCA
from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

sys.stdout.reconfigure(encoding="utf-8")

vinos = load_wine(as_frame=True)
X, y = vinos.data, vinos.target
print("Atributos originales:", X.shape[1])

# Las dos técnicas necesitan los atributos en la misma escala
Xs = StandardScaler().fit_transform(X)

pca = PCA(n_components=5).fit(Xs)
acumulada = pca.explained_variance_ratio_.cumsum()
print("\nPCA · varianza explicada acumulada:")
for k, v in enumerate(acumulada, start=1):
    print(f"  {k} componentes: {v:.0%}")

rfe = RFE(LogisticRegression(max_iter=1000), n_features_to_select=4).fit(Xs, y)
print("\nRFE · las 4 columnas que conserva:", list(X.columns[rfe.support_]))
