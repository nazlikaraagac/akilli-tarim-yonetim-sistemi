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
 

| 📋 Proje Bilgileri | 📝 Detaylar |
| :--- | :--- |
| **Hazırlayan** | Miraç Özcan Ağcabay |
| **Tarih** | 07.03.2026 |

---

## 🎯 1. Proje Tanımı ve Amacı

Bu proje, tarım alanlarında verimliliği artırmak ve doğal kaynakların daha etkin kullanılmasını sağlamak amacıyla geliştirilecek bir **Akıllı Tarım Yönetim Sistemini** kapsamaktadır.

Sistem, **IoT sensörleri** aracılığıyla toplanan çevresel verileri analiz ederek çiftçilere ve ziraat mühendislerine karar destek sağlayacaktır. Toprak nemi, sıcaklık, hava nemi ve diğer çevresel veriler analiz edilerek **sulama, gübreleme ve ilaçlama** gibi tarımsal faaliyetler optimize edilecektir. Bu sayede su ve gübre gibi kaynakların gereksiz kullanımının önüne geçilmesi ve tarımsal verimliliğin artırılması hedeflenmektedir.

---

## 📊 2. Proje Hedefleri

Projenin temel hedefleri aşağıdaki gibidir:
* [ ] Tarla sensörlerinden veri toplayan bir sistem geliştirmek.
* [ ] Toplanan verileri analiz ederek tarımsal karar destek mekanizması oluşturmak.
* [ ] Çiftçilerin mobil uygulama üzerinden tarla durumunu takip edebilmesini sağlamak.
* [ ] Ziraat mühendisleri ve yöneticiler için web tabanlı yönetim paneli geliştirmek.
* [ ] Makine öğrenmesi algoritmaları kullanarak verim tahmini ve öneri sistemi oluşturmak.

---

## 👥 3. Paydaş Analizi

| 👤 Paydaş | 🛠️ Rolü |
| :--- | :--- |
| **Çiftçiler** | Tarla durumunu mobil uygulama üzerinden takip eder ve önerileri uygular. |
| **Ziraat Mühendisleri** | Tarımsal analiz yapar ve çiftçilere teknik destek sağlar. |
| **Tarım İşletmesi Yöneticileri** | Web panel üzerinden sistem yönetimini gerçekleştirir. |
| **Yazılım Geliştiriciler** | Sistem geliştirme ve bakım süreçlerinden sorumludur. |
| **Sensör Sağlayıcıları** | Tarla sensör altyapısını sağlar. |

---

## 📦 4. Proje Kapsamı

### 🔹 Sensör Veri Toplama Modülü
Tarla ortamına yerleştirilen IoT sensörleri aracılığıyla çevresel veriler toplanacaktır.
* **Toplanacak Veriler:** Toprak nemi, Hava sıcaklığı, Hava nemi, Işık seviyesi, Toprak pH değeri.
* *Not:* Bu veriler sistem veritabanına kaydedilecektir.

### 🔹 Veri Analizi ve Karar Destek Sistemi

Toplanan veriler Python tabanlı analiz araçları kullanılarak işlenecektir. Analiz sonuçlarına göre sistem aşağıdaki önerileri sunacaktır:
* Sulama önerileri
* Gübreleme önerileri
* Bitki sağlığına yönelik uyarılar
* Verim tahmini (Makine öğrenmesi ile)

### 📱 Mobil Uygulama (Çiftçiler için)

Mobil uygulama sayesinde çiftçiler tarla verilerini anlık olarak takip edebilecektir.
* **Özellikler:** Sensör verilerini görüntüleme, Sulama önerilerini alma, Tarla takibi, Bildirim sistemi.

### 💻 Web Yönetim Paneli
Web paneli, ziraat mühendisleri ve sistem yöneticileri tarafından kullanılacaktır.
* **İşlemler:** Tarla ve sensör yönetimi, Veri analizi, Grafik/Rapor görüntüleme, Sistem ayarları.

---

## 🧰 5. Kullanılacak Teknolojiler

 main
| 💻 Teknoloji | 🎯 Kullanım Amacı |
| :--- | :--- |
| **Python** | Veri işleme ve analiz |
| **IoT Sensörleri** | Tarla verilerinin toplanması |
| **MySQL** | Veritabanı yönetimi |
| **Scikit-learn** | Makine öğrenmesi |
| **Mobil Teknolojiler** | Çiftçiler için uygulama arayüzü |
| **Web Teknolojileri** | Yönetim paneli geliştirme |

