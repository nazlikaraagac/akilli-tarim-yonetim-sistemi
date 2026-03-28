# Akıllı Tarım Yönetim Sistemi - Mobil Çiftçi Profili

Bu doküman, projede React Native kullanılarak geliştirilen "Çiftçi Profil Sayfası" modülünün yeteneklerini, içerdiği özellikleri ve kullanılan teknolojileri proje hocalarınıza/jüriye sunabileceğiniz bir formatta özetlemektedir.

## 🛠 Kullanılan Teknolojiler
Mobil uygulama, modern komponent tabanlı bir mimariyle geliştirilmiş olup, akıcı bir kullanıcı deneyimi hedeflenmiştir:
- **React Native & Expo:** Platformlar arası (iOS/Android) doğal mobil deneyim sunan geliştirme altyapısı.
- **Expo Image Picker:** Profil fotoğrafını kamera/galeri üzerinden değiştirmek ve cihazın donanım sensörlerine (medya) erişim sağlamak için entegre mobil bileşen.
- **JavaScript (ES6+):** Component tabanlı durum yönetimi (`useState`), koşullu UI render ve simülatif asenkron (`setTimeout`, `Promise`) işlemleri.
- **Vanilla StyleSheet:** Platform bağımsız estetik, modern 'Card' UI tasarımları ve esnek hizalamalar (Flexbox). 

## ✨ Geliştirilen Özellikler ve Modüller

### 1. Dinamik Tema ve Çoklu Dil Altyapısı (UI/UX)
- **Karanlık / Aydınlık Mod (Dark & Light Theme):** Özel bir stil sözlüğü (`themeColors`) aracılığıyla sadece tek bir tuşa basılarak uygulamanın tüm renk paleti (arka plan, butonlar, modallar, yazılar) karanlık veya aydınlık olacak şekilde değiştirilir.
- **Gerçek Zamanlı Dil Çevirisi (i18n):** Ekranın üst kısmındaki menüden İngilizce veya Türkçe dili anında seçilebilir. Uygulamadaki tüm uyarılar, bildirimler ve etiketler sayfa yenilenmesine gerek duymadan anlık güncellenir.

### 2. Kişisel Bilgiler ve Profil Düzenleme
- **Akıllı Düzenleme ve Mühürlü Görüntüleme:** Başlangıçta tüm formlar (Kullanıcı adı, telefon vb.) "Salt Okunur" (Readonly) moddadır. "Profili Düzenle" butonuna dokunulmasıyla form yapısı etkileşimli (Editable) bir hale gelir. Çiftçinin sisteme kayıtlı olduğu Sorumlu Bölge, Merkez İl (Türkiye'nin 81 ili dahilinde) ve Tarla Büyüklüğü gibi yapısal bilgiler güvenlik amacıyla sabit tutulmuştur (`inputLocked` state).
- **Profil Fotoğrafı Cihaz Entegrasyonu:** `expo-image-picker` yetkisi ile cihaz galerisi açılır. Seçilen görseller mobil uygulamanın kendi hafızasında tutulur (`URI`). Görseli kaldıran veya varsayılan harf tabanlı avatara çeviren dinamik 'Avatar' mekanizması sunulmuştur.

### 3. Akıllı Bildirim ve Sensör (IoT) Entegrasyon Paneli
- **Gerçek Zamanlı IoT (Sensör) Dashboard Modalı:** Toplam tarla sayısı üzerinden açılan tam ekran modal, Türkiye genelindeki her türlü arazinin (Örn: Konya Buğday Tarlası, Manisa Üzüm Bağı vb.) sıcaklık ve toprak nemi simülasyonunu görüntüler. Tarlada su eksiği (Kritik durum) algılandığında sistem uyarı renginde (Kırmızı) şekillenir ve çiftçiye uzaktan *"Motoru Başlat"* emri verme imkanı sunar.
- **Sistem Bildirim Merkezi:** Mobil hissini güçlendiren, bağımsız animasyonlu modal (`Modal` component) mimarisinde bir bildirim tepsisi geliştirilmiştir. Gelen sistem raporları ve don uyarısı gibi kritik iletiler okunmayı bekler.

### 4. Coğrafi ve Güvenlik Modülleri
- **Harita Entegrasyonu:** "Gerçek Haritayı Aç" butonuna basıldığında cihazın mevcut işletim sistemi (iOS App veya Android Native) haritasına bağlanarak (`Linking.openURL`), veritabanından çekilen Sorumlu Bölge ve Merkez İl baz alınarak (Türkiye sınırları içerisindeki herhangi bir koordinata) dışarıdan navigasyon/uydu görüntüsü yönlendirmesi yapar.
- **Sistem Güvenlik İşlemleri:** Çiftçinin kendi şifresini değiştirmek adına parola yenileme linki talep edebilmesi, hesabından tam çıkış onayı ve iptal süreçleri gibi güvenlik aşamaları standart `Alert` pop-up'ları ile sunulur.

### 5. Backend Simülasyonu ve API Hazırlığı
Backend tam teşekküllü entegre edilmeden önce uygulamanın gerçekçi reaksiyon vermesi sağlanmıştır:
- Form kayıt işlemleri gönderilirken buton özel bir **Yükleniyor (`ActivityIndicator`)** moduna girerek API bekleme simülasyonunu (1500ms yapay gecikme `Promise`) yaşatır ve ardından profil verilerini haritalandırır.

---
*Özetle; bu mobil modül, modern bir çiftçinin sahadaki ihtiyaç duyduğu (bildirim takibi, uzaktan çevre kontrolü (IoT), güvenli iletişim) işlevlerini profesyonel ve kullanıcı dostu bir "React Native" mimarisinde başarıyla sergilemektedir.*
