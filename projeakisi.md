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

### 4️⃣ Arda YEŞİL
* **🏗️ Proje Mimari Tasarımı**
* 
    * Sensörlerden gelen verilerin bulut veritabanına aktarılması ve oradan web/mobil arayüzlere dağıtılmasını sağlayan sistem mimarisi kurgulanmıştır.

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

Kullanıcı kayıt ve giriş süreçleri için başarılı, başarısız ve sınır durumlarını kapsayan detaylı test senaryoları geliştirir.

---

### 4️⃣ Arda YEŞİL
**🐛 Hata Ayıklama ve Düzeltme: Bildirilen Hataların Giderilmesi**

Hata takip sisteminde bildirilen teknik aksaklıkları inceleyerek nedenlerini tespit eder ve düzeltmelerini gerçekleştirir.

---

### 5️⃣ Miraç Özcan AĞCABAY
**📱 Kullanıcı Arayüzü Geliştirmesi: Profil Sayfası Tasarımı ve Entegrasyonu**

Kullanıcı profil sayfasının görsel tasarımını tamamlayarak mevcut sisteme entegrasyonunu ve bilgi güncelleme özelliklerini hazırlar.

