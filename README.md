🌾 Akıllı Tarım Yönetim Sistemi

Bu proje, tarımsal süreçlerin dijital takibi ve verimliliğinin artırılması amacıyla Fırat Üniversitesi Yazılım Mühendisliği bünyesinde geliştirilmektedir.


👥 Proje Ekibi

Aşağıdaki liste, projenin geliştirilmesinden ve sürdürülmesinden sorumlu ekip üyelerini içermektedir:


•	Nazlı Karaağaç (Proje Yöneticisi)

•	Miraç Özcan Ağcabay

•	Birgül Göktürk

•	Arda Yeşil

•	Özgür Ulusoy


🚀 Proje Amacı

Geleneksel tarım verilerini modern yazılım çözümleriyle birleştirerek; analiz, takip ve yönetim kolaylığı sağlamak.


🛠️ Teknik Detaylar

•	Versiyon Kontrol: Git & GitHub

•	Geliştirme Ortamı: (Örn: VS Code, PyCharm)
 
## 📁 Proje Yapısı

```
akilli-tarim-yonetim-sistemi/
│
├── 📂 database/
│   └── schema.sql                          # MySQL veritabanı şeması
│                                           # Tablolar: kullanicilar, ciftlikler,
│                                           # tarlalar, sensorler, sensor_verileri,
│                                           # sulama/gubreleme/ilaclama komutları,
│                                           # alarmlar, sensor_esikler
│
└── 📂 profilSayfasiTasarimi/
    │
    ├── 📂 backend/
    │   └── backend_improved.py             # Flask REST API
    │                                       # Bağlantı havuzu, JWT kimlik doğrulama,
    │                                       # önbellekleme, hız sınırlama, sayfalama
    │
    ├── 📂 web_yonetici/                    # Yönetici Web Paneli
    │   ├── index.html                      # Ana sayfa yapısı
    │   ├── style.css                       # Tema, dark mode, responsive düzen
    │   └── app_improved.js                 # Gerçek API entegrasyonu, JWT yönetimi,
    │                                       # debounce, retry, çevrimdışı desteği
    │
    └── 📂 mobil_ciftci/                    # Çiftçi Mobil Uygulaması (React Native)
        ├── App.js                          # Uygulama giriş noktası
        ├── app.json                        # Expo yapılandırması
        ├── package.json                    # Bağımlılıklar
        └── 📂 src/screens/
            └── ProfileScreen.js            # Profil ekranı — IoT paneli, bildirimler,
                                            # harita entegrasyonu, çoklu dil desteği
```

---

## ⚙️ Kurulum


### Gereksinimler
- Python 3.8 veya üzeri
- MySQL 8.0 veya üzeri
- Node.js 18 veya üzeri
- Expo CLI (`npm install -g expo-cli`)

### 1. Veritabanı kurulumu

```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend kurulumu

```bash
cd profilSayfasiTasarimi/backend

pip install flask flask-jwt-extended flask-caching flask-limiter \
            mysql-connector-python werkzeug

# Ortam değişkenlerini tanımla (.env dosyası oluştur)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sifreniz
DB_NAME=tarim_iot
SECRET_KEY=gizli-anahtar-buraya
JWT_SECRET_KEY=jwt-gizli-anahtar-buraya

python backend_improved.py
# Sunucu http://localhost:5000 adresinde çalışır
```

> Production ortamında Flask'ın dahili sunucusu yerine Gunicorn kullanın:
> ```bash
> gunicorn -w 4 -b 0.0.0.0:5000 backend_improved:app
> ```

### 3. Web yönetici paneli

`profilSayfasiTasarimi/web_yonetici/index.html` dosyasını tarayıcıda açın.

Production ortamı için `index.html` içine API adresini ekleyin:
```html
<script>window.API_BASE_URL = "https://api.tarim-sistemi.com";</script>
```

### 4. Mobil uygulama

```bash
cd profilSayfasiTasarimi/mobil_ciftci

npm install
npx expo start
```

---

## 🗄️ Veritabanı Şeması

Sistemin 12 ana tablosu ve bunlar arasındaki ilişkiler aşağıda özetlenmiştir:

```
kullanicilar
    └── ciftlikler
            └── tarlalar
                    ├── urunler
                    ├── sensorler
                    │       ├── sensor_verileri   ← PARTITION BY RANGE (yıl)
                    │       ├── sensor_esikler
                    │       └── alarmlar
                    ├── sulama_komutlari
                    ├── gubreleme_komutlari
                    └── ilaclama_komutlari

yedekleme_log                                     ← bağımsız log tablosu
```

**IoT veri büyümesi tahmini:** 6 sensör × dakikalık ölçüm = ~3,1 milyon satır/yıl (~150 MB). Bu nedenle `sensor_verileri` tablosu `PARTITION BY RANGE` ile yıl bazlı bölümlere ayrılmış; 90 günden eski veriler MySQL Event ile `sensor_verileri_arsiv` tablosuna otomatik taşınmaktadır.

---

## ✨ Özellikler

### Web Yönetici Paneli
- Profil bilgileri görüntüleme ve düzenleme (readonly/edit modu)
- Güvenli şifre değişikliği (minimum 8 karakter, büyük harf ve rakam zorunluluğu)
- İki aşamalı doğrulama (2FA) yönetimi
- Bildirim tercihleri (e-posta, SMS, tarayıcı)
- Türkçe / İngilizce dil desteği
- Karanlık / aydınlık tema
- Profil fotoğrafı yükleme ve kaldırma

### Mobil Çiftçi Uygulaması
- Anlık tarla durumu takibi (sıcaklık, nem)
- Canlı IoT sensör paneli — kritik durumlarda uzaktan motor başlatma
- Sistem bildirimleri ve uyarı merkezi
- Harita entegrasyonu (cihaz harita uygulamasına yönlendirme)
- Profil fotoğrafı kamera/galeri entegrasyonu
- Karanlık / aydınlık tema ve Türkçe / İngilizce dil desteği

---

## 🔒 Güvenlik

- Şifreler veritabanında PBKDF2-SHA256 algoritmasıyla hashlenerek saklanır; düz metin hiçbir zaman tutulmaz.
- Tüm API istekleri JWT token ile korunmaktadır.
- Login endpoint'i brute-force saldırılarına karşı 10 istek/dakika ile sınırlandırılmıştır.
- Şifre değişikliği endpoint'i en fazla 5 istek/dakikaya izin vermektedir.

---

## 📄 Lisans

Bu proje Fırat Üniversitesi Yazılım Mühendisliği dersi kapsamında akademik amaçlarla geliştirilmiştir.