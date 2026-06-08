import React, { createContext, useContext, useState } from 'react';

export const TR = {
  // Tab
  anaEkran: 'Ana Ekran', tarlalar: 'Tarlalar', iotPaneli: 'IoT Paneli', takvim: 'Takvim', profil: 'Profil',
  // Dashboard
  merhaba: 'Merhaba', isletme: 'İşletme', aktifTarla: 'Aktif Tarla', iotSensor: 'IoT Sensör', alan: 'm² Alan',
  bildirimler: 'Bildirimler', tumunuSil: 'Tümünü Sil', tumBildirimOkundu: 'Tüm bildirimler okundu.',
  tarlaYonet: 'Tarlaları ve Sensörleri Yönet', yukleniyor: 'Yükleniyor...', cevrimdisi: '⚠️ Çevrimdışı veri',
  aiAnaliz: 'Yapay Zeka Analizi', aiModel: 'Scikit-learn karar ağacı modeli', canli: 'CANLI',
  kritik: 'Kritik', uyari: 'Uyarı', ideal: 'İdeal',
  // Tarlalar
  tarlalarim: 'Tarlalarım', tarlalarSubtitle: 'İşletmenize ait tüm araziler ve ürün detayları.',
  ekim: 'Ekim', hasat: 'Hasat',
  // IoT
  iotBaslik: 'Canlı IoT Paneli', iotSubtitle: 'Sensörler her 4 saniyede güncellenir',
  sonGuncelleme: 'Son güncelleme', motorBaslat: 'Motoru Başlat (Sulama)',
  sulaniyorText: 'Sulama Aktif — Motor Çalışıyor', detayliRapor: 'Detaylı Rapor',
  sicaklik: 'Sıcaklık', toprakNemi: 'Toprak Nemi', nemSensoru: 'Nem Sensörü', sicaklikSensoru: 'Sıcaklık Sensörü',
  // Takvim
  takvimBaslik: 'Tarım Takvimi', takvimSubtitle: 'İlaçlama, gübreleme ve hasat işlemleri.',
  yeniGorev: 'Yeni Görev Ekle', gorevAdi: 'GÖREV ADI', gorevTarihi: 'TARİH', gorevTuru: 'GÖREV TÜRÜ',
  gorevKaydet: 'Görevi Kaydet',
  ilaclamaLabel: 'İlaçlama', gubreleLabel: 'Gübreleme', hasatLabel: 'Hasat', sulamaLabel: 'Sulama',
  bekliyor: 'Bekliyor', planlandi: 'Planlandı', takipte: 'Takipte',
  // Tarla Detay
  kadastro: 'Kadastro & Konum', lotNo: 'Lot No', parselNo: 'Parsel No',
  canliSensor: 'Canlı Sensör Verileri', detayliRaporBtn: 'Detaylı Rapor (pH & Mineraller)',
  nemTrendi: 'Son 7 Günlük Nem Trendi', urunBilgi: 'Ürün & Tarım Bilgileri',
  ekiliUrun: 'Ekili Ürün', verim: 'Verim Beklentisi', sulamaSistemi: 'Sulama', gubre: 'Gübre',
  sonIslemler: 'Son İşlemler', toprakAnaliz: 'Toprak Analizi', mineralAnaliz: 'Mineral Analizi', kapat: 'Kapat',
  // Profil
  rolAdi: 'Lisanslı Çiftçi', fotoDegistir: '📸', farmsLabel: 'Tarlalar', sensorsLabel: 'Aktif Sensör',
  kisiselBilgi: 'İletişim Bilgileri', isletmeBilgi: 'İşletme Özeti ve Bölge',
  kullaniciAdi: 'Kullanıcı Adı', tamAd: 'Tam Ad Soyad', telefon: 'Telefon Num.', eposta: 'E-posta',
  bolgeLabel: 'Sorumlu Bölge 🔒', ilLabel: 'Merkez İl 🔒', danismanLabel: 'Ziraat Danışmanı 🔒', tarlaLabel: 'Tarla Büyüklüğü (IoT) 🔒',
  profilDuzenle: 'Profili Düzenle', kaydetBtn: 'Değişiklikleri Kaydet', iptal: 'İptal',
  basariliKayit: 'Tüm bilgileriniz mühürlendi!', hataAlanlariDoldur: 'Lütfen tüm boşlukları doldurunuz.',
  temaLabel: 'Tema:', dilLabel: 'Dil:', fotokaldirBtn: 'Fotoğrafı Kaldır 🗑️',
  guvenlikBaslik: 'Hesap Güvenliği ve Ayarlar', sifreDegistir: 'Şifreyi Güncelle 🔑', cikisYap: 'Sistemden Çıkış Yap 🚪',
  haritaAc: 'Gerçek Haritayı Aç 🗺️',
  bildirimBaslik: 'Sistem Bildirimleri', kapat2: 'Kapat',
  iotModalBaslik: 'Canlı IoT (Sensör) Paneli', motorBtn: 'Motoru Başlat', detayBtn: 'Detay',
  cikisOnay: 'Sistemden güvenli bir şekilde çıkış yapılacak. Onaylıyor musunuz?',
  sifreSifirlaOnay: 'E-posta adresinize bir şifre sıfırlama bağlantısı gönderilecektir.',
  sistemeKayit: 'Sisteme Kayıt',
};

