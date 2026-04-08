# 🌾 Akıllı Tarım Yönetim Sistemi - Proje Akışı

**👥 Grup Adı:** Sıfır Hata Timi

**🎓 Grup Yöneticisi:** Nazlı Karaağaç  


---

## 📅 Haftalık İlerleme Raporu


### **🚀 1. Hafta: Planlama, Analiz ve Altyapı Kurulumu**

Bu hafta projenin temel taşları atılmış, analiz çalışmaları tamamlanmış ve geliştirme ortamları hazırlanmıştır. Yapılan çalışmaların detayları şöyledir:

### 1️⃣ Miraç Özcan AĞCABAY
* **🎯 Proje Analizi ve Kapsam Belirleme**
* 
    * Sistemde kullanılacak temel işlevler belirlenerek, projenin hangi tarımsal ihtiyaçlara çözüm sunacağı ve sınırları netleştirilmiştir.

### 2️⃣ Özgür ULUSOY
* **📝 Gereksinim Toplama ve Belgeleme**
* 
    * Çiftçilerin ve yöneticilerin ihtiyaç duyacağı anlık bildirim, raporlama ve otomatik sulama gibi fonksiyonel gereksinimler maddeler halinde listelenmiştir.

### 3️⃣ Birgül GÖKTÜRK
* **🤖 Teknoloji Araştırması ve Seçimi**
* 
    * Projenin yapay zeka ayağı için Python (Scikit-learn), veri saklama için MySQL ve donanım tarafında kullanılacak IoT sensör modelleri kararlaştırılmıştır.

### 4️⃣ Arda YEŞİL
* **🏗️ Proje Mimari Tasarımı**
  
## 1. 🔭 Genel Bakış

Bu doküman, IoT ve Yapay Zeka destekli Akıllı Tarım Yönetim Sistemi'nin genel mimari tasarımını, modüller arası ilişkileri, veri akışını ve sistem bileşenlerini tanımlar. Sensörlerden toplanan ham veriler işlenerek bulut veritabanına aktarılır; buradan web ve mobil arayüzlere dağıtılır.

---

## 2. 🗺️ Mimari Genel Görünüm

```
┌─────────────────────────────────────────────────────────────────┐
│                    KATMAN 3 — MOBİL UYGULAMA                    │
│         Dashboard · Gübre Onay · Bildirim · Raporlar            │
└────────────────────────────┬────────────────────────────────────┘
                             │  REST API / HTTPS
┌────────────────────────────▼────────────────────────────────────┐
│                   KATMAN 2 — BACKEND SUNUCU                     │
│  Veri İşleme │ YZ Analiz (Scikit-learn) │ Otomasyon │ Bildirim  │
└──────────────────────┬──────────────────────────────────────────┘
                       │  SQL / ORM
┌──────────────────────▼──────────────────────────────────────────┐
│                   KATMAN 1 — VERİTABANI                         │
│   Sensör Verileri │ Gübre Reçetesi │ AI Eğitim Verisi │ Loglar  │
└──────────────────────┬──────────────────────────────────────────┘
                       │  MQTT / REST
┌──────────────────────▼──────────────────────────────────────────┐
│                  KATMAN 0 — IOT CİHAZI                          │
│  Raspberry Pi / Arduino · Sensörler · Aktüatörler               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. 🧱 Katman Tanımları

### 3.1 🔌 Katman 0 — IoT Cihazı (Donanım)

Sistemin fiziksel katmanıdır. Tarla ortamından ham veri toplar ve aktüatörler aracılığıyla fiziksel müdahale gerçekleştirir.

**Mikrodenetleyici:**
- Raspberry Pi 4 (birincil) veya Arduino Mega (yedek)

**Sensörler:**

| Sensör | Ölçüm | Örnekleme Sıklığı |
|--------|-------|-------------------|
| Kapasitif Toprak Nem Sensörü | Toprak nem oranı (%) | Her 5 dakika |
| DHT22 | Ortam sıcaklığı (°C) ve hava nemi (%) | Her 1 dakika |
| NPK Sensörü | Azot (N), Fosfor (P), Potasyum (K) mg/kg + pH | Her 30 dakika |

**Aktüatörler:**

| Aktüatör | Görev |
|----------|-------|
| 12V Su Pompası | Otomatik sulama |
| Röle Modülü | Motor on/off kontrolü |
| Gübre Dozlama Valfi | Gübre miktarı kontrolü |

**İletişim Protokolü:** MQTT (düşük bant genişliği, güvenilir mesajlaşma)

---

### 3.2 🗃️ Katman 1 — Veritabanı

Tüm sistem verilerinin kalıcı olarak saklandığı katmandır.

**Teknoloji:** MySQL veya PostgreSQL

**Tablolar:**

| Tablo | İçerik | İlgili FR |
|-------|--------|-----------|
| `sensor_readings` | Nem, sıcaklık, NPK değerleri + timestamp | FR-04 |
| `fertilizer_recipes` | Gübre tavsiyeleri, miktar, onay durumu | FR-07, FR-10 |
| `ai_training_data` | Etiketli veri seti, model ağırlıkları | FR-06 |
| `users` | Kullanıcı profilleri ve yetki seviyeleri | FR-09 |
| `system_logs` | Alarm kayıtları, işlem geçmişi | FR-08 |
| `plant_growth_stages` | Bitki gelişim evreleri ve besin ihtiyaçları | FR-07 |

---

### 3.3 ⚙️ Katman 2 — Backend Sunucu

İş mantığının, yapay zeka modellerinin ve otomasyon kurallarının çalıştığı ana katmandır.

**Teknoloji:** Python 3.x

#### 3.3.1 🔄 Veri İşleme Modülü
- Ham sensör verisinin doğrulanması ve temizlenmesi
- Zaman damgası eklenmesi
- Eşik değer kontrolü (nem < %30 → sulama tetikleme)
- Veriyi veritabanına yazma

#### 3.3.2 🤖 Yapay Zeka Analiz Modülü
- **Kütüphane:** Scikit-learn
- Sulama zamanlaması optimizasyonu (hava durumu API entegrasyonu)
- NPK verisi analizi ve gübre tavsiyesi üretimi
- Bitki gelişim evresine göre besin ihtiyacı hesaplama
- Model yeniden eğitimi için veri birikimi

#### 3.3.3 🎛️ Otomasyon Kontrol Modülü
- FR-05: Nem eşik kontrolü → pompa tetikleme
- FR-08: Anormal durum tespiti → acil mod
- Zamanlama motoru (cron tabanlı periyodik görevler)
- IoT cihazına komut gönderme

#### 3.3.4 🔔 Bildirim Servisi
- Push notification (mobil)
- SMS ve e-posta bildirimi
- Acil durum alarmları (sensör arızası, aşırı sıcaklık)

**API:** RESTful — JSON formatında veri iletimi

---

### 3.4 📱 Katman 3 — Mobil Uygulama

Çiftçi ile sistem arasındaki arayüz katmanıdır.

**Platform:** iOS ve Android

**Ekranlar:**

| Ekran | İçerik | İlgili FR |
|-------|--------|-----------|
| Ana Dashboard | Nem %, Sıcaklık, Toprak Sağlığı skoru | FR-09 |
| Gübre Onay Ekranı | Reçete detayı, miktar, onayla/reddet | FR-10 |
| Geçmiş Raporlar | Aylık gübre/sulama kullanımı grafikleri | FR-09 |
| Bildirim Merkezi | Alarmlar ve sistem mesajları | FR-08 |

---

## 4. 🔀 Veri Akışı

### 4.1 💧 Otomatik Sulama Akışı (FR-05, FR-06)

```
Nem Sensörü → [Nem < %30?] → Veri İşleme Modülü
    → Hava Durumu API Kontrolü
        → [Yağmur yok] → Otomasyon Modülü → Pompa Tetikleme
        → Bildirim Servisi → Çiftçi Telefonu
