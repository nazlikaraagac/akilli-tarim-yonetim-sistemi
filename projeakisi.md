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





# 🚀 4. Hafta Görevleri ve Detaylar

## 👤 1️⃣ Arda Yeşil
**1) Sistem Entegrasyonu ve Test Planı Oluşturma 🔗**  
Sensör veri toplama modülü, veri analiz sistemi, mobil uygulama ve web arayüzünün nasıl entegre edileceğini planlanır. Her bir modülün birbiriyle nasıl iletişim kuracağı ve veri alışverişi yapacağı belirlenir. Entegrasyon testleri için bir test planı oluşturulur. Test senaryolarını, test verilerini ve test ortamı tanımlanır.  

**2) Proje Dokümantasyonu: API ve Veritabanı Entegrasyonu 📄**  
Hafta 3'teki API tasarımını ve bu haftaki API entegrasyonunu detaylı bir şekilde dokümante edilir. Veritabanı şemasını ve API endpoint'lerini açıklayan teknik doküman oluşturulur.  

---

## 👤 2️⃣ Nazlı Karaağaç
**1) Mobil Uygulama ve Web Arayüzü Kullanıcı Arayüzü (UI) ve Kullanıcı Deneyimi (UX) Tasarımı 🎨**  
Çiftçiler için mobil uygulama ve yöneticiler için web arayüzü için kullanıcı dostu arayüzler tasarlanır. Her iki platformun da temel işlevlerini (veri görselleştirme, kontrol paneli, alarm yönetimi vb.) göz önünde bulundurulur. Kullanıcı senaryoları oluşturulur ve arayüz tasarımları bu senaryolara göre şekillendirilir. Arayüz tasarımları prototip olarak oluşturulur ve kullanıcı geri bildirimleri toplanır.  

**2) Test Senaryoları Oluşturma ve Uygulama: Kullanıcı İşlemleri 🧪**  
Hafta 3'te belirlenen kullanıcı hikayeleri için test senaryoları oluşturulur. Oluşturulan senaryoları kullanarak kullanıcı işlemlerinin (oluşturma, güncelleme, silme) testlerini gerçekleştirilir ve sonuçları raporlanır.  


**🧪 Test Senaryoları Geliştirme: Kullanıcı İşlemleri Test Raporu**

| 📋 Bilgi | 📝 Detay |
|---|---|
| **Kapsam** | Kullanıcı Oluşturma · Güncelleme · Silme · Giriş |
| **İlgili Gereksinimler** | FR-08, FR-09 |
| **İlgili Tablo** | `users` |

---

#### 1. 📋 Kullanıcı Hikayeleri

| 🆔 | 👤 Aktör | 📝 İstek | 🎯 Amaç |
|---|---|---|---|
| UH-01 | Çiftçi | Sisteme yeni hesap oluşturmak istiyorum | Tarla verilerimi takip edebilmek için giriş yapabileyim |
| UH-02 | Çiftçi | Profil bilgilerimi güncellemek istiyorum | Ad, telefon ve tarla bilgilerimi güncel tutabileyim |
| UH-03 | Çiftçi | Hesabımı silmek istiyorum | Kişisel verilerimin sistemden kaldırılmasını istiyorum |
| UH-04 | Ziraat Mühendisi | Geçersiz bilgiyle kayıt yapılamamalı | Sistem tutarsız verilerle kirlenmesin |
| UH-05 | Yönetici | Yetkisiz kullanıcı giriş yapamamalı | Sistem güvenliği korunsun |

---

#### 2. 🧪 Test Senaryoları ve Sonuçlar

| 🆔 | İşlem | Senaryo | Test Verisi / Koşul | Beklenen Sonuç | Durum |
|---|---|---|---|---|---|
| TS-C01 | CREATE | Başarılı kayıt | Geçerli ad, e-posta, şifre, rol | Kullanıcı `users`'a eklenir, giriş ekranına yönlendirilir | ✅ |
| TS-C02 | CREATE | Kayıtlı e-posta ile tekrar kayıt | `ahmet@tarim.com` zaten mevcut | `"Bu e-posta zaten kullanılıyor."` hatası, kayıt gerçekleşmez | ✅ |
| TS-C03 | CREATE | Zorunlu alan boş | Ad alanı boş bırakılmış | Form doğrulama hatası, kayıt gerçekleşmez | ✅ |
| TS-C04 | CREATE | Zayıf şifre (sınır durumu) | Şifre: `123` | `"Şifre en az 8 karakter, 1 büyük harf ve 1 özel karakter içermeli."` uyarısı | ✅ |
| TS-U01 | UPDATE | Başarılı profil güncelleme | Telefon: `0532 111 22 33` → `0542 999 88 77` | `phone` sütunu güncellenir, başarı mesajı gösterilir | ✅ |
| TS-U02 | UPDATE | Başkasına ait e-postayla güncelleme | Yeni e-posta başka hesaba ait | `"Bu e-posta başka bir hesaba ait."` hatası, güncelleme gerçekleşmez | ✅ |
| TS-U03 | UPDATE | Geçersiz telefon formatı (sınır durumu) | Telefon: `abcdef` | `"Lütfen geçerli bir telefon numarası girin."` uyarısı | ✅ |
| TS-D01 | DELETE | Başarılı hesap silme | Kullanıcı onayı verildi | Kayıt `users`'dan kaldırılır, oturum sonlandırılır | ✅ |
| TS-D02 | DELETE | Onay vermeden silme iptali | Onay kutusunda "İptal" seçildi | İşlem gerçekleşmez, kullanıcı profil sayfasında kalır | ✅ |
| TS-D03 | DELETE | Yetkisiz hesap silme (güvenlik) | Çiftçi rolü, farklı `user_id` ile DELETE isteği | `403 Forbidden` döner, işlem gerçekleşmez | ✅ |
| TS-L01 | LOGIN | Başarılı giriş | Geçerli e-posta ve şifre | Oturum açılır, Dashboard'a yönlendirilir | ✅ |
| TS-L02 | LOGIN | Yanlış şifreyle giriş | Doğru e-posta, yanlış şifre | `"E-posta veya şifre hatalı."` mesajı, giriş reddedilir | ✅ |
| TS-L03 | LOGIN | Kayıtsız e-postayla giriş | Sistemde olmayan e-posta | `"E-posta veya şifre hatalı."` mesajı | ✅ |