---

## ⚠ 6. Proje Kısıtları

Proje geliştirme sürecinde aşağıdaki kısıtlar bulunabilir:
* Gerçek sensör donanımına erişim sınırlı olabilir.
* Gerçek tarla verileri yerine simülasyon verileri kullanılabilir.
* Mobil uygulama ilk aşamada temel özelliklerle geliştirilecektir.

---

## ✅ 7. Proje Başarı Kriterleri

Proje aşağıdaki kriterler sağlandığında başarılı kabul edilecektir:
* Sensör verilerinin sistem tarafından doğru şekilde toplanması.
* Verilerin veritabanında saklanması.
* Analiz sisteminin tarımsal öneriler sunabilmesi.
* Mobil ve web arayüzlerinin kullanıcılar tarafından kullanılabilir olması.

---

## 🔮 8. Gelecek Geliştirmeler

Projenin ilerleyen aşamalarında aşağıdaki geliştirmeler yapılabilir:
* Uydu verilerinin sisteme entegre edilmesi.
* Bitki hastalıklarını tespit eden yapay zeka sistemleri.
* Otomatik sulama sistemleri ile entegrasyon.
* Daha gelişmiş verim tahmin modelleri.



### 2️⃣ Özgür ULUSOY
* **📝 Gereksinim Toplama ve Belgeleme**
* 
    * Çiftçilerin ve yöneticilerin ihtiyaç duyacağı anlık bildirim, raporlama ve otomatik sulama gibi fonksiyonel gereksinimler maddeler halinde listelenmiştir.
 

| Proje Bilgileri | Detaylar |
| :--- | :--- |
| **Hazırlayan** | Özgür Ulusoy |
| **Tarih** | 07.03.2026 |

---

## 1. 🎯 Proje Tanımı ve Amacı

Bu proje, tarımsal alanlarda verimliliği maksimize etmek amacıyla **IoT (Nesnelerin İnterneti)** ve **Yapay Zeka** destekli bir otomasyon sistemi geliştirmeyi hedefler.

Sistem, sadece sulama süreçlerini yönetmekle kalmaz; aynı zamanda toprağın mineral ve besin değerlerini analiz ederek bitkinin ihtiyacına uygun **akıllı gübreleme önerileri** sunar. Temel amaç, su ve gübre israfını önleyerek rekolteyi artırmaktır.

---

## 2. ⚙️ İşlevsel Gereksinimler (Functional Requirements)

### 2.1. 📡 Veri Toplama

* **FR-01:** Sistem, toprağın nem oranını anlık olarak ölçmelidir.
* **FR-02:** Sistem, ortam sıcaklığı ve hava nemi verilerini sensörler aracılığıyla toplamalıdır.
* **FR-03 (YENİ):** Sistem, toprağın verimliliğini belirleyen temel makro besin elementlerini (**Azot-N, Fosfor-P, Potasyum-K**) belirli aralıklarla ölçmelidir.
* **FR-04:** Toplanan tüm veriler (Nem, Sıcaklık, NPK Değerleri) tarih etiketiyle veritabanına kaydedilmelidir.

### 2.2. 🧠 Karar Destek ve Otomasyon

* **FR-05:** Toprak nem oranı belirlenen eşik değerin altına düştüğünde sistem otomatik olarak sulama motorunu tetiklemelidir.
* **FR-06:** Yapay Zeka modülü (**Scikit-learn**), hava durumu ve toprak verilerini analiz ederek sulama zamanlamasını optimize etmelidir.
* **FR-07 (YENİ):** Sistem, sensörlerden gelen mineral verilerini analiz ederek bitkinin gelişim evresine uygun **"Gübreleme Tavsiyesi"** oluşturmalıdır. *(Örn: "Fosfor seviyesi düşük, kök gelişimi için takviye gerekli")*
* **FR-08:** Anormal durumlar (sensör arızası veya aşırı sıcaklık) tespit edildiğinde sistem acil durum moduna geçmeli ve yöneticiyi uyarmalıdır.

### 2.3. 📱 Kullanıcı Etkileşimi

* **FR-09:** Çiftçi, mobil uygulama üzerinden tarlasının su ve mineral durumunu grafiksel olarak görüntüleyebilmelidir.
* **FR-10:** Sistem, oluşturduğu gübreleme reçetelerini (Hangi gübre, ne kadar miktar) kullanıcı onayına sunmalıdır.

---