```

### 4.2 🌿 Akıllı Gübreleme Akışı (FR-03, FR-07, FR-10)

```
NPK Sensörü → Veri İşleme Modülü → Veritabanı (sensor_readings)
    → YZ Analiz Modülü
        → plant_growth_stages tablosu sorgusu
        → Gübre Tavsiyesi Üret → Veritabanı (fertilizer_recipes)
        → Bildirim Servisi → Çiftçi Onayı (Mobil)
            → [Onaylandı] → Otomasyon Modülü → Gübre Valfi Aç
```

### 4.3 🚨 Acil Durum Akışı (FR-08)

```
Sensör → Anormal Değer Tespiti (arıza / aşırı sıcaklık)
    → Otomasyon Modülü → ACİL MOD
        → Tüm Aktüatörler Durdur
        → Bildirim Servisi → Yönetici Alarmı (Push + SMS)
        → system_logs tablosuna kayıt
```

---

## 5. 🔗 Modüller Arası İlişki Matrisi

| Modül | Veri İşleme | YZ Analiz | Otomasyon | Bildirim | Veritabanı | IoT |
|-------|:-----------:|:---------:|:---------:|:--------:|:----------:|:---:|
| **Veri İşleme** | — | → | → | — | → | ← |
| **YZ Analiz** | ← | — | → | → | ↔ | — |
| **Otomasyon** | ← | ← | — | → | → | → |
| **Bildirim** | — | ← | ← | — | → | — |
| **Veritabanı** | ↔ | ↔ | ← | ← | — | — |
| **IoT Cihazı** | → | — | ← | — | — | — |

> `→` veri gönderir, `←` veri alır, `↔` çift yönlü

---

## 6. ✅ Gereksinim — Mimari Bileşen Eşleşmesi

| Gereksinim | Sorumlu Bileşen |
|------------|-----------------|
| FR-01 Nem ölçümü | Kapasitif Nem Sensörü + Veri İşleme Modülü |
| FR-02 Sıcaklık/nem | DHT22 + Veri İşleme Modülü |
| FR-03 NPK ölçümü | NPK Sensörü + Veri İşleme Modülü |
| FR-04 Veri kayıt | Veritabanı (sensor_readings tablosu) |
| FR-05 Oto sulama | Otomasyon Modülü + Pompa/Röle |
| FR-06 YZ sulama optimizasyonu | YZ Analiz Modülü (Scikit-learn) |
| FR-07 Gübre tavsiyesi | YZ Analiz Modülü + fertilizer_recipes |
| FR-08 Acil durum | Otomasyon Modülü + Bildirim Servisi |
| FR-09 Mobil görüntüleme | Mobil Uygulama Dashboard |
| FR-10 Gübre onayı | Mobil Uygulama Onay Ekranı |

---

### 5️⃣ Nazlı KARAAĞAÇ
* **⚙️ Geliştirme Ortamı Kurulumu**
    * Ekip üyelerinin bilgisayarlarına gerekli kod editörleri (VS Code), kütüphaneler ve Git araçları kurularak ortak çalışma ekosistemi (GitHub) aktif edilmiştir.
 

## 📅 Haftalık İlerleme Raporu

### **🚀 3. Hafta: Geliştirme, Entegrasyon ve Optimizasyon**

Bu hafta Akıllı Tarım Yönetim Sistemi (ATYS) projesinin performansını artırma, arayüzleri entegre etme ve sistem güvenilirliğini test etme aşamalarına odaklanıyoruz. 

| 👤 Sorumlu | 🛠️ Görev | 
| :--- | :--- |
| **Özgür Ulusoy** | Veritabanı Optimizasyonu 
| **Birgül Göktürk** | API Entegrasyonu (Ödeme)
| **Nazlı Karaağaç** | Test Senaryoları Geliştirme
| **Arda Yeşil** | Hata Ayıklama ve Düzeltme
| **Miraç Özcan Ağcabay** | Kullanıcı Arayüzü Geliştirmesi

---

#### 📝 3. Hafta Görev Detayları ve Hedefler

### 1️⃣ Özgür ULUSOY
**🗄️ Veritabanı Optimizasyonu: Sorgu Performansının İyileştirilmesi**

Veritabanı sorgularının performansını analiz eder ve yavaş çalışan sorguları optimize eder. İndeksleme ve sorgu yeniden yapılandırması gibi yöntemleri kullanılır.

---

### 2️⃣ Birgül GÖKTÜRK
**💳 API Entegrasyonu: Ödeme Sistemi Entegrasyonu**

Ödeme sistemi API'sini projeye entegre ederek kullanıcıların güvenli bir şekilde ödeme yapabilmesini sağlayan altyapıyı kurar.

---

### 3️⃣ Nazlı KARAAĞAÇ
**🧪 Test Senaryoları Geliştirme: Kullanıcı Kayıt ve Giriş Testleri**

Kullanıcı kayıt ve giriş süreçleri için başarılı, başarısız ve sınır durumlarını kapsayan detaylı test senaryoları geliştirir.

---

### 4️⃣ Arda YEŞİL
**🐛 Hata Ayıklama ve Düzeltme: Bildirilen Hataların Giderilmesi**

Hata takip sisteminde bildirilen teknik aksaklıkları inceleyerek nedenlerini tespit eder ve düzeltmelerini gerçekleştirir.

### 🌡️ BUG-001 — Sensör verisi None döndüğünde sistem çöküyor

**📝 Açıklama**

DHT22 sensörü bağlantı kopukluğunda `None` değeri döndürmektedir. Veri işleme modülü bu değer üzerinde karşılaştırma yapmaya çalışırken `TypeError` fırlatıyor ve tüm otomasyon döngüsü duruyordu.

**❌ Hatalı Kod**

```python
def process_sensor_data(reading):
    # BUG: None kontrolü yapılmadan karşılaştırma
    if reading['soil_moisture'] < MOISTURE_THRESHOLD:
        trigger_irrigation()
    if reading['temperature'] > TEMP_ALERT_LIMIT:
        send_emergency_alert()
