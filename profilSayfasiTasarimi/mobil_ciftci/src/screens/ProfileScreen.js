import React, { useState } from 'react';
import { 
  View, Text, Image, TextInput, TouchableOpacity, 
  StyleSheet, ScrollView, ActivityIndicator, Alert, SafeAreaView, Platform, Modal, Linking
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const FARMS_DATA = [
  { id: '1', name: 'Ağın Badem Tarlası', temp: '22°C', humidity: '%55', status: 'Kritik Değil (İdeal)', isWarning: false },
  { id: '2', name: 'Keban Ceviz Bahçesi', temp: '28°C', humidity: '%30', status: 'Su Bekleniyor!', isWarning: true },
  { id: '3', name: 'Baskil Kayısı Bahçesi', temp: '19°C', humidity: '%45', status: 'Stabil', isWarning: false },
];

const MOCK_NOTIFS = [
  { id: '1', text: 'Keban Ceviz Bahçesi: Nem %30 seviyesine düştü. Sulama motorlarını acil çalıştırmanız öneriliyor.', time: '10 dk önce', isWarn: true },
  { id: '2', text: 'Sistem Uyarısı: Elazığ geneli gece don ve kırağı tehlikesi raporlanmıştır.', time: '2 saat önce', isWarn: true },
  { id: '3', text: 'Hasat Raporu: Ağın Badem Tarlası çağla verimliliği beklenenden %12 daha fazla.', time: '1 gün önce', isWarn: false }
];

const translations = {
  tr: {
    role: 'Lisanslı Çiftçi', changePhoto: '📸', farms: 'Tarlalar', sensors: 'Aktif Sensör', 
    personalInfo: 'İletişim Bilgileri', businessInfo: 'İşletme Özeti ve Bölge',
    usernameLabel: 'Kullanıcı Adı', fullNameLabel: 'Tam Ad Soyad', phoneLabel: 'Telefon Num.', emailLabel: 'E-posta', 
    regionLabel: 'Sorumlu Bölge 🔒', cityLabel: 'Merkez İl 🔒', supervisorLabel: 'Ziraat Danışmanı 🔒', farmSizeLabel: 'Tarla Büyüklüğü (IoT) 🔒', 
    editProfileBtn: 'Profili Düzenle', saveProfileBtn: 'Değişiklikleri Kaydet', cancelBtn: 'İptal',
    successSave: 'Tüm bilgileriniz mühürlendi!', errorFillAll: 'Lütfen tüm boşlukları doldurunuz.', 
    themeToggle: 'Tema:', langToggle: 'Dil:', removePhotoBtn: 'Fotoğrafı Kaldır 🗑️',
    securityTitle: 'Hesap Güvenliği ve Ayarlar', changePassBtn: 'Şifreyi Güncelle 🔑', logoutBtn: 'Sistemden Çıkış Yap 🚪',
    viewMapBtn: 'Gerçek Haritayı Aç 🗺️',
    notifTitle: 'Sistem Bildirimleri', closeBtn: 'Kapat', 
    iotTitle: 'Canlı IoT (Sensör) Paneli', switchOn: 'Motoru Başlat', detailBtn: 'Detay',
    logoutAlert: 'Sistemden güvenli bir şekilde çıkış yapılacak. Onaylıyor musunuz?', changePassAlert: 'E-posta adresinize bir şifre sıfırlama bağlantısı gönderilecektir.',
    joinDate: 'Sisteme Kayıt', sysScore: 'Güvenilirlik Puanı'
  },
  en: {
    role: 'Licensed Farmer', changePhoto: '📸', farms: 'Farms', sensors: 'Sensors', 
    personalInfo: 'Personal Contact Info', businessInfo: 'Business Details',
    usernameLabel: 'Username', fullNameLabel: 'Full Name', phoneLabel: 'Phone Num.', emailLabel: 'Email', 
    regionLabel: 'Responsible Region 🔒', cityLabel: 'City 🔒', supervisorLabel: 'Supervisor 🔒', farmSizeLabel: 'Land Size (IoT) 🔒', 
    editProfileBtn: 'Edit Profile', saveProfileBtn: 'Save Changes', cancelBtn: 'Cancel',
    successSave: 'All config saved!', errorFillAll: 'Please fill out all fields.', 
    themeToggle: 'Theme:', langToggle: 'Lang:', removePhotoBtn: 'Remove Photo 🗑️',
    securityTitle: 'Account Security', changePassBtn: 'Update Password 🔑', logoutBtn: 'Log Out 🚪',
    viewMapBtn: 'Open Real Map 🗺️',
    notifTitle: 'System Notifications', closeBtn: 'Close',
    iotTitle: 'Live IoT Dashboard', switchOn: 'Start Engine', detailBtn: 'Details',
    logoutAlert: 'You are about to log out securely. Confirm?', changePassAlert: 'A password reset link will be sent to your email.',
    joinDate: 'Member Since', sysScore: 'System Score'
  }
};

const themeColors = {
  light: { background: '#f8fafc', card: '#ffffff', textMain: '#1e293b', textMuted: '#64748b', border: '#e2e8f0', primary: '#10b981', disabledBg: '#f1f5f9', lockedBg: '#e2e8f0', buttonText: '#ffffff', danger: '#ef4444', modalOverlay: 'rgba(0,0,0,0.5)', notifyBg: '#fee2e2' },
  dark: { background: '#0f172a', card: '#1e293b', textMain: '#f8fafc', textMuted: '#94a3b8', border: '#334155', primary: '#34d399', disabledBg: '#1e293b', lockedBg: '#0f172a', buttonText: '#0f172a', danger: '#f87171', modalOverlay: 'rgba(0,0,0,0.7)', notifyBg: '#450a0a' }
};

export default function App() {
  const [lang, setLang] = useState('tr');
  const [isDark, setIsDark] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isFarmsOpen, setIsFarmsOpen] = useState(false);

  // MOCK VERİ (SISTEM KAYIT TARIHI VE ELAZIĞ VERİLERİ)
  const [originalData, setOriginalData] = useState({
    username: 'm_demirci_44', fullName: 'Mehmet Demirci', phone: '0530 111 2233', email: 'mehmet.ciftci@tarim.com',
    region: 'Doğu Anadolu Bölgesi', city: 'Elazığ', supervisor: 'Ziraat Müh. Mustafa Öztürk', farmSize: '600 Dönüm',
    joinMonth: '23 Mart 2026'
  });

  const [formData, setFormData] = useState({ ...originalData });
  const [customAvatar, setCustomAvatar] = useState(null);
  const [originalAvatar, setOriginalAvatar] = useState(null); 

  const dynamicAvatar = customAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&size=200&background=10B981&color=fff`;
  const t = translations[lang];
  const c = isDark ? themeColors.dark : themeColors.light;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') { Alert.alert('İzin Reddedildi', 'Galeri izni gereklidir.'); return; }
      }
      let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.7 });
      if (!result.canceled && result.assets && result.assets.length > 0) setCustomAvatar(result.assets[0].uri); 
    } catch (e) {
      console.log(e); Alert.alert('Hata', 'Kamera bağlantısı durduruldu.');
    }
  };

  const handleCancelEditing = () => {
    setFormData({ ...originalData }); 
    setCustomAvatar(originalAvatar); 
    setIsEditing(false);
  };

  const updateProfile = async () => {
    const { username, fullName, phone, email } = formData;
    if (!username.trim() || !fullName.trim() || !phone.trim() || !email.trim()) { Alert.alert('Uyarı', t.errorFillAll); return; }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOriginalData({ ...formData }); setOriginalAvatar(customAvatar);
    Alert.alert('✅ Başarılı', t.successSave);
    setIsEditing(false); setIsLoading(false);
  };

  const logoutAction = () => {
    Alert.alert("🚪 Çıkış", t.logoutAlert, [{ text: t.cancelBtn, style: "cancel" }, { text: t.logoutBtn, style: "destructive", onPress: () => Alert.alert("Çıkış Yapıldı", "Login sayfasına...") }]);
  }
  const changePassAction = () => Alert.alert("🔑 Güvenlik", t.changePassAlert, [{ text: "Tamam" }]);
  
  const viewMapAction = () => {
    const query = encodeURIComponent(`${formData.city}, ${formData.region}`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  const viewSensorDetail = (farmName) => Alert.alert("📊 Sensör Raporu", `${farmName} bölgesine ait son 24 saatlik grafikler ve toprak PH analizleri hazırlanıyor...`, [{text: "Kapat"}]);
  const startEngine = (farmName) => Alert.alert("🚀 Otomasyon Çalıştırıldı!", `${farmName} sulama motorlarına uzaktan komut iletildi. Durum normale dönüyor!`, [{text: "Süper"}]);

  const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.background },
    container: { padding: 20, paddingBottom: 40 },
    topBar: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10, marginTop: 10, marginBottom: 15 },
    settingsBtn: { padding: 8, borderRadius: 8, backgroundColor: c.card, borderWidth: 1, borderColor: c.border },
    settingsBtnText: { fontSize: 12, fontWeight: 'bold', color: c.textMuted },
    bellIconBtn: { position: 'relative', padding: 8, borderRadius: 8, backgroundColor: c.card, borderWidth: 1, borderColor: c.border },
    bellText: { fontSize: 16 },
    bellBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: c.danger, width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: c.card },
    bellBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    
    header: { alignItems: 'center', marginBottom: 25 },
    avatarContainer: { position: 'relative', marginBottom: 10 },
    avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: c.primary },
    changePhotoBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: c.primary, width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: c.card },
    changePhotoText: { fontSize: 13, color: '#fff' },
    removePhotoBtn: { paddingHorizontal: 15, paddingVertical: 8, backgroundColor: '#fef2f2', borderRadius: 20, borderWidth: 1, borderColor: '#fca5a5', marginBottom: 10 },
    removePhotoText: { color: '#ef4444', fontSize: 12, fontWeight: 'bold' },
    
    nameText: { fontSize: 22, fontWeight: 'bold', color: c.textMain },
    roleText: { fontSize: 14, color: c.primary, fontWeight: '600', marginTop: 4 },
    
    joinDateText: { fontSize: 13, color: c.textMuted, marginTop: 6, fontWeight: '500' },
    scoreBadge: { backgroundColor: '#fef3c7', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, marginTop: 10, borderWidth: 1, borderColor: '#fde047', flexDirection: 'row', alignItems: 'center', gap: 5 },
    scoreText: { color: '#b45309', fontSize: 12, fontWeight: '800' },
    
    statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, gap: 15 },
    statCard: { flex: 1, backgroundColor: c.card, padding: 20, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: c.border },
    statCardTouchable: { flex: 1, backgroundColor: c.card, padding: 20, borderRadius: 16, alignItems: 'center', borderWidth: 2, borderColor: c.primary, borderStyle: 'dashed' },
    statNumber: { fontSize: 26, fontWeight: '800', color: c.textMain, marginBottom: 5 },
    statLabel: { fontSize: 12, color: c.textMuted, fontWeight: '600' },
    
    formContainer: { backgroundColor: c.card, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: c.border, marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: c.textMain, marginBottom: 15 },
    label: { fontSize: 11, fontWeight: '700', color: c.textMuted, marginBottom: 6, textTransform: 'uppercase' },
    input: { height: 48, borderRadius: 10, paddingHorizontal: 15, fontSize: 15, color: c.textMain, marginBottom: 15, borderWidth: 1, borderColor: c.border, backgroundColor: c.background },
    inputDisabled: { backgroundColor: c.disabledBg, color: c.textMuted, opacity: 0.8 },
    inputLocked: { backgroundColor: c.lockedBg, color: c.textMuted, opacity: 0.6, borderColor: 'transparent' },
    rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },
    
    actionButtons: { width: '100%' },
    primaryButton: { backgroundColor: c.primary, height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    primaryButtonText: { color: c.buttonText, fontSize: 16, fontWeight: 'bold' },
    editActionsGroup: { flexDirection: 'row', gap: 10 },
    cancelButton: { flex: 1, height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: c.border },
    cancelButtonText: { color: c.textMuted, fontSize: 15, fontWeight: 'bold' },
    saveButton: { flex: 2, backgroundColor: c.primary, height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    
    securityBtnDark: { backgroundColor: c.textMain, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    securityBtnDanger: { backgroundColor: 'transparent', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: c.danger },
    securityBtnDangerText: { color: c.danger, fontSize: 15, fontWeight: 'bold' },
    
    mapBtnInfo: { backgroundColor: c.primary, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: -5 },
    
    modalOverlay: { flex: 1, backgroundColor: c.modalOverlay, justifyContent: 'flex-end' },
    modalContent: { backgroundColor: c.background, borderTopLeftRadius: 25, borderTopRightRadius: 25, minHeight: '60%', padding: 20, paddingBottom: 40 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: c.border, paddingBottom: 15 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: c.textMain },
    closeButton: { padding: 8, backgroundColor: c.card, borderRadius: 20, borderWidth: 1, borderColor: c.border },
    closeButtonText: { color: c.textMain, fontSize: 14, fontWeight: 'bold' },
    notifCard: { padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: c.border, backgroundColor: c.card },
    notifCardWarn: { backgroundColor: c.notifyBg, borderColor: c.danger },
    notifText: { fontSize: 14, color: c.textMain, lineHeight: 20 },
    notifTime: { fontSize: 11, color: c.textMuted, marginTop: 8, fontWeight: '600' },
    iotCard: { padding: 15, borderRadius: 16, marginBottom: 15, backgroundColor: c.card, borderWidth: 1, borderColor: c.border },
    iotCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    iotFarmName: { fontSize: 16, fontWeight: 'bold', color: c.textMain },
    iotStatusWarn: { fontSize: 12, color: c.danger, fontWeight: 'bold', backgroundColor: c.notifyBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    iotStatusGood: { fontSize: 12, color: c.primary, fontWeight: 'bold', backgroundColor: '#ecfdf5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    iotDataRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: c.background, padding: 10, borderRadius: 10, marginBottom: 15 },
    iotDataBox: { alignItems: 'center' },
    iotDataVal: { fontSize: 18, fontWeight: 'bold', color: c.textMain },
    iotDataLabel: { fontSize: 11, color: c.textMuted },
    iotActionButton: { backgroundColor: c.textMain, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
    iotActionButtonText: { color: c.buttonText, fontWeight: 'bold', fontSize: 14 }
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.settingsBtn} onPress={() => setLang(lang === 'tr' ? 'en' : 'tr')}>
            <Text style={styles.settingsBtnText}>{t.langToggle} {lang.toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsBtn} onPress={() => setIsDark(!isDark)}>
            <Text style={styles.settingsBtnText}>{t.themeToggle} {isDark ? '🌙' : '☀️'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellIconBtn} onPress={() => setIsNotifOpen(true)}>
            <Text style={styles.bellText}>🔔</Text>
            <View style={styles.bellBadge}><Text style={styles.bellBadgeText}>3</Text></View>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarContainer} onPress={isEditing ? pickImage : null} activeOpacity={isEditing ? 0.7 : 1}>
            <Image key={dynamicAvatar} source={{ uri: dynamicAvatar }} style={styles.avatar} />
            {isEditing && (
               <View style={styles.changePhotoBadge}><Text style={styles.changePhotoText}>{t.changePhoto}</Text></View>
            )}
          </TouchableOpacity>
          {isEditing && customAvatar && (
            <TouchableOpacity style={styles.removePhotoBtn} onPress={() => setCustomAvatar(null)}>
              <Text style={styles.removePhotoText}>{t.removePhotoBtn}</Text>
            </TouchableOpacity>
          )}
          
          <Text style={styles.nameText}>{formData.fullName}</Text>
          <Text style={styles.roleText}>{t.role} 🌽</Text>

          <Text style={styles.joinDateText}>📅 {t.joinDate}: {originalData.joinMonth}</Text>
          <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>⭐ {t.sysScore}: 9.8/10</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statCardTouchable} onPress={() => setIsFarmsOpen(true)}>
            <Text style={[styles.statNumber, {color: c.primary}]}>12 👆</Text>
            <Text style={styles.statLabel}>{t.farms}</Text>
          </TouchableOpacity>
          <View style={styles.statCard}><Text style={styles.statNumber}>24</Text><Text style={styles.statLabel}>{t.sensors}</Text></View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>{t.personalInfo}</Text>
          
          <Text style={styles.label}>{t.usernameLabel}</Text>
          <TextInput style={[styles.input, !isEditing && styles.inputDisabled]} value={formData.username} onChangeText={(v) => handleInputChange('username', v)} editable={isEditing} />
          
          <Text style={styles.label}>{t.fullNameLabel}</Text>
          <TextInput style={[styles.input, !isEditing && styles.inputDisabled]} value={formData.fullName} onChangeText={(v) => handleInputChange('fullName', v)} editable={isEditing} />
          
          <View style={styles.rowInputs}>
            <View style={{flex: 1, marginRight: 8}}>
              <Text style={styles.label}>{t.phoneLabel}</Text>
              <TextInput style={[styles.input, !isEditing && styles.inputDisabled]} value={formData.phone} onChangeText={(v) => handleInputChange('phone', v)} editable={isEditing} keyboardType="phone-pad" />
            </View>
            <View style={{flex: 1, marginLeft: 8}}>
              <Text style={styles.label}>{t.emailLabel}</Text>
              <TextInput style={[styles.input, !isEditing && styles.inputDisabled]} value={formData.email} onChangeText={(v) => handleInputChange('email', v)} editable={isEditing} keyboardType="email-address" />
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>{t.businessInfo}</Text>
          
          <View style={styles.rowInputs}>
             <View style={{flex: 1, marginRight: 8}}>
                <Text style={styles.label}>{t.regionLabel}</Text>
                <TextInput style={[styles.input, styles.inputLocked]} value={formData.region} editable={false} />
             </View>
             <View style={{flex: 1, marginLeft: 8}}>
                <Text style={styles.label}>{t.cityLabel}</Text>
                <TextInput style={[styles.input, styles.inputLocked]} value={formData.city} editable={false} />
             </View>
          </View>

          <TouchableOpacity style={styles.mapBtnInfo} onPress={viewMapAction}>
            <Text style={styles.primaryButtonText}>{t.viewMapBtn}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>{t.supervisorLabel}</Text>
          <TextInput style={[styles.input, styles.inputLocked]} value={formData.supervisor} editable={false} />
          <Text style={styles.label}>{t.farmSizeLabel}</Text>
          <TextInput style={[styles.input, styles.inputLocked]} value={formData.farmSize} editable={false} />
        </View>

        {/* YENİLİK: !isEditing (GÖRÜNTÜLEME MODU) İÇERİSİNE PROFILI DÜZENLE TUŞU GERİ EKLENDİ */}
        {!isEditing && (
          <>
            <TouchableOpacity style={[styles.primaryButton, {marginBottom: 20}]} onPress={() => setIsEditing(true)}>
              <Text style={styles.primaryButtonText}>{t.editProfileBtn}</Text>
            </TouchableOpacity>

            <View style={[styles.formContainer, {backgroundColor: 'transparent', borderWidth: 0, paddingHorizontal: 0}]}>
               <Text style={[styles.sectionTitle, {color: c.danger}]}>{t.securityTitle}</Text>
               <TouchableOpacity style={styles.securityBtnDark} onPress={changePassAction}>
                  <Text style={styles.primaryButtonText}>{t.changePassBtn}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.securityBtnDanger} onPress={logoutAction}>
                  <Text style={styles.securityBtnDangerText}>{t.logoutBtn}</Text>
               </TouchableOpacity>
            </View>
          </>
        )}

        {isEditing && (
        <View style={styles.actionButtons}>
            <View style={styles.editActionsGroup}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEditing} disabled={isLoading}>
                <Text style={styles.cancelButtonText}>{t.cancelBtn}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.saveButton} onPress={updateProfile} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color={c.buttonText} />
                ) : (
                  <Text style={styles.primaryButtonText}>{t.saveProfileBtn}</Text>
                )}
              </TouchableOpacity>
            </View>
        </View>
        )}

      </ScrollView>

      {/* BİLDİRİMLER MODALI */}
      <Modal animationType="slide" transparent={true} visible={isNotifOpen} onRequestClose={() => setIsNotifOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.notifTitle} (3)</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsNotifOpen(false)}>
                <Text style={styles.closeButtonText}>{t.closeBtn}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {MOCK_NOTIFS.map((notif) => (
                <View key={notif.id} style={[styles.notifCard, notif.isWarn && styles.notifCardWarn]}>
                  <Text style={styles.notifText}>⚠️ {notif.text}</Text>
                  <Text style={styles.notifTime}>{notif.time}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* TARLALAR (IOT SENSÖR) MODALI */}
      <Modal animationType="slide" transparent={true} visible={isFarmsOpen} onRequestClose={() => setIsFarmsOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>📡 {t.iotTitle}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsFarmsOpen(false)}>
                <Text style={styles.closeButtonText}>{t.closeBtn}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {FARMS_DATA.map((farm) => (
                <View key={farm.id} style={styles.iotCard}>
                  <View style={styles.iotCardHeader}>
                    <Text style={styles.iotFarmName}>{farm.name}</Text>
                    <Text style={farm.isWarning ? styles.iotStatusWarn : styles.iotStatusGood}>{farm.status}</Text>
                  </View>
                  <View style={styles.iotDataRow}>
                    <View style={styles.iotDataBox}>
                      <Text style={styles.iotDataVal}>{farm.temp}</Text>
                      <Text style={styles.iotDataLabel}>🌡️ Sıcaklık</Text>
                    </View>
                    <View style={styles.iotDataBox}>
                      <Text style={styles.iotDataVal}>{farm.humidity}</Text>
                      <Text style={styles.iotDataLabel}>💧 Toprak Nemi</Text>
                    </View>
                  </View>
                  {farm.isWarning ? (
                    <TouchableOpacity style={[styles.iotActionButton, {backgroundColor: c.primary}]} onPress={() => startEngine(farm.name)}>
                      <Text style={styles.iotActionButtonText}>🚀 {t.switchOn}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={[styles.iotActionButton, {backgroundColor: c.border}]} onPress={() => viewSensorDetail(farm.name)}>
                      <Text style={[styles.iotActionButtonText, {color: c.textMuted}]}>{t.detailBtn}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

/* ─── ÖNERİLEN REACT NATIVE OPTİMİZASYONLARI ─────────────────────────────────
 *
 * 1. BÜYÜK LISTE OPTİMİZASYONU (FlatList):
 *    ScrollView yerine FlatList kullan — yüzlerce tarla kartı varsa
 *    ScrollView hepsini aynı anda render eder; FlatList sadece görünürde olanları.
 *
 *    // ÖNCE (kötü ölçeklenir):
 *    <ScrollView>
 *      {FARMS_DATA.map(farm => <FarmCard key={farm.id} {...farm} />)}
 *    </ScrollView>
 *
 *    // SONRA (binlerce satır bile sorunsuz):
 *    <FlatList
 *      data={farms}
 *      keyExtractor={item => item.id}
 *      renderItem={({ item }) => <FarmCard {...item} />}
 *      initialNumToRender={10}
 *      maxToRenderPerBatch={20}
 *      windowSize={5}
 *      getItemLayout={(_, index) => ({ length: 120, offset: 120 * index, index })}
 *    />
 *
 * 2. GEREKSIZ RE-RENDER ÖNLENMESİ (useMemo / useCallback / React.memo):
 *
 *    // Tarla kartlarını memoize et — farms listesi değişmeden yeniden render etme
 *    const FarmCard = React.memo(({ name, temp, humidity, status, isWarning }) => {
 *      // ...kart içeriği
 *    });
 *
 *    // handleInputChange her render'da yeni fonksiyon oluşturmasın
 *    const handleInputChange = useCallback((field, value) => {
 *      setFormData(prev => ({ ...prev, [field]: value }));
 *    }, []);
 *
 *    // Tema renkleri isDark değişince yeniden hesaplansın
 *    const c = useMemo(() => isDark ? themeColors.dark : themeColors.light, [isDark]);
 *
 * 3. GERÇEK API HOOK'U:
 *
 *    function useFetch(url, token) {
 *      const [data, setData] = useState(null);
 *      const [loading, setLoading] = useState(true);
 *      const [error, setError] = useState(null);
 *
 *      useEffect(() => {
 *        let cancelled = false;
 *        fetch(url, { headers: { Authorization: `Bearer ${token}` } })
 *          .then(r => r.json())
 *          .then(d => { if (!cancelled) setData(d.data); })
 *          .catch(e => { if (!cancelled) setError(e); })
 *          .finally(() => { if (!cancelled) setLoading(false); });
 *        return () => { cancelled = true; };  // Memory leak önleme
 *      }, [url, token]);
 *
 *      return { data, loading, error };
 *    }
 *
 * 4. GÖRÜNTÜ BOYUTU KONTROLÜ:
 *    launchImageLibraryAsync çağrısında quality: 0.5 ve maxWidth: 800 ekle.
 *    Büyük fotoğraflar base64'e çevrilince 5MB+ olabilir.
 *
 * 5. MOCK VERİLERİ ÇIKAR:
 *    FARMS_DATA ve MOCK_NOTIFS sabitleri → API çağrısıyla değiştir.
 *    useEffect içinde GET /api/farms ve GET /api/notifications çek.
 */