## 3. 🛠️ Teknik Gereksinimler (Technical Requirements)

### 3.1. 🔌 Donanım (Hardware)

* **Mikrodenetleyici:** Raspberry Pi veya Arduino.
* **Temel Sensörler:** Kapasitif Toprak Nem Sensörü, DHT22 (Sıcaklık/Nem).
* **Gelişmiş Sensörler (YENİ):** NPK Sensörü (Toprak Azot, Fosfor, Potasyum ve pH ölçümü için).
* **Aktüatörler:** 12V Su Pompası / Röle Modülü.

### 3.2. 💻 Yazılım ve Altyapı (Software)

* **Programlama Dili:** Python 3.x (Backend ve AI modelleri için).
* **Veritabanı:** MySQL veya PostgreSQL.
* **Yapay Zeka Kütüphanesi:** Scikit-learn (Veri analizi, sulama ve gübreleme tahminleme modelleri için).
* **Versiyon Kontrol:** Git & GitHub.
* **IDE:** Visual Studio Code.

---

## 4. 🎬 Kullanıcı Senaryoları (User Scenarios)

### Senaryo 1: 💧 Otomatik Sulama Süreci

1. Sensörler toprağın kuruduğunu tespit eder (Nem < %30).
2. Python kodu bu veriyi işler ve hava durumu API'sini kontrol eder (Yağmur beklenmiyorsa).
3. Sistem su motorunu çalıştırır ve çiftçiye bildirim gönderir.

### Senaryo 2: 🧪 Akıllı Gübreleme ve Besin Analizi (YENİ)

1. **NPK Sensörü**, toprakta Azot (N) miktarının kritik seviyenin altına düştüğünü tespit eder.
2. Sistem, bitkinin büyüme dönemini (Örn: Yapraklanma dönemi) veritabanından kontrol eder.
3. Yapay zeka, *"Bitkinin yeşil aksam gelişimi için Azot takviyesi gereklidir"* sonucunu çıkarır.
4. Çiftçinin telefonuna: **"Dikkat! Azot eksikliği tespit edildi. Dönüm başına X kg Üre gübresi öneriliyor."** bildirimi düşer.

### Senaryo 3: 📊 Çiftçi Gözlem Ekranı

1. Kullanıcı uygulamayı açar.
2. Ana ekranda **"Nem: %55"**, **"Sıcaklık: 24°C"** ve **"Toprak Sağlığı: İyi (%85)"** bilgilerini görür.
3. Geçmiş raporlara bakarak geçen ay ne kadar gübre kullandığını inceler.


### 3️⃣ Birgül GÖKTÜRK
**🤖 Teknoloji Araştırması ve Seçimi**

#### 1. 🚀 Giriş ve Stratejik Yaklaşım
Bu rapor, projenin "akıllı" bileşenlerini (AI) ve sahadaki veri akışını (IoT) en verimli şekilde hayata geçirmek için seçilen teknoloji yığınını (Tech Stack) içermektedir. Seçimler yapılırken; **düşük enerji tüketimi, geniş kütüphane desteği ve hızlı geliştirme süreçleri** temel kriter olarak alınmıştır.

#### 🌱 Akıllı Tarım Yönetim Sistemi - Teknoloji Seçimi ve Analizi Raporu

| 📋 Rapor Bilgileri | 📝 Detaylar |
| :--- | :--- |
| **Hazırlayan** | Birgül Göktürk |
| **Tarih** | 07.03.2026 |

---

#### 2. 💻 Yazılım Dili ve Framework Değerlendirmesi

**2.1. Backend ve Yapay Zeka: Python 3.x**
Projenin karar destek mekanizması için Python dilinde karar kılınmıştır.
* **Avantajları:** Scikit-learn ve Pandas gibi veri bilimi kütüphaneleriyle tam uyumludur. Tahminleme modellerini (gübreleme ve sulama) entegre etmek oldukça kolaydır.
* **Gerekçe:** Projenin merkezinde yer alan AI modüllerinin (FR-06, FR-07) başka bir dilde bu kadar kısa sürede geliştirilmesi mümkün görünmemektedir.

**2.2. Mobil Uygulama: Flutter (Dart)**
Çiftçinin kullanacağı arayüz (FR-09) için hibrit bir mobil mimari tercih edilmiştir.
* **Avantajları:** Tek kod tabanıyla hem iOS hem Android çıktısı alınabilir. Material Design 3 desteğiyle modern ve kullanıcı dostu bir arayüz sunar.
* **Gerekçe:** Ekibimizin iki farklı platform için ayrı ayrı kod yazma yükünü ortadan kaldırarak zaman yönetimini (Scrum Planı) optimize eder.