# TypeError: '<' not supported between NoneType and int
```

**✅ Düzeltilmiş Kod**

```python
def process_sensor_data(reading):
    # FIX: Null güvenli kontrol + sensör arıza alarmı
    if reading is None or any(v is None for v in reading.values()):
        log_sensor_fault(reading)
        send_emergency_alert("sensor_failure")
        return  # FR-08: Acil mod tetikle
    if reading['soil_moisture'] < MOISTURE_THRESHOLD:
        trigger_irrigation()
    if reading['temperature'] > TEMP_ALERT_LIMIT:
        send_emergency_alert("high_temp")
```

**🔗 İlgili Gereksinim:** FR-08 (Anormal durum tespiti → acil mod)

---

### 📡 BUG-002 — MQTT mesajları çevrimdışıyken buffer'a yazılmıyor
x"
**📝 Açıklama**

İnternet bağlantısı kesildiğinde sensör okuma verileri hiçbir yere kaydedilmemekteydi. Bağlantı geri döndüğünde bu süre zarfındaki tüm ölçümler kaybolmakta, tarihsel trend analizi ve YZ modelinin eğitim verisi eksik kalmaktaydı.

**❌ Hatalı Kod**

```python
def send_mqtt(topic, payload):
    # BUG: Bağlantı yoksa veri düşürülüyor, buffer yok
    try:
        client.publish(topic, json.dumps(payload))
    except ConnectionError:
        pass  # Sessizce görmezden gel
```

**✅ Düzeltilmiş Kod**

```python
LOCAL_BUFFER_PATH = "/data/offline_buffer.json"

def send_mqtt(topic, payload):
    # FIX: Bağlantı yoksa yerel diske yaz
    try:
        client.publish(topic, json.dumps(payload))
        flush_local_buffer()  # Bekleyen kayıtları gönder
    except ConnectionError:
        _write_to_local_buffer({
            "topic": topic,
            "payload": payload,
            "timestamp": time.time()
        })

def flush_local_buffer():
    # Bağlantı geldiğinde sıralı olarak gönder
    if not os.path.exists(LOCAL_BUFFER_PATH):
        return
    with open(LOCAL_BUFFER_PATH, "r") as f:
        buffered = json.load(f)
    for record in buffered:
        client.publish(record["topic"], json.dumps(record["payload"]))
    os.remove(LOCAL_BUFFER_PATH)
