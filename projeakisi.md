# 🌾 Akıllı Tarım Yönetim Sistemi - Gereksinim Analizi Raporu

**Proje Adı:** Akıllı Tarım Yönetim Sistemi
**Takım:** Sıfır Hata Timi
**Hazırlayan:** Özgür Ulusoy
**Tarih:** 06.03.2026

---

## 1. Proje Tanımı ve Amacı
Bu proje, tarımsal alanlarda verimliliği maksimize etmek amacıyla **IoT (Nesnelerin İnterneti)** ve **Yapay Zeka** destekli bir otomasyon sistemi geliştirmeyi hedefler. Sistem, sadece sulama süreçlerini yönetmekle kalmaz; aynı zamanda toprağın mineral ve besin değerlerini analiz ederek bitkinin ihtiyacına uygun akıllı gübreleme önerileri sunar. Amaç, su ve gübre israfını önleyerek rekolteyi artırmaktır.

---

## 2. İşlevsel Gereksinimler (Functional Requirements)
Sistemin gerçekleştireceği temel fonksiyonlar aşağıda listelenmiştir:

### 2.1. Veri Toplama
* **FR-01:** Sistem, toprağın nem oranını anlık olarak ölçmelidir.
* **FR-02:** Sistem, ortam sıcaklığı ve hava nemi verilerini sensörler aracılığıyla toplamalıdır.
* **FR-03: (YENİ)** Sistem, toprağın verimliliğini belirleyen temel makro besin elementlerini (Azot-N, Fosfor-P, Potasyum-K) belirli aralıklarla ölçmelidir.
* **FR-04:** Toplanan tüm veriler (Nem, Sıcaklık, NPK Değerleri) tarih etiketiyle veritabanına kaydedilmelidir.

### 2.2. Karar Destek ve Otomasyon
* **FR-05:** Toprak nem oranı belirlenen eşik değerin altına düştüğünde sistem otomatik olarak sulama motorunu tetiklemelidir.
* **FR-06:** Yapay Zeka modülü (**Scikit-learn**), hava durumu ve toprak verilerini analiz ederek sulama zamanlamasını optimize etmelidir.
* **FR-07: (YENİ)** Sistem, sensörlerden gelen mineral verilerini analiz ederek bitkinin gelişim evresine uygun "Gübreleme Tavsiyesi" oluşturmalıdır (Örn: "Fosfor seviyesi düşük, kök gelişimi için takviye gerekli").
* **FR-08:** Anormal durumlar (sensör arızası veya aşırı sıcaklık) tespit edildiğinde sistem acil durum moduna geçmeli ve yöneticiyi uyarmalıdır.

### 2.3. Kullanıcı Etkileşimi
* **FR-09:** Çiftçi, mobil uygulama üzerinden tarlasının su ve mineral durumunu grafiksel olarak görüntüleyebilmelidir.
* **FR-10:** Sistem, oluşturduğu gübreleme reçetelerini (Hangi gübre, ne kadar miktar) kullanıcı onayına sunmalıdır.

---

## 3. Teknik Gereksinimler (Technical Requirements)

### 3.1. Donanım (Hardware)
* **Mikrodenetleyici:** Raspberry Pi veya Arduino.
* **Temel Sensörler:** Kapasitif Toprak Nem Sensörü, DHT22 (Sıcaklık/Nem).
* **Gelişmiş Sensörler (YENİ):** NPK Sensörü (Toprak Azot, Fosfor, Potasyum ve pH ölçümü için).
* **Aktüatörler:** 12V Su Pompası / Röle Modülü.

### 3.2. Yazılım ve Altyapı (Software)
* **Programlama Dili:** Python 3.x (Backend ve AI modelleri için).
* **Veritabanı:** MySQL veya PostgreSQL.
* **Yapay Zeka Kütüphanesi:** Scikit-learn (Veri analizi, sulama ve gübreleme tahminleme modelleri için).
* **Versiyon Kontrol:** Git & GitHub.
* **IDE:** Visual Studio Code.

---

## 4. Kullanıcı Senaryoları (User Scenarios)

### Senaryo 1: Otomatik Sulama Süreci
1. Sensörler toprağın kuruduğunu tespit eder (Nem < %30).
2. Python kodu bu veriyi işler ve hava durumu API'sini kontrol eder (Yağmur beklenmiyorsa).
3. Sistem su motorunu çalıştırır ve çiftçiye bildirim gönderir.

### Senaryo 2: Akıllı Gübreleme ve Besin Analizi (YENİ)
1. NPK Sensörü, toprakta Azot (N) miktarının kritik seviyenin altına düştüğünü tespit eder.
2. Sistem, bitkinin büyüme dönemini (Örn: Yapraklanma dönemi) veritabanından kontrol eder.
3. Yapay zeka, "Bitkinin yeşil aksam gelişimi için Azot takviyesi gereklidir" sonucunu çıkarır.
4. Çiftçinin telefonuna: "Dikkat! Azot eksikliği tespit edildi. Dönüm başına X kg Üre gübresi öneriliyor." bildirimi düşer.

### Senaryo 3: Çiftçi Gözlem Ekranı
1. Kullanıcı uygulamayı açar.
2. Ana ekranda "Nem: %55", "Sıcaklık: 24°C" ve "Toprak Sağlığı: İyi (%85)" bilgilerini görür.
3. Geçmiş raporlara bakarak geçen ay ne kadar gübre kullandığını inceler.
