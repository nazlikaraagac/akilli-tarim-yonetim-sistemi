# Akıllı Tarım Yönetim Sistemi - Web Yönetici Profili

Bu doküman, projede geliştirilen "Yönetici Profil Sayfası" modülünün yeteneklerini, içerdiği özellikleri ve kullanılan teknolojileri proje hocalarınıza/jüriye sunabileceğiniz bir formatta özetlemektedir.

## 🛠 Kullanılan Teknolojiler
Projenin bu aşamasında, harici ağır kütüphanelere (React, Vue vb.) başvurulmadan, yazılım mühendisliği temellerini kanıtlamak amacıyla tamamen temiz ve modern standartlar kullanılmıştır:
- **HTML5:** Yapısal ve semantik DOM mimarisi, `data-i18n` özellikleri ile veri bağlama.
- **CSS3 (Vanilla):** CSS değişkenleri (`var(--primary)`, `var(--bg-color)`) kullanılarak dinamik tema yeteneği ve Flexbox/Grid ile modern *Dashboard* dizilimi.
- **JavaScript (ES6+):** Tarayıcı tabanlı asenkron form doğrulama, `FileReader` ile Base64 görsel okuma işlemleri, anlık dil çevirisi ve `localStorage` API ile veri kalıcılığı simülasyonu.
- **Dış Değerler:** Google Fonts (Inter) ve FontAwesome (Özel ikonlar).

## ✨ Geliştirilen Özellikler ve Modüller

### 1. Dinamik Tema ve Çoklu Dil Altyapısı (UI/UX)
- **Karanlık / Aydınlık Mod (Dark & Light Theme):** Sağ üstte bulunan buton ile sayfanın tüm renk haritası anında değiştirilebilir ve bu tercih tarayıcı hafızasında saklanır.
- **Gerçek Zamanlı Dil Desteği (i18n):** Açılır menüden "İngilizce (EN)" veya "Türkçe (TR)" geçişi yapıldığında; sayfa yenilenmeden tüm başlıklar, butonlar, menüler ve hatta hata uyarı bildirimleri anlık olarak seçilen dile çevrilir. Sistemin bütünü çok-dilli (i18n) bir sözlük mimarisine bağlanmıştır.

### 2. Kişisel Bilgiler ve Profil Düzenleme
- **Akıllı Düzenleme Modu:** Verilerin yanlışlıkla silinmesini veya değiştirilmesini engellemek için tüm bilgi alanları varsayılan olarak kilitlidir (Sadece Okunur / Readonly). Kullanıcı bilinçli olarak *"Profili Düzenle"* butonuna basınca sistem düzenleme (Edit) moduna geçer.
- **Sistem İçi Klasifikasyon:** Kullanıcı kimliğini belirten, asla değiştirilemeyen, kilitli "Yönetici ID" (Örn: `#ADM-101`) ve "Kullanıcı Rolü" özellikleri sunulur.
- **Profil Fotoğrafı Yönetimi:** Kullanıcının bilgisayarından seçtiği bir fotoğraf (PNG/JPG), `FileReader` kullanılarak **Base64** formatında kodlanıp sisteme entegre edilir. "Kaldır" (Sil) fonksiyonu ile görsel silinip anında harfe duyarlı (Örn: ui-avatars servisiyle üretilen) yeni jenerik bir görsele dönüştürülebilir.

### 3. Kullanıcı Güvenliği Modülü (Securities)
- **İki Aşamalı Doğrulama (2FA):** Gerçekçi bir dashboard hissiyatı için iOS tasarım dilinden esinlenilmiş özel CSS Anahtar düğmesi (Toggle Switch) eşliğinde, kullanıcıya 2FA yetkisi açma imkanı sunulur. Durum LocalStorage'a aktarılır.
- **Giriş Geçmişi (Last Login Activity):** Sisteme her giriş yapıldığında erişim zamanı loglanır (kaydedilir) ve bir sonraki bağlantıda *"Son Giriş: [Tarih/Saat] - Şu anki Cihaz"* estetiği ile güncellenmiş güvenlik takibi sağlar.
- **Anlık (Real-time) Şifre Validasyonu:** Kullanıcı *"Yeni Şifre"* ve *"Şifre Tekrar"* alanlarını doldururken, her klavye tuşuna bastığında şifrelerin eşleşip eşleşmediğini JavaScript dinler. Eşleşmiyorsa hatalı alanlar kırmızı işaretlenir; eşleşirse yeşile dönerek kaydedilmesine izin verilir. Ayrıca varsayılan "Mevcut Şifre" (`password123`) doğru girilmeden değişiklik yapılamaz.
- **Güvenli Çıkış (Oturum Yönetimi):** Menüye entegre edilen "Çıkış Yap" butonu ile kullanıcıların oturumlarını güvenli bir şekilde sonlandırması sağlanır. Çıkış işlemi sırasında kullanıcıya sistem bildirimi (alert) sunularak güvenli çıkış yönlendirmesi simüle edilir; modül aynı zamanda sistemin i18n çeviri altyapısına tam uyumlu çalışır.

### 4. Bildirim Yönetimi
- Sistemden alınacak e-posta duyuruları, SMS alarmları (Sensör sıcaklığı düştüğünde uyarı gibi) ve tarayıcı içi bildirim izinlerinin yönetilebileceği onay kutusu (checkbox) tabanlı bir form yapısı oluşturuldu. Tercihler veri tabanı mantığıyla tarayıcı belleğine aktarılır.

### 5. Backend Simülasyonu ve API Hazırlığı
Tam teşekküllü bir veritabanı bağlanmadan önce sitenin tamamen interaktif olması için **Mock API (Sahte Backend)** mantığı yazılmıştır:
- Form gönderimlerinde ağ beklemesini simüle eden `Promise` bazlı `setTimeout` gecikmeleri uygulanmıştır. (örn: "Kaydediliyor..." yazıp 800ms beklemesi). Gelişmiş "Alert" fonksiyonu (hata veya başarı bildirimleri) entegredir.
- Gerçek bir `fetch` isteğinde (Temsili olarak POST/PUT methodlarıyla) yollanacak tüm veriler (Payloads) JSON formatında yapılandırılmış ve JavaScript içerisinde hazırda durmaktadır. 
- Sunucu katmanında, Python (Flask/FastAPI) ve MySQL geliştirilmesine kılavuz olması amacıyla şifre hash algoritmalarını barındıran örnek bir dosya da (backend_taslak.py) klasör yapısına proje geneli için delege edilmiştir.

---
*Özetle; bir akıllı tarım tesisinin idari yönetiminde, profesyonel vizyona sahip, iş güvenliğini (2FA, erişim logu) ve kullanıcı deneyimini (Dark mode, i18n, Modüler Düzenleme) önceleyen eksiksiz bir arayüz modülü elde edilmiştir.*