```

**🔗 İlgili Gereksinim:** R-02 Risk (Bağlantı sorunlarında veri kaybı önleme)

---

### 🕒 BUG-003 — Veritabanı timestamp sorgusu yanlış zaman dilimi dönüyor

**📝 Açıklama**

Mobil uygulamada gösterilen son 30 günlük sensör verileri, sunucu UTC zamanıyla kaydedildiği ancak istemciye naive datetime olarak dönüldüğü için Türkiye yerel saatine göre **3 saat kaymaktaydı**. Çiftçiler gece sulamalarını gündüz yapılmış zannedebiliyordu.

**❌ Hatalı SQL**

```sql
-- BUG: Timezone-aware olmayan sorgulama
SELECT timestamp, soil_moisture
FROM sensor_readings
WHERE farm_id = %s
  AND timestamp >= NOW() - INTERVAL '30 days'
ORDER BY timestamp DESC;
-- Dönen timestamp: 2026-03-14 03:00:00 (UTC naive)
```

**✅ Düzeltilmiş SQL**

```sql
-- FIX: UTC'den yerel zamana dönüşüm + AT TIME ZONE
SELECT
    timestamp AT TIME ZONE 'UTC'
               AT TIME ZONE 'Europe/Istanbul' AS local_time,
    soil_moisture,
    temperature,
    farm_id
FROM sensor_readings
WHERE farm_id = %s
  AND timestamp >= NOW() - INTERVAL '30 days'
ORDER BY local_time DESC;
-- Dönen timestamp: 2026-03-14 06:00:00+03
```

**🔗 İlgili Gereksinim:** FR-04 (Tarih etiketiyle veri saklama), FR-09 (Mobil görüntüleme)

---

### 🌱 BUG-004 — YZ gübre tavsiyesi bitki evresi kontrolü yapmıyor

**📝 Açıklama**

FR-07 gereksiniminde belirtildiği üzere gübre tavsiyesi bitki gelişim evresine göre özelleştirilmeli. Ancak mevcut modül `plant_growth_stages` tablosunu hiç sorgulamıyordu; tüm bitkiler için aynı sabit NPK eşik değerleri kullanılıyordu. Bu durumda hasat dönemindeki bitkiye tohum dönemindeki doz uygulanabiliyordu.

**❌ Hatalı Kod**

```python
def generate_fertilizer_advice(npk_reading, farm_id):
    # BUG: Sabit eşikler, bitki evresine duyarsız
    FIXED_N_THRESHOLD = 40  # mg/kg
    if npk_reading['nitrogen'] < FIXED_N_THRESHOLD:
        return "Azot takviyesi gerekli: 20 kg/dönüm Üre"
```

**✅ Düzeltilmiş Kod**

```python
def generate_fertilizer_advice(npk_reading, farm_id):
    # FIX: plant_growth_stages tablosundan evreye özgü eşik çek
    stage = db.query("""
        SELECT growth_stage, n_threshold, p_threshold, k_threshold
        FROM plant_growth_stages
        WHERE farm_id = %s
          AND %s BETWEEN stage_start AND stage_end
    """, (farm_id, date.today())).fetchone()

    if stage is None:
        log_warning(f"Büyüme evresi bulunamadı: farm={farm_id}")
        return None

    advice = []
    if npk_reading['nitrogen'] < stage['n_threshold']:
        dose = calculate_dose('N', npk_reading, stage)
        advice.append(
            f"[{stage['growth_stage']}] Azot eksik: "
            f"{dose:.1f} kg/dönüm Üre öneriliyor"
        )
    # P ve K kontrolleri benzer şekilde eklenmeli...
    return advice if advice else None
```

**🔗 İlgili Gereksinim:** FR-07 (Gübre tavsiyesi), FR-03 (NPK ölçümü)

---

### 5️⃣ Miraç Özcan AĞCABAY
**📱 Kullanıcı Arayüzü Geliştirmesi: Profil Sayfası Tasarımı ve Entegrasyonu**

Kullanıcı profil sayfasının görsel tasarımını tamamlayarak mevcut sisteme entegrasyonunu ve bilgi güncelleme özelliklerini hazırlar.

# 🚀 4. Hafta Görevleri ve Detaylar

## 👤 1️⃣ Arda Yeşil

1) Sistem Entegrasyonu ve Test Planı Oluşturma 🔗
Sensör veri toplama modülü, veri analiz sistemi, mobil uygulama ve web arayüzünün nasıl entegre edileceğini planlanır. Her bir modülün birbiriyle nasıl iletişim kuracağı ve veri alışverişi yapacağı belirlenir. Entegrasyon testleri için bir test planı oluşturulur. Test senaryolarını, test verilerini ve test ortamı tanımlanır.

## 🌾 1. Giriş ve Sistem Mimarisi

Bu doküman, Akıllı Tarım Yönetim Sistemi'nin dört ana modülünü  Sensör Toplama, Veri Analizi, Mobil Uygulama, Web Arayüzü birbirine bağlayan entegrasyon mimarisini ve bu entegrasyonun doğrulanması için gereken test planını tanımlar.

### 🏗️ 1.1 Katmanlı Mimari

```
┌──────────────────────────────────────────────────────────────┐
│              KATMAN 3 — MOBİL & WEB ARAYÜZÜ                  │
│   React Native (Expo)  ·  HTML5 / Vanilla JS                 │
└────────────────────────────┬─────────────────────────────────┘
                             │  REST / HTTPS + JWT
┌────────────────────────────▼─────────────────────────────────┐
│                  KATMAN 2 — BACKEND API                       │
│        Flask · MySQL · Scikit-learn · Bildirim Servisi        │
└──────────────────────┬───────────────────────────────────────┘
                       │  SQL / ORM
