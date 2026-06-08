import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle
import os

print("--- ATYS Yapay Zeka Model Eğitimi ---")

# 1. Sentetik Tarım Verisi Üretimi
# Özellikler: [temperature, humidity, soil_moisture, nitrogen, phosphorus, potassium]
# Hedef: needs_irrigation (1: Evet, 0: Hayır)

np.random.seed(42)
n_samples = 1000

data = {
    'temperature': np.random.uniform(15.0, 40.0, n_samples),
    'humidity': np.random.uniform(20.0, 80.0, n_samples),
    'soil_moisture': np.random.uniform(10.0, 70.0, n_samples),
    'nitrogen': np.random.uniform(20.0, 100.0, n_samples),
    'phosphorus': np.random.uniform(20.0, 80.0, n_samples),
    'potassium': np.random.uniform(40.0, 120.0, n_samples)
}

df = pd.DataFrame(data)

# Kural Tabanlı Etiketleme:
# Eğer toprak nemi %25'in altındaysa veya (sıcaklık > 30 ve nem < 40) ise sulama gerekli
def determine_irrigation(row):
    if row['soil_moisture'] < 25.0:
        return 1
    elif row['temperature'] > 30.0 and row['soil_moisture'] < 40.0:
        return 1
    else:
        return 0

df['needs_irrigation'] = df.apply(determine_irrigation, axis=1)

# 2. Modelin Eğitilmesi
X = df.drop('needs_irrigation', axis=1)
y = df['needs_irrigation']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = DecisionTreeClassifier(max_depth=5, random_state=42)
model.fit(X_train, y_train)

# 3. Model Başarısı
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Model Eğitildi! Doğruluk Skoru: {acc * 100:.2f}%")

# 4. Modeli Kaydetme
model_path = os.path.join(os.path.dirname(__file__), 'irrigation_model.pkl')
with open(model_path, 'wb') as f:
    pickle.dump(model, f)
    
print(f"Model başarıyla kaydedildi: {model_path}")