---

#### 3. 📊 Sonuç Özeti

| Test Grubu | Toplam | ✅ Geçti | ❌ Başarısız |
|---|---|---|---|
| Oluşturma (CREATE) | 4 | 4 | 0 |
| Güncelleme (UPDATE) | 3 | 3 | 0 |
| Silme (DELETE) | 3 | 3 | 0 |
| Giriş (LOGIN) | 3 | 3 | 0 |
| **TOPLAM** | **13** | **13** | **0** |

Tüm senaryolar başarıyla tamamlanmıştır. FR-09 kapsamındaki profil işlemleri
ve FR-08 kapsamındaki yetkisiz erişim koruması (TS-D03) doğrulandı. Miraç
Ağcabay'ın geliştirdiği profil sayfası tüm senaryolarda beklenen davranışı
sergiledi.

---

## 👤 3️⃣ Birgül Göktürk
**1) Makine Öğrenmesi Algoritmaları Araştırması ve Seçimi 🤖**  
Sulama, gübreleme ve ilaçlama optimizasyonu için kullanılabilecek makine öğrenmesi algoritmaları (regresyon, sınıflandırma, kümeleme vb.) araştırılır. Her algoritmanın avantajlarını, dezavantajlarını ve veri gereksinimleri değerlendirilir. Proje gereksinimlerine en uygun algoritmaları belirlenir ve nedenlerini açıklayan bir rapor oluşturulur.  

**2) API Entegrasyonu: Kullanıcı Kimlik Doğrulama (Authentication) 🔐**  
Hafta 3'te tasarlanan API'ye kullanıcı kimlik doğrulama (authentication) entegrasyonu yapılır. Giriş, kayıt ve şifre sıfırlama işlevleri API üzerinden yönetilir.  

---

## 👤 4️⃣ Özgür Ulusoy
**1) Veritabanı Tasarımı ve Veri Modeli Oluşturma 🗄️**  
MySQL veritabanı için gerekli tablolar (sensör verileri, ürün bilgileri, kullanıcı bilgileri vb.) ve ilişkileri belirlenir. Her tablo için uygun veri tiplerini ve boyutları tanımlanır. Veri modelini oluştururken normalizasyon prensiplerine dikkat edilmesi gerekir. Veri güvenliği ve yedekleme stratejileri planlanır. Veritabanı şemasını ve veri modeli bir doküman halinde sunulur.  

**2) Kullanıcı Arayüzü (UI) Geliştirmesi: Profil Sayfası 💻**  
Hafta 3'teki UI tasarımına uygun olarak kullanıcı profil sayfası geliştirilir. Kullanıcının bilgilerini görüntüleme, düzenleme ve kaydetme işlevleri tamamlanır.  

---

## 👤 5️⃣ Miraç Özcan Ağcabay
**1) IoT Sensörleri Veri Toplama Modülü Gereksinim Analizi 📡**  
Kullanılacak IoT sensörlerinin (toprak nemi, sıcaklık, ışık vb.) veri formatlarını, iletişim protokollerini ve enerji tüketimleri detaylı olarak araştırılır. Toplanacak verilerin sıklığı, doğruluğu ve güvenilirliği ile ilgili gereksinimleri belirlenir. Bu gereksinimleri karşılayacak sensör teknolojilerini ve veri toplama yöntemleri değerlendirilir. Bulgular bir rapor halinde sunulur.  

**2) Veritabanı Optimizasyonu ve Performans Testleri ⚡**  
Hafta 3'te oluşturulan veritabanı şeması optimize edilir. Sorgu performansını artırmak için gerekli indekslemeler yapılır ve performans testleri ile sonuçları belgelenir.  