┌──────────────────────▼───────────────────────────────────────┐
│                  KATMAN 1 — VERİTABANI                        │
│   sensor_readings · users · fertilizer_recipes · system_logs  │
└──────────────────────┬───────────────────────────────────────┘
                       │  MQTT (port 1883)
┌──────────────────────▼───────────────────────────────────────┐
│                  KATMAN 0 — IoT CİHAZI                        │
│       Raspberry Pi · DHT22 · NPK Sensörü · Su Pompası         │
└──────────────────────────────────────────────────────────────┘
```

| Katman | Bileşen | Teknoloji | Görev |
|---|---|---|---|
| Katman 0 | IoT Cihazı | Raspberry Pi + MQTT | Sensör okuma & aktüatör kontrolü |
| Katman 1 | Backend API | Flask + MySQL | İş mantığı, YZ, veri saklama |
| Katman 2 | Mobil Uygulama | React Native (Expo) | Çiftçi arayüzü & bildirimler |
| Katman 2 | Web Paneli | HTML5 / Vanilla JS | Yönetici paneli & raporlar |

> 📌 **Not:** Mobil uygulama şu an mock veri kullanmaktadır. Backend entegrasyonu bu plana göre adım adım gerçekleştirilecektir.

---

## 🔗 2. Modüller Arası İletişim ve Veri Akışı

### 📡 2.1 İletişim Protokolleri

| İletişim Hattı | Protokol | Format | Açıklama |
|---|---|---|---|
| IoT Sensör → Backend | MQTT (port 1883) | JSON payload | Mosquitto broker üzerinden |
| Backend → IoT (Komut) | MQTT (port 1883) | JSON komut | Pompa/vana tetikleme |
| Backend → Mobil | REST / HTTPS | JSON | Flask endpoint'leri, JWT zorunlu |
| Backend → Web | REST / HTTPS | JSON | AJAX fetch() çağrısı |
| Mobil → Backend | REST / HTTPS + JWT | JSON | Authorization: Bearer token |
| Web → Backend | REST / HTTPS + JWT | JSON | httpOnly cookie veya token |

---

### 🗂️ 2.2 REST API Endpoint Kataloğu

| # | Metod | Endpoint | Modül | Durum |
|---|---|---|---|---|
| 1 | GET | `/api/profile` | Web & Mobil | ✅ Mevcut |
| 2 | PUT | `/api/profile` | Web & Mobil | ✅ Mevcut |
| 3 | PUT | `/api/profile/password` | Web & Mobil | ✅ Mevcut |
| 4 | POST | `/api/auth/login` | Web & Mobil | 🔜 Eklenecek |
| 5 | GET | `/api/sensors/latest` | Mobil & Web | 🔜 Eklenecek |
| 6 | GET | `/api/sensors/history` | Web | 🔜 Eklenecek |
| 7 | POST | `/api/irrigation/trigger` | Mobil | 🔜 Eklenecek |
| 8 | GET | `/api/fertilizer/advice` | Mobil & Web | 🔜 Eklenecek |
| 9 | POST | `/api/fertilizer/approve` | Mobil | 🔜 Eklenecek |
| 10 | GET | `/api/alerts` | Mobil & Web | 🔜 Eklenecek |

> ⚠️ **Not:** 🔜 işaretli endpoint'ler bir sonraki geliştirme sprintinde uygulanmalıdır.

---

### 🌿 2.3 MQTT Topic Yapısı

| MQTT Topic | Yön | Örnek Payload |
|---|---|---|
| `atys/farm/{farm_id}/sensor/moisture` | IoT → Backend | `{"farm_id":2, "value":28, "unit":"%", "ts":1711900800}` |
| `atys/farm/{farm_id}/sensor/temp` | IoT → Backend | `{"farm_id":2, "value":28.5, "unit":"C"}` |
| `atys/farm/{farm_id}/sensor/npk` | IoT → Backend | `{"N":35, "P":22, "K":41, "pH":6.8}` |
| `atys/farm/{farm_id}/cmd/pump` | Backend → IoT | `{"action":"ON", "duration_min":20}` |
| `atys/farm/{farm_id}/cmd/fertilizer` | Backend → IoT | `{"valve":1, "amount_ml":500}` |
| `atys/system/alerts` | Backend → Hepsi | `{"level":"CRITICAL", "msg":"Sensör arızası"}` |

---

### 📱 2.4 Mobil Uygulama Entegrasyon Adımları

`ProfileScreen.js` içindeki mock verilerden gerçek API'ye geçiş planı:

| # | Mock → Değiştirilecek | Yapılacak Entegrasyon |
|---|---|---|
| 1 | `FARMS_DATA` sabiti | `useEffect` içinde `GET /api/sensors/latest` çağrısı |
| 2 | `MOCK_NOTIFS` sabiti | `GET /api/alerts` endpoint'i, bildirimler dinamik çekilmeli |
| 3 | `updateProfile` (mock await) | `fetch('SERVER/api/profile', {method:'PUT',...})` gerçek API |
| 4 | `startEngine` (Alert.alert) | `POST /api/irrigation/trigger` endpoint'ine bağlantı |
| 5 | Kimlik doğrulama yok | `AsyncStorage` ile JWT token, her isteğe `Authorization` header |

**Eklenecek kod — `ProfileScreen.js`:**

```javascript
useEffect(() => {
  fetch('http://localhost:5000/api/sensors/latest', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(data => setFarmsData(data.farms))
    .catch(() => setFarmsData(FARMS_DATA)); // offline fallback
}, []);
```

---

### 💻 2.5 Web Paneli Entegrasyon Adımları

`app.js` içindeki mock çağrıların gerçek API'ye bağlanması:

| # | Mevcut Durum | Entegrasyon Adımı |
|---|---|---|
| 1 | `localStorage` token saklama | `httpOnly` cookie veya `Authorization` header kullanımı |
| 2 | Mock profil verisi | Sayfa yüklenirken `GET /api/profile` fetch() çağrısı |
| 3 | Mock şifre güncelleme | `PUT /api/profile/password` + 401 hata yönetimi |
| 4 | 2FA simülasyonu | Backend TOTP üretimi, `/api/auth/2fa` endpoint entegrasyonu |

**Eklenecek kod — `app.js`:**

```javascript
async function loadProfileFromAPI() {
  const res = await fetch('/api/profile', {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  });
  if (!res.ok) { showAlert(t('alert_load_error')); return; }
  const d = await res.json();
  document.getElementById('fullName').value = d.data.fullName;
}
```

---

## 🧪 3. Entegrasyon Test Senaryoları

### 🔌 ENT-01 | Sensör → Backend → Veritabanı Boru Hattı

| Alan | Detay |
|---|---|
| **Test Hedefi** | MQTT üzerinden gelen sensör verisinin backend'de işlenerek MySQL'e kaydedildiğini doğrula |
| **Ön Koşul** | Mosquitto broker çalışıyor, `sensor_readings` tablosu hazır |
| **Test Verisi** | Topic: `atys/farm/2/sensor/moisture` \| `{"farm_id":2, "value":28, "unit":"%"}` |
| **Test Adımı** | `mosquitto_pub` komutu ile veri gönder, DB sorgula |
| **Beklenen Sonuç** | `sensor_readings` tablosunda `farm_id=2`, `soil_moisture=28` satırı oluşur |
| **Başarı Kriteri** | DB kaydı ≤ 2 sn içinde oluşur, değer sapması ±0.1 tolerans |
| **Hata Senaryosu** | `None` değer gelirse FR-08 alarmı tetiklenmeli, sistem çökmemeli (BUG-001 doğrulama) |

```bash
# Test komutu:
mosquitto_pub -h localhost -t 'atys/farm/2/sensor/moisture' \
  -m '{"farm_id":2,"value":28,"unit":"%","ts":1711900800}'

# Doğrulama SQL:
SELECT * FROM sensor_readings WHERE farm_id=2 ORDER BY timestamp DESC LIMIT 1;
```

---

### 🛠️ ENT-02 | Backend REST API Profil CRUD

| Alan | Detay |
|---|---|
| **Test Hedefi** | Web paneli ve mobil uygulamanın backend endpoint'lerine doğru bağlandığını doğrula |
| **Ön Koşul** | Flask `localhost:5000` çalışıyor, `users` tablosunda test kullanıcısı var |
| **Test Verisi** | `{"fullName": "Test Çiftçi", "email": "test@tarim.com"}` |
| **Beklenen Sonuç** | 200 OK profil güncellenir; boş alan → 400; yetkisiz → 401 |

| Test ID | Metod | Girdi | Beklenen HTTP |
|---|---|---|---|
| ENT-02-A | `GET /api/profile` | user_id=1 | 200 + JSON profil verisi |
| ENT-02-B | `PUT /api/profile` | fullName: 'Test Çiftçi' | 200 + başarı mesajı |
| ENT-02-C | `PUT /api/profile` | fullName: '' (boş) | 400 Eksik veri |
| ENT-02-D | `PUT /api/profile/password` | doğru mevcut şifre | 200 Şifre güncellendi |
| ENT-02-E | `PUT /api/profile/password` | yanlış mevcut şifre | 401 Mevcut şifre hatalı |

---

### 📊 ENT-03 | Mobil Uygulama → Backend Sensör Veri Akışı

| Alan | Detay |
|---|---|
| **Test Hedefi** | `FARMS_DATA` mock listesinin `GET /api/sensors/latest` ile değiştirilmesini doğrula |
| **Ön Koşul** | Backend çalışıyor, 2 tarla için sensör verisi DB'de mevcut, Expo Go açık |
| **Test Verisi** | farm_id=1 nem=%55 (normal), farm_id=2 nem=%28 (uyarı) |
| **Beklenen Sonuç** | IoT panelinde gerçek veriler listelenir, farm_id=2 kırmızı uyarıyla gösterilir |
| **Bağlantı Kesilirse** | Offline buffer devreye girer, uygulama çökmez (BUG-002 doğrulama) |

---

### 💧 ENT-04 | Sulama Motoru Tetikleme (Mobil → Backend → MQTT → IoT)

| Alan | Detay |
|---|---|
| **Test Hedefi** | Mobil "Motoru Başlat" butonunun IoT'ye MQTT komutu gönderdiğini doğrula |
| **Akış** | `startEngine()` → `POST /api/irrigation/trigger` → MQTT publish → IoT pompa ON |
| **Test Verisi** | `farm_id: 2`, `duration_min: 20` |
| **Beklenen Sonuç** | `atys/farm/2/cmd/pump` topic'inde `{"action":"ON", "duration_min":20}` alınır |
| **Timeout** | 5 sn içinde ACK gelmezse "Cihaz yanıt vermiyor" uyarısı gösterilir |

```bash
# MQTT mesajını izle:
mosquitto_sub -h localhost -t 'atys/farm/2/cmd/pump' -v
# Beklenen çıktı:
# atys/farm/2/cmd/pump {"action": "ON", "duration_min": 20, "triggered_by": "mobile_user_1"}
```

---

### 🌐 ENT-05 | Web Paneli → Backend

| Alan | Detay |
|---|---|
| **Test Hedefi** | `app.js` mock API çağrılarının Flask endpoint'lerine bağlandığını doğrula |
| **Öncelikli Testler** | Profil yükleme, güncelleme, şifre değiştirme, 2FA toggle |
| **CORS Ayarı** | Flask'ta `flask-cors` ile GET/PUT origin izinleri verilmeli |
| **Test Verisi** | Admin: `admin@atys.com`, rol = Sistem Yöneticisi |
| **Hata Durumu** | Backend kapalı → `alert_load_error` mesajı gösterilmeli |

---

### 🕒 ENT-06 | Zaman Dilimi Tutarlılığı (BUG-003 Doğrulama)

| Alan | Detay |
|---|---|
| **Test Hedefi** | Sensör timestamp'lerinin `Europe/Istanbul`'a çevrildiğini doğrula |
| **Test Verisi** | DB'ye UTC `03:00:00` kaydedilen ölçüm |
| **Beklenen Görüntü** | Mobil/Web: `06:00:00+03:00` olarak görüntülenir |
| **Doğrulama SQL** | `SELECT timestamp AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Istanbul' FROM sensor_readings LIMIT 1;` |

---

### 🌱 ENT-07 | YZ Gübre Tavsiyesi (BUG-004 Doğrulama)

| Alan | Detay |
|---|---|
| **Test Hedefi** | `plant_growth_stages` tablosundan evreye özgü NPK eşikleri kullanıldığını doğrula |
| **Test Adımı** | farm_id=2, growth_stage='Yapraklanma', NPK N=30 (eşik=40) gönder |
| **Beklenen Sonuç** | `[Yapraklanma] Azot eksik: 20.5 kg/dönüm Üre öneriliyor` dönmeli |
| **Hata Durumu** | Evre bulunamazsa `NULL` döner + log atar, kullanıcıya tavsiye gösterilmez |

---

### 📶 ENT-08 | Offline Buffer (BUG-002 Doğrulama)

| Alan | Detay |
|---|---|
| **Test Hedefi** | Bağlantı kesildiğinde `offline_buffer.json`'a yazılıp, geri gelince toplu gönderildiğini doğrula |
| **Test Adımı** | 1. Broker durdur → 2. Simülatörden 3 veri gönder → 3. `offline_buffer.json` kontrol → 4. Broker başlat |
| **Beklenen Sonuç** | 3 kayıt DB'ye sıralı işlenir, `offline_buffer.json` silinir |
| **Başarı Kriteri** | Veri kaybı = 0, timestamp'ler doğru, sıra korunur |

---

## 📦 4. Test Verileri

### 👤 4.1 Kullanıcı Test Verileri

| ID | Ad Soyad | Rol | E-posta | Test Şifresi |
|---|---|---|---|---|
| 1 | Mehmet Demirci | Çiftçi | m.demirci@tarim.com | Test1234! |
| 2 | Mustafa Öztürk | Ziraat Müh. | m.ozturk@tarim.com | Agro5678! |
| 3 | Admin Yönetici | Sistem Yöneticisi | admin@atys.com | Admin9999! |
| 4 | Hatalı Kullanıcı | — | yok@yok.com | yanlissifre |

---

### 🌾 4.2 Tarla & Sensör Test Verileri

| farm_id | Tarla Adı | Nem % | Sıcaklık | N (mg/kg) | P | K | Senaryo |
|---|---|---|---|---|---|---|---|
| 1 | Ağın Badem Tarlası | 55 | 22°C | 42 | 28 | 38 | Normal |
| 2 | Keban Ceviz Bahçesi | 28 | 28°C | 30 | 22 | 41 | ⚠️ UYARI: Nem + N düşük |
| 3 | Baskil Kayısı Bahçesi | 45 | 19°C | 38 | 31 | 35 | Normal |
| 4 | Null Sensör | null | null | null | null | null | ❌ ARIZA simülasyonu (BUG-001) |

> ⚠️ `farm_id=4` BUG-001 fix doğrulaması için kasıtlı arıza verisidir. Sistem çökmemeli, FR-08 alarmı tetiklenmelidir.

---

### 🧫 4.3 Gübre Tavsiye Test Verileri

| Senaryo | Bitki Evresi | N Değeri | Eşik | Beklenen Tavsiye |
|---|---|---|---|---|
| TV-G1 | Yapraklanma Dönemi | 30 mg/kg | 40 mg/kg | Azot eksik: 20.5 kg/dönüm Üre |
| TV-G2 | Hasat Öncesi | 38 mg/kg | 45 mg/kg | Azot eksik: 12.2 kg/dönüm Üre |
| TV-G3 | Kök Gelişim | 50 mg/kg | 35 mg/kg | Azot yeterli, tavsiye yok |
| TV-G4 | Evre Girilmemiş | 30 mg/kg | — | `NULL` + log uyarısı (BUG-004 test) |

---

# 📘 API Tasarımı ve Entegrasyon Dokümanı

## 🚀 Genel Bakış
3) Proje Dokümantasyonu: API ve Veritabanı Entegrasyonu 📄
Hafta 3'teki API tasarımını ve bu haftaki API entegrasyonunu detaylı bir şekilde dokümante edilir. Veritabanı şemasını ve API endpoint'lerini açıklayan teknik doküman oluşturulur.

