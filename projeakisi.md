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
