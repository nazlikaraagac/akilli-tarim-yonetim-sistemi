# 🌾 Akıllı Tarım Yönetim Sistemi (ATYS) - Proje Akışı

**👥 Grup Adı:** Sıfır Hata Timi  
**🎓 Grup Yöneticisi:** Nazlı Karaağaç

---

### 🚀 1. Hafta Görev Dağılımı (Sıralı İş Akışı)

1. **Miraç Özcan Ağcabay:** Proje Analizi ve Kapsam Belirleme (✅ Tamamlandı)
2. **Özgür Ulusoy:** Gereksinim Toplama ve Belgeleme (✅ Tamamlandı)
3. **Birgül Göktürk:** Teknoloji Araştırması ve Seçimi (✅ Tamamlandı)
4. **Arda Yeşil:** Proje Mimari Tasarımı (📋 Devam Ediyor)
5. **Nazlı Karaağaç:** Geliştirme Ortamı Kurulumu (📋 Devam Ediyor)

---

## 📅 Haftalık İlerleme Raporu

### **🚀 1. Hafta: Planlama, Analiz ve Altyapı Kurulumu**

Bu hafta projenin temel taşları atılmış, analiz çalışmaları tamamlanmış ve geliştirme ortamları hazırlanmıştır. Yapılan çalışmalar iş akış sırasına göre aşağıdadır:

---

### 1️⃣ Miraç Özcan AĞCABAY
**🎯 Proje Analizi ve Kapsam Belirleme**
* Sistemde kullanılacak temel işlevler belirlenerek, projenin hangi tarımsal ihtiyaçlara çözüm sunacağı ve sınırları netleştirilmiştir.

#### 🌾 Proje Analizi ve Kapsam Belirleme Raporu

| 📋 Proje Bilgileri | 📝 Detaylar |
| :--- | :--- |
| **Hazırlayan** | Miraç Özcan Ağcabay |
| **Tarih** | 07.03.2026 |
| **Konu** | Proje Analizi ve Kapsam |

#### 🎯 1. Proje Tanımı ve Amacı
Bu proje, tarım alanlarında verimliliği artırmak ve doğal kaynakların daha etkin kullanılmasını sağlamak amacıyla geliştirilecek bir **Akıllı Tarım Yönetim Sistemini** kapsamaktadır.

Sistem, **IoT sensörleri** aracılığıyla toplanan çevresel verileri analiz ederek çiftçilere ve ziraat mühendislerine karar destek sağlayacaktır. Toprak nemi, sıcaklık, hava nemi ve diğer çevresel veriler analiz edilerek **sulama, gübreleme ve ilaçlama** gibi tarımsal faaliyetler optimize edilecektir.

#### 📊 2. Proje Hedefleri
* [ ] Tarla sensörlerinden veri toplayan bir sistem geliştirmek.
* [ ] Toplanan verileri analiz ederek tarımsal karar destek mekanizması oluşturmak.
* [ ] Çiftçilerin mobil uygulama üzerinden tarla durumunu takip edebilmesini sağlamak.
* [ ] Ziraat mühendisleri ve yöneticiler için web tabanlı yönetim paneli geliştirmek.
* [ ] Makine öğrenmesi algoritmaları kullanarak verim tahmini ve öneri sistemi oluşturmak.

#### 👥 3. Paydaş Analizi
| 👤 Paydaş | 🛠️ Rolü |
| :--- | :--- |
| **Çiftçiler** | Tarla durumunu mobil uygulama üzerinden takip eder ve önerileri uygular. |
| **Ziraat Mühendisleri** | Tarımsal analiz yapar ve çiftçilere teknik destek sağlar. |
| **Tarım İşletmesi Yöneticileri** | Web panel üzerinden sistem yönetimini gerçekleştirir. |
| **Yazılım Geliştiriciler** | Sistem geliştirme ve bakım süreçlerinden sorumludur. |
| **Sensör Sağlayıcıları** | Tarla sensör altyapısını sağlar. |