---

#### 3. 📡 Veri Yönetimi ve Haberleşme Altyapısı

**3.1. Veritabanı: PostgreSQL**
Sistemdeki sensör verilerinin (FR-04) saklanması için ilişkisel bir veritabanı seçilmiştir.
* **Analiz:** NoSQL (MongoDB vb.) yerine PostgreSQL'in seçilme nedeni, tarih damgalı veriler arasındaki ilişkisel tutarlılığı korumaktır.
* **Kullanım:** Çiftçi profilleri, tarla geçmişi ve mineral değişim grafiklerinin hızlı sorgulanması için kullanılacaktır.

**3.2. IoT Haberleşme Protokolü: MQTT**
Donanım ile bulut arasındaki veri transferinde HTTP yerine MQTT tercih edilmiştir.
* **Analiz:** Tarımsal arazilerdeki internet bağlantısı genellikle zayıf ve değişkendir.
* **Gerekçe:** MQTT, çok düşük bant genişliğinde dahi paket kaybını minimize eden "Hafif (Lightweight)" bir protokol olduğu için sahadaki sensörlerin enerji tüketimini de düşürecektir.

---

#### 4. 🛠️ Teknik Stack Özeti

| Katman | Seçilen Teknoloji | Öncelik |
| :--- | :--- | :--- |
| **Yapay Zeka** | Scikit-learn / NumPy | 🔴 Yüksek |
| **Backend** | Python (FastAPI veya Flask) | 🔴 Yüksek |
| **Mobil UI** | Flutter / Dart | 🟡 Orta |
| **Veritabanı** | PostgreSQL | 🔴 Yüksek |
| **Haberleşme** | MQTT (Mosquitto) | 🟡 Orta |
| **IDE / Araçlar** | VS Code / Git / GitHub | 🟢 Düşük |

---

#### 5. 🛡️ Risk Analizi ve Çözüm Önerileri

* **⚠️ R-01 (Veri Kirliği):** Sensörlerden gelecek hatalı veriler AI modelini yanıltabilir.
    * *Çözüm:* Python tarafında bir "Veri Ön İşleme" katmanı oluşturulacak ve uç değerler (Outliers) temizlenecektir.

* **⚠️ R-02 (Bağlantı Sorunları):** İnternet tamamen kesildiğinde veri kaybı yaşanabilir.
    * *Çözüm:* IoT cihazlarında yerel bellek (Buffer) kullanılacak, bağlantı geldiğinde MQTT üzerinden toplu gönderim sağlanacaktır.




* **🤖 Teknoloji Araştırması ve Seçimi**
* 
    * Projenin yapay zeka ayağı için Python (Scikit-learn), veri saklama için MySQL ve donanım tarafında kullanılacak IoT sensör modelleri kararlaştırılmıştır.

### 4️⃣ Arda YEŞİL
* **🏗️ Proje Mimari Tasarımı**
  
## 1. Genel Bakış

Bu doküman, IoT ve Yapay Zeka destekli Akıllı Tarım Yönetim Sistemi'nin genel mimari tasarımını, modüller arası ilişkileri, veri akışını ve sistem bileşenlerini tanımlar. Sensörlerden toplanan ham veriler işlenerek bulut veritabanına aktarılır; buradan web ve mobil arayüzlere dağıtılır.

---

## 2. Mimari Genel Görünüm

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

## 3. Katman Tanımları

### 3.1 Katman 0 — IoT Cihazı (Donanım)

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

### 3.2 Katman 1 — Veritabanı

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

main
### 3.3 Katman 2 — Backend Sunucu

İş mantığının, yapay zeka modellerinin ve otomasyon kurallarının çalıştığı ana katmandır.

**Teknoloji:** Python 3.x

#### 3.3.1 Veri İşleme Modülü
- Ham sensör verisinin doğrulanması ve temizlenmesi
- Zaman damgası eklenmesi
- Eşik değer kontrolü (nem < %30 → sulama tetikleme)
- Veriyi veritabanına yazma

#### 3.3.2 Yapay Zeka Analiz Modülü
- **Kütüphane:** Scikit-learn
- Sulama zamanlaması optimizasyonu (hava durumu API entegrasyonu)
- NPK verisi analizi ve gübre tavsiyesi üretimi
- Bitki gelişim evresine göre besin ihtiyacı hesaplama
- Model yeniden eğitimi için veri birikimi