---

## 🗄️ Veritabanı Şeması

### 👤 Users
Kullanıcı bilgilerini saklar.

| Alan | Tip | Açıklama |
|-----|-----|----------|
| id | UUID | Kullanıcı benzersiz ID |
| name | string | Kullanıcı adı |
| email | string | Email adresi |
| created_at | timestamp | Oluşturulma tarihi |

---

## 🔌 API Endpointleri

### 👤 Kullanıcı Endpointleri

#### GET /api/users
Tüm kullanıcıları listeler.

#### GET /api/users/{id}
Belirli kullanıcı bilgilerini getirir.

#### POST /api/users
Yeni kullanıcı oluşturur.

---

### 📋 Görev Endpointleri

#### GET /api/tasks
Tüm görevleri listeler.

#### GET /api/tasks/{id}
Belirli görevi getirir.

#### POST /api/tasks
Yeni görev oluşturur.

#### PUT /api/tasks/{id}
Görev bilgilerini günceller.

#### DELETE /api/tasks/{id}
Görevi siler.

---

## 🔗 API Entegrasyonu
Frontend uygulaması, backend API ile **RESTful HTTP istekleri** üzerinden iletişim kurar.

- **GET** → Veri alma  
- **POST** → Veri oluşturma  
- **PUT** → Veri güncelleme  
- **DELETE** → Veri silme  

