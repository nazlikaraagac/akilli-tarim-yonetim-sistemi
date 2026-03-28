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

---

### 3️⃣ Nazlı KARAAĞAÇ

**🧪 Test Senaryoları Geliştirme: Kullanıcı Kayıt ve Giriş Testleri**

Kullanıcı kayıt ve giriş süreçleri için başarılı, başarısız ve sınır durumlarını kapsayan testler geliştirilmiş ve sonuçları raporlanmıştır.

---

## 🗂️ Test Planı Genel Bakış

| 📋 Rapor Bilgileri | 📝 Detaylar |
|---|---|
| **Hazırlayan** | Nazlı Karaağaç |
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

---

### 5️⃣ Miraç Özcan AĞCABAY
**📱 Kullanıcı Arayüzü Geliştirmesi: Profil Sayfası Tasarımı ve Entegrasyonu**

Kullanıcı profil sayfasının görsel tasarımını tamamlayarak mevcut sisteme entegrasyonunu ve bilgi güncelleme özelliklerini hazırlar.