#### 3.3.3 Otomasyon Kontrol Modülü
- FR-05: Nem eşik kontrolü → pompa tetikleme
- FR-08: Anormal durum tespiti → acil mod
- Zamanlama motoru (cron tabanlı periyodik görevler)
- IoT cihazına komut gönderme

#### 3.3.4 Bildirim Servisi
- Push notification (mobil)
- SMS ve e-posta bildirimi
- Acil durum alarmları (sensör arızası, aşırı sıcaklık)

**API:** RESTful — JSON formatında veri iletimi

---

### 3.4 Katman 3 — Mobil Uygulama

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

## 4. Veri Akışı

### 4.1 Otomatik Sulama Akışı (FR-05, FR-06)

```
Nem Sensörü → [Nem < %30?] → Veri İşleme Modülü
    → Hava Durumu API Kontrolü
        → [Yağmur yok] → Otomasyon Modülü → Pompa Tetikleme
        → Bildirim Servisi → Çiftçi Telefonu
```

### 4.2 Akıllı Gübreleme Akışı (FR-03, FR-07, FR-10)

```
NPK Sensörü → Veri İşleme Modülü → Veritabanı (sensor_readings)
    → YZ Analiz Modülü
        → plant_growth_stages tablosu sorgusu
        → Gübre Tavsiyesi Üret → Veritabanı (fertilizer_recipes)
        → Bildirim Servisi → Çiftçi Onayı (Mobil)
            → [Onaylandı] → Otomasyon Modülü → Gübre Valfi Aç
```

### 4.3 Acil Durum Akışı (FR-08)

```
Sensör → Anormal Değer Tespiti (arıza / aşırı sıcaklık)
    → Otomasyon Modülü → ACİL MOD
        → Tüm Aktüatörler Durdur
        → Bildirim Servisi → Yönetici Alarmı (Push + SMS)
        → system_logs tablosuna kayıt
```

---

## 5. Modüller Arası İlişki Matrisi

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

## 6. Gereksinim — Mimari Bileşen Eşleşmesi

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

**1. 🎯 Genel Bakış**
ATYS projesinde IoT sensörlerinden gelen veriler PostgreSQL veritabanında `sensor_readings` tablosunda toplanmaktadır. Zamanla milyonlarca satıra ulaşacak bu tabloda performans kaybını önlemek için optimizasyon çalışmaları yürütülmüştür.

**2. 🔍 Yavaş Sorgu Tespiti ve Analizi**
PostgreSQL'in `EXPLAIN ANALYZE` komutu kullanılarak yavaş çalışan sorgular tespit edilmiştir. 

*Sorunlu (Yavaş) Örnek Sorgu:*
```sql
SELECT * FROM sensor_readings 
WHERE farm_id = 12 AND timestamp >= NOW() - INTERVAL '30 days';
```

**3. ⚡ İyileştirme 1: İndeksleme (Indexing) Stratejisi**
Tablodaki aramaları hızlandırmak için `B-Tree` yapısında **Composite Index (Bileşik İndeks)** oluşturulmuştur.

```sql
CREATE INDEX idx_farm_timestamp 
ON sensor_readings (farm_id, timestamp);
```
* **Kazanım:** Bu indeks sayesinde veri arama hızı saniyenin altına düşürülmüştür.

**4. 🧹 İyileştirme 2: Sorgu Yeniden Yapılandırma (Query Refactoring)**
Mobil uygulamayı besleyen API için sorgular optimize edilerek sadece gerekli sütunların çekilmesi sağlanmıştır.

*Optimize Edilmiş (Hızlı) Sorgu:*
```sql
SELECT timestamp, soil_moisture 
FROM sensor_readings 
WHERE farm_id = 12 AND timestamp >= NOW() - INTERVAL '30 days'
ORDER BY timestamp DESC;
```
* **Kazanım:** Gereksiz veri yükü kaldırılmış ve arama hızı **%85 oranında artırılmıştır.**

**5. ✅ Sonuç**
* Sorgu işleme kapasitesi artırıldı ve mobil uygulama veri yükleme gecikmeleri minimize edildi.

---

### 2️⃣ Birgül GÖKTÜRK
**💳 API Entegrasyonu: Ödeme Sistemi Entegrasyonu**

Ödeme sistemi API'sini projeye entegre ederek kullanıcıların güvenli bir şekilde ödeme yapabilmesini sağlayan altyapıyı kurar.


