# 💻 ATYS - Web Yönetici Paneli Ekran Görüntüleri

Bu belgede Web Yönetici Paneli'nin tüm işlevsel ekranlarının görüntüleri ve kısa açıklamaları yer almaktadır.

---

## 1. Dashboard (Ana Panel)
Yöneticinin sisteme girdiğinde karşılaştığı genel özet ekranı. 
* **İşlevler:** Aktif tarla sayısı, sistem sağlığı gibi KPI kartları, Nem/Sıcaklık ve NPK Chart.js grafikleri, anlık alarmlar ve sulama durumu tablosu.
*(Buraya index.html sayfasının ekran görüntüsünü ekleyin)*
![Dashboard Ekranı](ekran_goruntuleri/web_1_dashboard.png)

---

## 2. Tarla ve Sensör Yönetimi
Sisteme kayıtlı tarlaların detaylı durumları.
* **İşlevler:** Tarlaların toprak nemi, sıcaklık ve NPK durumlarını gösteren renkli kartlar. Alt kısımda ise sahadaki tüm donanımların (Kapasitif Nem, DHT22 vb.) çevrimiçi/çevrimdışı durumunu gösteren sensör envanter tablosu.
*(Buraya tarlalar.html sayfasının ekran görüntüsünü ekleyin)*
![Tarlalar Ekranı](ekran_goruntuleri/web_2_tarlalar.png)

---

## 3. Alarm Yönetimi
Sistemdeki tüm uyarı ve kritik durumların yönetildiği merkez.
* **İşlevler:** Kritik, Uyarı ve Bilgi seviyesine göre renklendirilmiş filtreli tablo. Yöneticinin müdahale edip alarmı "Çözüldü" olarak işaretleyebildiği onay butonları.
*(Buraya alarm.html sayfasının ekran görüntüsünü ekleyin)*
![Alarm Yönetimi Ekranı](ekran_goruntuleri/web_3_alarm.png)

---

## 4. Raporlar ve Analiz
Geçmişe dönük tarımsal verilerin analiz edildiği bölüm.
* **İşlevler:** Aylık sulama ve gübre kullanım barları, YZ verim tahmini çizgisel grafiği. Alt kısımda MySQL `sensor_readings` tablosunun veritabanı yansıması (kayıt sayısı, DB boyutu).
*(Buraya raporlar.html sayfasının ekran görüntüsünü ekleyin)*
![Raporlar Ekranı](ekran_goruntuleri/web_4_raporlar.png)

---

## 5. Kullanıcı Yönetimi
Sisteme erişimi olan kişilerin (Çiftçi, Ziraat Mühendisi) listesi.
* **İşlevler:** Rol bazlı listeleme, "Yeni Kullanıcı Ekle" modal penceresi ve MySQL `users` tablosu şeması gösterimi.
*(Buraya kullanicilar.html sayfasının ekran görüntüsünü ekleyin)*
![Kullanıcı Yönetimi Ekranı](ekran_goruntuleri/web_5_kullanicilar.png)

---

## 6. Profil ve Hesap Ayarları
Yöneticinin kendi hesap bilgilerini düzenlediği alan.
* **İşlevler:** Profil bilgileri güncelleme, İki Aşamalı Doğrulama (2FA) aç/kapat, şifre değiştirme ve bildirim tercihleri paneli.
*(Buraya profil.html sayfasının ekran görüntüsünü ekleyin)*
![Profil Ekranı](ekran_goruntuleri/web_6_profil.png)