Tüm endpointler **JSON formatında** veri döndürür.

---

## ✅ Sonuç
Bu API yapısı, sistemin **modüler**, **ölçeklenebilir** ve **bakımı kolay** bir şekilde geliştirilmesini sağlar. Frontend ve backend bileşenleri standart HTTP metodları kullanarak güvenilir bir veri alışverişi gerçekleştirir.

👤 2️⃣ Nazlı Karaağaç
1) Mobil Uygulama ve Web Arayüzü Kullanıcı Arayüzü (UI) ve Kullanıcı Deneyimi (UX) Tasarımı 🎨
Çiftçiler için mobil uygulama ve yöneticiler için web arayüzü için kullanıcı dostu arayüzler tasarlanır. Her iki platformun da temel işlevlerini (veri görselleştirme, kontrol paneli, alarm yönetimi vb.) göz önünde bulundurulur. Kullanıcı senaryoları oluşturulur ve arayüz tasarımları bu senaryolara göre şekillendirilir. Arayüz tasarımları prototip olarak oluşturulur ve kullanıcı geri bildirimleri toplanır.

2) Test Senaryoları Oluşturma ve Uygulama: Kullanıcı İşlemleri 🧪
Hafta 3'te belirlenen kullanıcı hikayeleri için test senaryoları oluşturulur. Oluşturulan senaryoları kullanarak kullanıcı işlemlerinin (oluşturma, güncelleme, silme) testlerini gerçekleştirilir ve sonuçları raporlanır.