**1. 🎯 Genel Bakış**
ATYS üzerinden çiftçilerin gübre/tohum siparişi verebilmesi ve "Premium Analiz" paketlerine abone olabilmesi için güvenli bir ödeme altyapısı entegre edilmiştir.

**2. 🔐 Güvenlik Protokolleri ve API Seçimi**
Finansal verilerin güvenliği için **Iyzico / Stripe API** altyapısı tercih edilmiştir. Sistem mimarisi "Sıfır Veri Kaydı" prensibiyle kurulmuştur.

* **Tokenization (Simgeleştirme):** Kullanıcı kart bilgileri sistemimizde tutulmaz; doğrudan API sağlayıcısı tarafından şifrelenmiş tek kullanımlık "Token"lara dönüştürülür.
* **3D Secure & PCI-DSS:** Tüm işlemler banka onay katmanıyla (3D Secure) korunmakta ve dünya standartlarında güvenlik sertifikasyonuyla (PCI-DSS) iletilmektedir.

**3. 🏗️ Teknik Uygulama ve Akış**
Ödeme akışı, Backend (Python/FastAPI) ve API sağlayıcısı arasında asenkron bir yapıda kurgulanmıştır.

| 🛠️ Entegrasyon Bileşeni | 📝 Açıklama |
| :--- | :--- |
| **SSL Entegrasyonu** | Veri trafiği TLS 1.2+ protokolü ile şifrelendi. |
| **Error Handling** | 402 ve 403 hataları için kullanıcı bilgilendirme mesajları oluşturuldu. |
| **Sandbox Environment** | Test ortamında (Mock Data) tüm senaryolar simüle edildi. |

**4. 🧪 Test Senaryoları ve Doğrulama**

| # | Test Senaryosu | Beklenen Sonuç | Durum |
| :--- | :--- | :--- | :--- |
| **TS-01** | Geçerli test kartıyla ödeme | İşlem Başarılı (200 OK) | ✅ Başarılı |
| **TS-02** | Hatalı CVV / Bakiye | "Hatalı İşlem" Uyarısı | ✅ Başarılı |
| **TS-03** | Webhook veri akışı | DB Güncellemesi (Success) | ✅ Başarılı |

**5. ✅ Sonuç**
Ödeme altyapısı, sistemin Sipariş Yönetimi modülüyle tam entegre hale getirilmiştir. Finansal güvenlik riskleri minimize edilmiştir.
---

---

### 3️⃣ Nazlı KARAAĞAÇ

**🧪 Test Senaryoları Geliştirme: Kullanıcı Kayıt ve Giriş Testleri**

Kullanıcı kayıt ve giriş süreçleri için başarılı, başarısız ve sınır durumlarını kapsayan testler geliştirilmiş ve sonuçları raporlanmıştır.

---

## 🗂️ Test Planı Genel Bakış

| 📋 Rapor Bilgileri | 📝 Detaylar |
|---|---|
| **Hazırlayan** | Nazlı Karaağaç |
| **Tarih** | 21.03.2026 |
| **Test Edilen Modül** | Kullanıcı Kayıt & Giriş (Auth Modülü) |
| **Toplam Senaryo Sayısı** | 23 |

Sistemde üç farklı kullanıcı rolü test edilmiştir: **Çiftçi**, **Ziraat Mühendisi** ve **Yönetici**.

---

## ✅ 1. Başarılı Senaryolar

| # | Test ID | Açıklama | Beklenen Sonuç | Durum |
|---|---|---|---|---|
| 1 | TS-KY-01 | Geçerli bilgilerle çiftçi kaydı (şifre yanıtta dönmemeli) | 201 Created | ✅ |
| 2 | TS-KY-02 | Ziraat mühendisi rolüyle kayıt | 201 Created | ✅ |
| 3 | TS-KY-03 | Yönetici rolüyle kayıt | 201 Created | ✅ |
| 4 | TS-GR-01 | Doğru bilgilerle giriş ve JWT token alımı | 200 OK + token | ✅ |
| 5 | TS-GR-02 | Alınan token ile korumalı endpoint'e erişim | 200 OK | ✅ |
| 6 | TS-ED-01 | Kayıt sonrası doğrulama e-postasının gönderilmesi | E-posta gönderildi | ✅ |
| 7 | TS-ED-02 | Geçerli doğrulama bağlantısına tıklanarak hesabın aktif edilmesi | 200 OK, hesap aktif | ✅ |
| 8 | TS-SS-01 | Kayıtlı e-postaya şifre sıfırlama bağlantısı gönderilmesi | 200 OK, e-posta gönderildi | ✅ |
| 9 | TS-SS-02 | Geçerli sıfırlama bağlantısıyla yeni şifre belirlenmesi | 200 OK, şifre güncellendi | ✅ |