export const EN = {
  anaEkran: 'Home', tarlalar: 'Fields', iotPaneli: 'IoT Panel', takvim: 'Calendar', profil: 'Profile',
  merhaba: 'Hello', isletme: 'Farm', aktifTarla: 'Active Fields', iotSensor: 'IoT Sensors', alan: 'm² Area',
  bildirimler: 'Notifications', tumunuSil: 'Clear All', tumBildirimOkundu: 'All notifications read.',
  tarlaYonet: 'Manage Fields & Sensors', yukleniyor: 'Loading...', cevrimdisi: '⚠️ Offline data',
  aiAnaliz: 'AI Analysis', aiModel: 'Scikit-learn decision tree model', canli: 'LIVE',
  kritik: 'Critical', uyari: 'Warning', ideal: 'Ideal',
  tarlalarim: 'My Fields', tarlalarSubtitle: 'All land and crop details of your farm.',
  ekim: 'Sowing', hasat: 'Harvest',
  iotBaslik: 'Live IoT Panel', iotSubtitle: 'Sensors update every 4 seconds',
  sonGuncelleme: 'Last update', motorBaslat: 'Start Engine (Irrigation)',
  sulaniyorText: 'Irrigation Active — Engine Running', detayliRapor: 'Detailed Report',
  sicaklik: 'Temperature', toprakNemi: 'Soil Moisture', nemSensoru: 'Humidity Sensor', sicaklikSensoru: 'Temp Sensor',
  takvimBaslik: 'Farm Calendar', takvimSubtitle: 'Plan spraying, fertilizing and harvest.',
  yeniGorev: 'Add New Task', gorevAdi: 'TASK NAME', gorevTarihi: 'DATE', gorevTuru: 'TASK TYPE',
  gorevKaydet: 'Save Task',
  ilaclamaLabel: 'Spraying', gubreleLabel: 'Fertilizing', hasatLabel: 'Harvest', sulamaLabel: 'Irrigation',
  bekliyor: 'Pending', planlandi: 'Planned', takipte: 'Tracking',
  kadastro: 'Cadastre & Location', lotNo: 'Lot No', parselNo: 'Parcel No',
  canliSensor: 'Live Sensor Data', detayliRaporBtn: 'Detailed Report (pH & Minerals)',
  nemTrendi: 'Last 7-Day Moisture Trend', urunBilgi: 'Crop & Farm Info',
  ekiliUrun: 'Crop', verim: 'Yield Estimate', sulamaSistemi: 'Irrigation', gubre: 'Fertilizer',
  sonIslemler: 'Recent Operations', toprakAnaliz: 'Soil Analysis', mineralAnaliz: 'Mineral Analysis', kapat: 'Close',
  rolAdi: 'Licensed Farmer', fotoDegistir: '📸', farmsLabel: 'Farms', sensorsLabel: 'Sensors',
  kisiselBilgi: 'Personal Contact Info', isletmeBilgi: 'Business Details',
  kullaniciAdi: 'Username', tamAd: 'Full Name', telefon: 'Phone Num.', eposta: 'Email',
  bolgeLabel: 'Responsible Region 🔒', ilLabel: 'City 🔒', danismanLabel: 'Supervisor 🔒', tarlaLabel: 'Land Size (IoT) 🔒',
  profilDuzenle: 'Edit Profile', kaydetBtn: 'Save Changes', iptal: 'Cancel',
  basariliKayit: 'All config saved!', hataAlanlariDoldur: 'Please fill out all fields.',
  temaLabel: 'Theme:', dilLabel: 'Lang:', fotokaldirBtn: 'Remove Photo 🗑️',
  guvenlikBaslik: 'Account Security', sifreDegistir: 'Update Password 🔑', cikisYap: 'Log Out 🚪',
  haritaAc: 'Open Real Map 🗺️',
  bildirimBaslik: 'System Notifications', kapat2: 'Close',
  iotModalBaslik: 'Live IoT Dashboard', motorBtn: 'Start Engine', detayBtn: 'Details',
  cikisOnay: 'You are about to log out securely. Confirm?',
  sifreSifirlaOnay: 'A password reset link will be sent to your email.',
  sistemeKayit: 'Member Since',
};

const LanguageContext = createContext({ lang: 'tr', toggleLang: () => {}, t: TR });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('tr');
  const toggleLang = () => setLang(p => p === 'tr' ? 'en' : 'tr');
  const t = lang === 'tr' ? TR : EN;
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