👤 3️⃣ Birgül Göktürk
1) Makine Öğrenmesi Algoritmaları Araştırması ve Seçimi 🤖
Sulama, gübreleme ve ilaçlama optimizasyonu için kullanılabilecek makine öğrenmesi algoritmaları (regresyon, sınıflandırma, kümeleme vb.) araştırılır. Her algoritmanın avantajlarını, dezavantajlarını ve veri gereksinimleri değerlendirilir. Proje gereksinimlerine en uygun algoritmaları belirlenir ve nedenlerini açıklayan bir rapor oluşturulur.

2) API Entegrasyonu: Kullanıcı Kimlik Doğrulama (Authentication) 🔐
Hafta 3'te tasarlanan API'ye kullanıcı kimlik doğrulama (authentication) entegrasyonu yapılır. Giriş, kayıt ve şifre sıfırlama işlevleri API üzerinden yönetilir.

👤 4️⃣ Özgür Ulusoy
1) Veritabanı Tasarımı ve Veri Modeli Oluşturma 🗄️
MySQL veritabanı için gerekli tablolar (sensör verileri, ürün bilgileri, kullanıcı bilgileri vb.) ve ilişkileri belirlenir. Her tablo için uygun veri tiplerini ve boyutları tanımlanır. Veri modelini oluştururken normalizasyon prensiplerine dikkat edilmesi gerekir. Veri güvenliği ve yedekleme stratejileri planlanır. Veritabanı şemasını ve veri modeli bir doküman halinde sunulur.

2) Kullanıcı Arayüzü (UI) Geliştirmesi: Profil Sayfası 💻
Hafta 3'teki UI tasarımına uygun olarak kullanıcı profil sayfası geliştirilir. Kullanıcının bilgilerini görüntüleme, düzenleme ve kaydetme işlevleri tamamlanır.

👤 5️⃣ Miraç Özcan Ağcabay
1) IoT Sensörleri Veri Toplama Modülü Gereksinim Analizi 📡
Kullanılacak IoT sensörlerinin (toprak nemi, sıcaklık, ışık vb.) veri formatlarını, iletişim protokollerini ve enerji tüketimleri detaylı olarak araştırılır. Toplanacak verilerin sıklığı, doğruluğu ve güvenilirliği ile ilgili gereksinimleri belirlenir. Bu gereksinimleri karşılayacak sensör teknolojilerini ve veri toplama yöntemleri değerlendirilir. Bulgular bir rapor halinde sunulur.

2) Veritabanı Optimizasyonu ve Performans Testleri ⚡
Hafta 3'te oluşturulan veritabanı şeması optimize edilir. Sorgu performansını artırmak için gerekli indekslemeler yapılır ve performans testleri ile sonuçları belgelenir.