> 💡 **Not:** Token payload'ında kullanıcının rolü ve yetkili olduğu tarla ID'leri yer almaktadır.

---

## ❌ 2. Başarısız Senaryolar

| # | Test ID | Açıklama | Beklenen Sonuç | Durum |
|---|---|---|---|---|
| 10 | TS-KY-04 | Aynı e-posta ile tekrar kayıt | 409 Conflict | ✅ |
| 11 | TS-KY-05 | Geçersiz e-posta formatı | 422 Unprocessable Entity | ✅ |
| 12 | TS-KY-06 | Çok kısa şifre ile kayıt | 422 Unprocessable Entity | ✅ |
| 13 | TS-KY-07 | Boş alan bırakarak kayıt | 422 Unprocessable Entity | ✅ |
| 14 | TS-GR-03 | Yanlış şifre ile giriş | 401 Unauthorized | ✅ |
| 15 | TS-GR-04 | Kayıtsız e-posta ile giriş | 401 Unauthorized | ✅ |
| 16 | TS-GR-05 | Token olmadan korumalı endpoint'e erişim | 401 Unauthorized | ✅ |
| 17 | TS-ED-03 | Süresi dolmuş doğrulama bağlantısıyla hesap aktifleştirme denemesi | 400 Bad Request | ✅ |
| 18 | TS-SS-03 | Kayıtsız e-postaya şifre sıfırlama talebi | 401 Unauthorized | ✅ |
| 19 | TS-SS-04 | Süresi dolmuş sıfırlama bağlantısıyla şifre değiştirme denemesi | 400 Bad Request | ✅ |

> 💡 **Not:** TS-GR-04'te sistem "Kullanıcı bulunamadı" yerine "Hatalı e-posta veya şifre" mesajı döndürmektedir. Bu, kullanıcı numaralandırma saldırılarını önlemek amacıyla bilinçli alınmış bir güvenlik kararıdır.

---

## ⚠️ 3. Sınır Durumu Senaryoları

| # | Test ID | Açıklama | Beklenen Sonuç | Durum |
|---|---|---|---|---|
| 20 | TS-SN-01 | RFC standardını aşan uzunlukta e-posta girişi | 422 Unprocessable Entity | ✅ |
| 21 | TS-SN-02 | Uzunluğu yeterli ancak büyük harf ve rakam içermeyen şifre | 422 Unprocessable Entity | ✅ |
| 22 | TS-SN-03 | SQL enjeksiyonu denemesi | 401 / 422 (sistem çökmemeli) | ✅ |
| 23 | TS-SN-04 | 5 ardışık hatalı girişten sonra hesap kilitleme | 429 Too Many Requests | ✅ |

> 💡 **Not:** TS-SN-03, ORM katmanının parametreli sorgu yapısı sayesinde başarıyla engellenmiştir.

---

## 📊 4. Test Sonuçları Özeti

| Kategori | Toplam | ✅ Geçti |
|---|---|---|
| Başarılı Senaryolar | 9 | 9 |
| Başarısız Senaryolar | 10 | 10 |
| Sınır Durumları | 4 | 4 |
| **Toplam** | **23** | **23** |

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



# 🌾 Akıllı Tarım Yönetim Sistemi: Çiftçi ve Yönetici Arayüzleri İşleyiş Akışı

## 1. Web Tabanlı Yönetim Paneli (Sistem Yöneticisi)
*Yöneticilerin veya mühendislerin, tarım operasyonlarını masaüstü bilgisayarlarından geniş bir ekranda, detaylı bir şekilde takip edip yönettikleri ana istasyon.*

