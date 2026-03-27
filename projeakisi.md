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
* 
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

---

### 5️⃣ Miraç Özcan AĞCABAY
**📱 Kullanıcı Arayüzü Geliştirmesi: Profil Sayfası Tasarımı ve Entegrasyonu**

Kullanıcı profil sayfasının görsel tasarımını tamamlayarak mevcut sisteme entegrasyonunu ve bilgi güncelleme özelliklerini hazırlar.

