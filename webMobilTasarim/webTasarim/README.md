# 🌾 Akıllı Tarım Yönetim Sistemi

Modern, tam teşekküllü bir **Akıllı Tarım Yönetim Sistemi** web uygulaması.  
Flask (Python) backend, saf HTML/CSS/JS frontend ve MySQL veritabanından oluşan bir full-stack sistemdir.

---

## 🚀 Özellikler

- 🔐 **Kayıt & Giriş Sistemi** — E-posta, kullanıcı adı, isim/soyisim ile kayıt; güçlü şifre kuralları
- 📊 **Canlı Dashboard** — KPI kartları, gerçek zamanlı hava durumu, yapay zeka analiz widgetı
- 🌾 **Tarla Yönetimi** — Tarla ekleme, düzenleme, toprak analizi detayları
- 📡 **IoT Panel** — Sensör verileri, sulama kontrol sistemi
- 📅 **Tarım Takvimi** — Görev ekleme, tarih takibi
- 🔔 **Bildirim Sistemi** — Açılır dropdown, okundu/silindi desteği
- ⚠️ **Alarm Yönetimi** — Filtreleme, çözümleme
- 📈 **Raporlar** — PDF ve Excel export
- 👥 **Kullanıcı Yönetimi** — Rol bazlı erişim (Admin/Çiftçi)
- 🖼️ **Profil & Avatar** — Dinamik fotoğraf yükleme ve kaldırma
- 🌐 **Çift Dil** — Türkçe / İngilizce desteği
- 🌙 **Dark Mode** — Tam tema desteği
- 🔒 **Güvenli Çıkış** — Onay modalı ile çıkış

---

## 🛠️ Teknolojiler

| Katman | Teknoloji |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend | Python 3.10, Flask, Gunicorn |
| Veritabanı | MySQL 8.0 |
| Web Sunucusu | Nginx (Alpine) |
| Konteyner | Docker, Docker Compose |

---

## ⚡ Kurulum (Docker ile — Tavsiye Edilen)

### Gereksinimler
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) kurulu olmalı

### Adımlar

```bash
# 1. Repoyu klonlayın
git clone https://github.com/KULLANICI_ADINIZ/akilli-tarim.git
cd akilli-tarim

# 2. Sistemi başlatın (ilk seferinde imajlar indirilir ~2-3 dk)
docker compose up --build -d

# 3. Tarayıcıda açın
# http://localhost
```

### Demo Hesaplar
| Kullanıcı Adı | Şifre | Rol |
|---|---|---|
| `ahmet_ciftci` | `1234` | Çiftçi |
| `ayse_yonetici` | `1234` | Yönetici |

---

## 📁 Proje Yapısı

```
akilli-tarim/
├── backend/              # Python/Flask API
│   ├── main.py           # Ana API dosyası
│   ├── database.py       # Veritabanı şeması ve bağlantısı
│   ├── requirements.txt  # Python bağımlılıkları
│   └── Dockerfile
├── frontend/             # HTML/CSS/JS arayüzü
│   ├── index.html        # Ana dashboard
│   ├── login.html        # Giriş & Kayıt ekranı
│   ├── lang.js           # Dil sistemi (TR/EN)
│   ├── style.css         # Global stiller
│   ├── nginx.conf        # Nginx yapılandırması
│   └── Dockerfile
├── docker-compose.yml    # Tüm servislerin orkestrasyon dosyası
└── .gitignore
```

---

## 🔄 Güncelleme (Kod Değiştirince)

```bash
docker compose up --build -d
```

---

## 📄 Lisans

Bu proje **MIT Lisansı** altında lisanslanmıştır.