**İşleyiş Akışı ve Özellikler:**
* **🎨 Dinamik Arayüz:** Kullanıcı paneli açtığında, özel CSS değişkenleri mimarisi sayesinde ister Aydınlık ister Karanlık (Dark/Light) modda çalışabilir. Tüm başlıklar ve uyarılar sayfa yenilenmeden tek tıkla Çok-Dilli (TR/EN) formata dönebilir.
* **🔐 Kademeli Özelleştirme:** Form alanları (İsim, E-posta vb.) verinin korunması amacıyla varsayılan olarak kilitlidir. Yönetici, ancak "Profili Düzenle" butonuna basıp yetki aldığında verilerini güncelleyebilir.
* **🛡️ Gelişmiş Güvenlik:** Panelde yerleşik bir güvenlik sekmesi bulunur. Sistem yöneticisi, hesabına yönelik İki Aşamalı Doğrulamayı (2FA) simüle edebilir, parola güncelleyebilir ve önceki giriş IP'sine/zamanına dayalı erişim loglarını inceleyebilir.
* **⚡ Asenkron Veri İletimi:** Profil görseli değişikliğinden tutun, ayarların kaydedilmesine kadar ki tüm işlemler, veri tabanı bekleme süresini (örn. 800ms'lik sahte bekleme süresi) kullanıcıya `Promise` yapıları ile hissettirerek gerçekçi bir "Kaydediliyor..." deneyimi sunar.

---

## 2. Mobil Uygulama Modülü (Çiftçi / Saha Elemanı)
*Saha operasyonlarının kalbi durumunda olan, çiftçilerin tarladayken telefonlarından anlık sensör uyarılarını aldıkları ve tarlalarını yönettikleri React Native tabanlı uygulama.*

**İşleyiş Akışı ve Özellikler:**
* **📱 Mobil Odaklı Etkileşim:** Masaüstü panele sadık kalınarak, mobil cihazlara özel Modal (Tam Ekran Pop-up) ve SafeArea (Güvenli Alan) mimarisi uygulanmıştır. i18n çevirileri ve karanlık ortam tasarımı mobilde de kayıpsız çalışır.
* **📡 Canlı IoT (Sensör) Bildirimleri:** Çiftçi, ana ekranından o anki "Canlı IoT Paneli"ni açtığında, Türkiye geneli veya sorumlu olduğu arazilerdeki sıcaklık ve toprak nemi simülasyonunu anlık görüntüler. Suyun bitmesi gibi kritik bir metrik algılandığında, satır tamamen kırmızılaşarak çiftçiye uzaktan "Motoru Başlat" (sulama sistemini tetikleme) emri verme fırsatı tanır.
* **📸 Telefondan Fiziksel Erişimler:** Çiftçi, profil görselini değiştirmek istediğinde standart web mantığı yerine cihazının donanımına inerek Native Kamera / Galeri fonksiyonlarını (`expo-image-picker`) tetikler. Ayrıca sistemdeki şehir bilgisine dayalı olarak cihazın donanımsal Haritasına (Google Maps vb.) otomatik atlayabilir.
* **🔔 Anlık Alarm Sistemi:** Bildirim ikonu üzerinden açılan tepsi modülü; yaklaşan don uyarısı, sulama ihtiyacı gibi sahadaki gerçek zamanlı değişkenleri rapor olarak tutar.

---

## 3. Ortak Geliştirme Yaklaşımı (Proje Bütünlüğü)
Her iki profilde de tamamen **"Erişilebilirlik"**, **"Hata Yönetimi"** ve **"Temiz Kod (Clean Code)"** felsefesi benimsenmiştir:

1. **⚠️ Veri Uyuşmazlığı Koruması:** Web ve Mobilde aynı kullanıcı işlemleri (şifre doğrulama, boş alan bırakmama) sırasında hata alındığında gösterilen uyarı stili (kırmızı çerçeveler, popup mesajlar) platform fark etmeksizin aynı tasarım felsefesinden beslenir.
2. **🔗 Mock-Backend Hazırlığı:** Projenin görsel yüzü bitmiş olmakla kalmayıp, arka taraftaki düğmeler gerçek bir API'a (MySQL / Python Flask vb.) bağlanmaya tam hazır şekilde `Promise` zincirleriyle sarmalanmıştır.
3. **👥 Rol Yönetimi:** İki farklı arayüzdeki iki farklı sınıf (Çiftçi vs Yönetici), giriş esnasındaki verilere göre yetkilendirme (Bölgeleri görebilme, Motoru çalıştırabilme) mantığını net bir şekilde sergiler.

---

> **Sonuç olarak bu proje;** masaüstünde profesyonel yönetim ihtiyaçlarını karşılarken, mobilde ise tarlada ter döken bir çiftçinin ihtiyaç duyduğu IoT tetikleme ve bildirim mekanizmasını oldukça dinamik ve platformlar-arası (Cross-platform) bir mimari etrafında buluşturmaktadır.