#### 📦 4. Proje Kapsamı
* **Sensör Veri Toplama Modülü:** Toprak nemi, sıcaklık, hava nemi, ışık, pH verileri toplanır.
* **Veri Analizi ve Karar Destek:** Sulama, gübreleme, bitki sağlığı uyarıları ve verim tahmini yapılır.
* **Mobil Uygulama (Çiftçiler için):** Sensör verisi görüntüleme, bildirimler ve takip.
* **Web Yönetim Paneli:** Sensör yönetimi, analiz, raporlama ve ayarlar.

#### 🧰 5. Kullanılacak Teknolojiler
| 💻 Teknoloji | 🎯 Kullanım Amacı |
| :--- | :--- |
| **Python** | Veri işleme ve analiz |
| **IoT Sensörleri** | Tarla verilerinin toplanması |
| **MySQL** | Veritabanı yönetimi |
| **Scikit-learn** | Makine öğrenmesi |

---

### 2️⃣ Özgür ULUSOY
**📝 Gereksinim Toplama ve Belgeleme**
* Çiftçilerin ve yöneticilerin ihtiyaç duyacağı anlık bildirim, raporlama ve otomatik sulama gibi fonksiyonel gereksinimler maddeler halinde listelenmiştir.

#### 🌾 Gereksinim Analizi Raporu

| Proje Bilgileri | Detaylar |
| :--- | :--- |
| **Hazırlayan** | Özgür Ulusoy |
| **Tarih** | 07.03.2026 |

#### 1. 🎯 Proje Tanımı ve Amacı
Proje, IoT ve Yapay Zeka destekli otomasyon ile verimliliği artırmayı, **akıllı gübreleme ve sulama** önerileri sunarak kaynak israfını önlemeyi hedefler.

#### 2. ⚙️ İşlevsel Gereksinimler (Functional Requirements)
* **2.1. Veri Toplama:** Nem (FR-01), Sıcaklık/Hava Nemi (FR-02), **NPK Değerleri (FR-03)**, Veritabanı Kaydı (FR-04).
* **2.2. Karar Destek:** Otomatik Sulama (FR-05), YZ Analizi (FR-06), **Gübreleme Tavsiyesi (FR-07)**, Acil Durum Modu (FR-08).
* **2.3. Kullanıcı Etkileşimi:** Mobil İzleme (FR-09), Gübreleme Onayı (FR-10).

#### 3. 🛠️ Teknik Gereksinimler
* **Donanım:** Raspberry Pi/Arduino, Kapasitif Nem Sensörü, DHT22, **NPK Sensörü**, Su Pompası.
* **Yazılım:** Python 3.x, MySQL/PostgreSQL, Scikit-learn, Git & GitHub, VS Code.

#### 4. 🎬 Kullanıcı Senaryoları
* **Senaryo 1 (Sulama):** Nem <%30 -> Yağmur Kontrolü -> Pompa Çalıştır -> Bildirim.
* **Senaryo 2 (Gübreleme):** NPK Sensörü (Azot Düşük) -> Gelişim Evresi Kontrolü -> "Azot Takviyesi Gerekli" Bildirimi.
* **Senaryo 3 (İzleme):** Mobil uygulama üzerinden nem, sıcaklık ve sağlık skoru takibi.

---

### 3️⃣ Birgül GÖKTÜRK
**🤖 Teknoloji Araştırması ve Seçimi**
* Projenin yapay zeka ayağı için Python (Scikit-learn), veri saklama için MySQL ve donanım tarafında kullanılacak IoT sensör modelleri (DHT22, NPK Sensörü vb.) kararlaştırılmıştır.

---

### 4️⃣ Arda YEŞİL
**🏗️ Proje Mimari Tasarımı**

#### 1. Genel Bakış
IoT ve Yapay Zeka destekli sistemin mimarisi, sensörlerden buluta ve oradan kullanıcı arayüzlerine uzanan veri akışını tanımlar.

#### 2. Mimari Genel Görünüm
