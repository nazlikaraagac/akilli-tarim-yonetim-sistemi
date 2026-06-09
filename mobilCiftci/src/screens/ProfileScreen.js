import React, { useState, useCallback } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, ActivityIndicator, Alert, SafeAreaView,
  Platform, Modal, Linking,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { TARLALAR_INITIAL, MockApi } from '../services/MockApi';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { isDark, toggleTheme, c } = useTheme();

  const [isEditing, setIsEditing]     = useState(false);
  const [isLoading, setIsLoading]     = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isFarmsOpen, setIsFarmsOpen] = useState(false);

  const [tarlalar, setTarlalar] = useState(TARLALAR_INITIAL);
  useFocusEffect(useCallback(() => { MockApi.getTarlalar().then(setTarlalar); }, []));

  const [notifler, setNotifler] = useState([
    { id: '1', text: 'Güney Tarlası: Nem %18 düştü. Sulama motorunu çalıştırın!', time: '10 dk önce', isWarn: true },
    { id: '2', text: 'Sistem: Elazığ geneli gece don tehlikesi raporlandı.', time: '2 saat önce', isWarn: true },
    { id: '3', text: 'Kuzey Tarlası: Büyüme beklenen seviyede.', time: '1 gün önce', isWarn: false },
  ]);

  const [originalData, setOriginalData] = useState({
    username: 'ahmet_ciftci', fullName: 'Ahmet Çiftçi',
    phone: '0530 111 2233', email: 'ahmet@tarim.com',
    region: 'Doğu Anadolu Bölgesi', city: 'Elazığ',
    supervisor: 'Dr. Ayşe Yılmaz (Yönetici)', farmSize: '25.5 Dönüm',
    joinMonth: '23 Mart 2026',
  });
  const [formData, setFormData]         = useState({ ...originalData });
  const [customAvatar, setCustomAvatar] = useState(null);
  const [savedAvatar, setSavedAvatar]   = useState(null);

  const avatar = customAvatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&size=200&background=10B981&color=fff`;

  const handleInputChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const pickImage = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') { Alert.alert('İzin Reddedildi', 'Galeri izni gereklidir.'); return; }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, aspect: [1, 1], quality: 0.7,
      });
      if (!result.canceled && result.assets?.[0]) setCustomAvatar(result.assets[0].uri);
    } catch { Alert.alert('Hata', 'Galeri açılamadı.'); }
  };

  const cancelEditing = () => {
    setFormData({ ...originalData });
    setCustomAvatar(savedAvatar);
    setIsEditing(false);
  };

  const saveProfile = async () => {
    const { username, fullName, phone, email } = formData;
    if (!username.trim() || !fullName.trim() || !phone.trim() || !email.trim()) {
      Alert.alert('Uyarı', 'Lütfen tüm boşlukları doldurunuz.'); return;
    }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setOriginalData({ ...formData });
    setSavedAvatar(customAvatar);
    Alert.alert('✅ Başarılı', 'Bilgileriniz kaydedildi.');
    setIsEditing(false); setIsLoading(false);
  };

  const logoutAction = () => Alert.alert('🚪 Çıkış', 'Sistemden çıkış yapılacak. Onaylıyor musunuz?', [
    { text: 'İptal', style: 'cancel' },
    { text: 'Çıkış Yap', style: 'destructive', onPress: () => navigation.replace('Login') },
  ]);

  const changePassAction = () =>
    Alert.alert('🔑 Güvenlik', 'E-posta adresinize şifre sıfırlama bağlantısı gönderilecektir.', [{ text: 'Tamam' }]);

  const viewMapAction = () =>
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.city + ', ' + formData.region)}`);

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={s.container}>

        {/* Üst bar */}
        <View style={s.topBar}>
          <TouchableOpacity style={[s.topBtn, { backgroundColor: c.card, borderColor: c.border }]} onPress={toggleTheme}>
            <Text style={[s.topBtnText, { color: c.textMuted }]}>Tema: {isDark ? '🌙' : '☀️'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.bellBtn, { backgroundColor: c.card, borderColor: c.border }]} onPress={() => setIsNotifOpen(true)}>
            <Text style={s.bellIcon}>🔔</Text>
            {notifler.length > 0 && (
              <View style={s.badge}><Text style={s.badgeText}>{notifler.length}</Text></View>
            )}
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={s.header}>
          <TouchableOpacity style={s.avatarWrap} onPress={isEditing ? pickImage : null} activeOpacity={isEditing ? 0.7 : 1}>
            <Image key={avatar} source={{ uri: avatar }} style={[s.avatar, { borderColor: c.primary }]} />
            {isEditing && <View style={[s.cameraBadge, { backgroundColor: c.primary, borderColor: c.card }]}><Text style={s.cameraIcon}>📸</Text></View>}
          </TouchableOpacity>
          {isEditing && customAvatar && (
            <TouchableOpacity style={s.removePhotoBtn} onPress={() => setCustomAvatar(null)}>
              <Text style={s.removePhotoText}>Fotoğrafı Kaldır 🗑️</Text>
            </TouchableOpacity>
          )}
          <Text style={[s.nameText, { color: c.textMain }]}>{formData.fullName}</Text>
          <Text style={[s.roleText, { color: c.primary }]}>Lisanslı Çiftçi 🌽</Text>
          <Text style={[s.joinText, { color: c.textMuted }]}>📅 Sisteme Kayıt: {originalData.joinMonth}</Text>
        </View>

        {/* Tarla / Sensör istatistikleri */}
        <View style={s.statsRow}>
          <TouchableOpacity style={[s.statCardBordered, { backgroundColor: c.card, borderColor: c.primary }]} onPress={() => setIsFarmsOpen(true)}>
            <Text style={[s.statNum, { color: c.primary }]}>{tarlalar.length} 👆</Text>
            <Text style={[s.statLabel, { color: c.textMuted }]}>Tarlalar</Text>
          </TouchableOpacity>
          <View style={[s.statCard, { backgroundColor: c.card, borderColor: c.border }]}>
            <Text style={[s.statNum, { color: c.textMain }]}>{tarlalar.length * 2}</Text>
            <Text style={[s.statLabel, { color: c.textMuted }]}>Aktif Sensör</Text>
          </View>
        </View>

        {/* İletişim Bilgileri */}
        <View style={[s.formCard, { backgroundColor: c.card, borderColor: c.border }]}>
          <Text style={[s.sectionTitle, { color: c.textMain }]}>İletişim Bilgileri</Text>

          <Text style={[s.label, { color: c.textMuted }]}>KULLANICI ADI</Text>
          <TextInput style={[s.input, { backgroundColor: c.background, borderColor: c.border, color: c.textMain }, !isEditing && { opacity: 0.6 }]}
            value={formData.username} onChangeText={v => handleInputChange('username', v)} editable={isEditing} />

          <Text style={[s.label, { color: c.textMuted }]}>TAM AD SOYAD</Text>
          <TextInput style={[s.input, { backgroundColor: c.background, borderColor: c.border, color: c.textMain }, !isEditing && { opacity: 0.6 }]}
            value={formData.fullName} onChangeText={v => handleInputChange('fullName', v)} editable={isEditing} />

          <View style={s.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[s.label, { color: c.textMuted }]}>TELEFON</Text>
              <TextInput style={[s.input, { backgroundColor: c.background, borderColor: c.border, color: c.textMain }, !isEditing && { opacity: 0.6 }]}
                value={formData.phone} onChangeText={v => handleInputChange('phone', v)} editable={isEditing} keyboardType="phone-pad" />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[s.label, { color: c.textMuted }]}>E-POSTA</Text>
              <TextInput style={[s.input, { backgroundColor: c.background, borderColor: c.border, color: c.textMain }, !isEditing && { opacity: 0.6 }]}
                value={formData.email} onChangeText={v => handleInputChange('email', v)} editable={isEditing} keyboardType="email-address" />
            </View>
          </View>
        </View>

        {/* İşletme Bilgileri */}
        <View style={[s.formCard, { backgroundColor: c.card, borderColor: c.border }]}>
          <Text style={[s.sectionTitle, { color: c.textMain }]}>İşletme Özeti ve Bölge</Text>

          <View style={s.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[s.label, { color: c.textMuted }]}>SORUMLU BÖLGE 🔒</Text>
              <TextInput style={[s.input, s.inputLocked, { backgroundColor: c.background, borderColor: c.border, color: c.textMuted }]}
                value={formData.region} editable={false} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[s.label, { color: c.textMuted }]}>MERKEZ İL 🔒</Text>
              <TextInput style={[s.input, s.inputLocked, { backgroundColor: c.background, borderColor: c.border, color: c.textMuted }]}
                value={formData.city} editable={false} />
            </View>
          </View>

          <TouchableOpacity style={[s.mapBtn, { backgroundColor: c.primary }]} onPress={viewMapAction}>
            <Text style={s.mapBtnText}>Gerçek Haritayı Aç 🗺️</Text>
          </TouchableOpacity>

          <Text style={[s.label, { color: c.textMuted }]}>ZİRAAT DANIŞMANI 🔒</Text>
          <TextInput style={[s.input, s.inputLocked, { backgroundColor: c.background, borderColor: c.border, color: c.textMuted }]}
            value={formData.supervisor} editable={false} />

          <Text style={[s.label, { color: c.textMuted }]}>TARLA BÜYÜKLÜĞü (IoT) 🔒</Text>
          <TextInput style={[s.input, s.inputLocked, { backgroundColor: c.background, borderColor: c.border, color: c.textMuted }]}
            value={formData.farmSize} editable={false} />
        </View>

        {/* Butonlar */}
        {!isEditing ? (
          <>
            <TouchableOpacity style={[s.primaryBtn, { backgroundColor: c.primary }]} onPress={() => setIsEditing(true)}>
              <Text style={s.primaryBtnText}>Profili Düzenle</Text>
            </TouchableOpacity>
            <View style={[s.formCard, { backgroundColor: 'transparent', borderWidth: 0, paddingHorizontal: 0 }]}>
              <Text style={[s.sectionTitle, { color: c.danger }]}>Hesap Güvenliği ve Ayarlar</Text>
              <TouchableOpacity style={[s.darkBtn, { backgroundColor: c.textMain }]} onPress={changePassAction}>
                <Text style={[s.primaryBtnText, { color: c.card }]}>Şifreyi Güncelle 🔑</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.dangerBtn, { borderColor: c.danger }]} onPress={logoutAction}>
                <Text style={[s.dangerBtnText, { color: c.danger }]}>Sistemden Çıkış Yap 🚪</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={s.editBtns}>
            <TouchableOpacity style={[s.cancelBtn, { borderColor: c.border }]} onPress={cancelEditing} disabled={isLoading}>
              <Text style={[s.cancelBtnText, { color: c.textMuted }]}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.saveBtn, { backgroundColor: c.primary }]} onPress={saveProfile} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={s.primaryBtnText}>Değişiklikleri Kaydet</Text>}
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* Bildirimler Modalı */}
      <Modal animationType="slide" transparent visible={isNotifOpen} onRequestClose={() => setIsNotifOpen(false)}>
        <View style={s.overlay}>
          <View style={[s.modalBox, { backgroundColor: c.background }]}>
            <View style={s.modalHead}>
              <Text style={[s.modalTitle, { color: c.textMain }]}>Sistem Bildirimleri ({notifler.length})</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {notifler.length > 0 && (
                  <TouchableOpacity style={[s.closeBtn, { borderColor: c.danger }]} onPress={() => setNotifler([])}>
                    <Text style={[s.closeBtnText, { color: c.danger }]}>Tümünü Sil</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={[s.closeBtn, { borderColor: c.border }]} onPress={() => setIsNotifOpen(false)}>
                  <Text style={[s.closeBtnText, { color: c.textMain }]}>Kapat</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              {notifler.length === 0 ? (
                <Text style={[s.emptyText, { color: c.textMuted }]}>Bildirim yok.</Text>
              ) : notifler.map(n => (
                <View key={n.id} style={[s.notifCard, { backgroundColor: c.card, borderColor: n.isWarn ? c.warnBorder : c.border },
                  n.isWarn && { backgroundColor: c.warnBg }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.notifText, { color: c.textMain }]}>{n.isWarn ? '⚠️ ' : 'ℹ️ '}{n.text}</Text>
                    <Text style={[s.notifTime, { color: c.textMuted }]}>{n.time}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setNotifler(p => p.filter(x => x.id !== n.id))} style={{ padding: 4 }}>
                    <Text style={{ color: c.textMuted, fontSize: 16 }}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Tarlalar / IoT Modalı */}
      <Modal animationType="slide" transparent visible={isFarmsOpen} onRequestClose={() => setIsFarmsOpen(false)}>
        <View style={s.overlay}>
          <View style={[s.modalBox, { backgroundColor: c.background }]}>
            <View style={s.modalHead}>
              <Text style={[s.modalTitle, { color: c.textMain }]}>📡 Canlı IoT (Sensör) Paneli</Text>
              <TouchableOpacity style={[s.closeBtn, { borderColor: c.border }]} onPress={() => setIsFarmsOpen(false)}>
                <Text style={[s.closeBtnText, { color: c.textMain }]}>Kapat</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {tarlalar.map(farm => (
                <View key={farm.id} style={[s.iotCard, { backgroundColor: c.card, borderColor: farm.isWarning ? c.danger : c.border }]}>
                  <View style={s.iotCardHead}>
                    <Text style={[s.iotFarmName, { color: c.textMain }]}>{farm.ad}</Text>
                    <Text style={[s.iotStatus, { color: farm.isWarning ? c.danger : c.primary,
                      backgroundColor: farm.isWarning ? c.warnBg : '#ecfdf5' }]}>{farm.durum}</Text>
                  </View>
                  <View style={[s.iotDataRow, { backgroundColor: c.background }]}>
                    <View style={s.iotDataBox}>
                      <Text style={[s.iotDataVal, { color: c.textMain }]}>{farm.sicaklik}</Text>
                      <Text style={[s.iotDataLabel, { color: c.textMuted }]}>🌡️ Sıcaklık</Text>
                    </View>
                    <View style={s.iotDataBox}>
                      <Text style={[s.iotDataVal, { color: farm.isWarning ? c.danger : c.textMain }]}>{farm.nem}</Text>
                      <Text style={[s.iotDataLabel, { color: c.textMuted }]}>💧 Toprak Nemi</Text>
                    </View>
                  </View>
                  {farm.isWarning ? (
                    <TouchableOpacity style={[s.iotBtn, { backgroundColor: c.primary }]}
                      onPress={() => Alert.alert('🚀 Otomasyon', `${farm.ad} sulama motoruna komut iletildi!`, [{ text: 'Süper' }])}>
                      <Text style={s.iotBtnText}>🚀 Motoru Başlat</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={[s.iotBtn, { backgroundColor: c.border }]}
                      onPress={() => Alert.alert('📊 Sensör Raporu', `${farm.ad} — tüm değerler normal aralıkta.`, [{ text: 'Kapat' }])}>
                      <Text style={[s.iotBtnText, { color: c.textMuted }]}>Detay</Text>
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

const s = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 4, marginBottom: 16 },
  topBtn: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, borderWidth: 1 },
  topBtnText: { fontSize: 12, fontWeight: 'bold' },
  bellBtn: { padding: 8, borderRadius: 8, borderWidth: 1, position: 'relative' },
  bellIcon: { fontSize: 16 },
  badge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#ef4444', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  header: { alignItems: 'center', marginBottom: 24 },
  avatarWrap: { position: 'relative', marginBottom: 10 },
  avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 3 },
  cameraBadge: { position: 'absolute', bottom: 0, right: 0, width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', borderWidth: 2 },
  cameraIcon: { fontSize: 14 },
  removePhotoBtn: { paddingHorizontal: 14, paddingVertical: 6, backgroundColor: '#fef2f2', borderRadius: 20, borderWidth: 1, borderColor: '#fca5a5', marginBottom: 8 },
  removePhotoText: { color: '#ef4444', fontSize: 12, fontWeight: 'bold' },
  nameText: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  roleText: { fontSize: 14, fontWeight: '600' },
  joinText: { fontSize: 13, marginTop: 6 },
  statsRow: { flexDirection: 'row', gap: 14, marginBottom: 20 },
  statCard: { flex: 1, padding: 20, borderRadius: 16, alignItems: 'center', borderWidth: 1 },
  statCardBordered: { flex: 1, padding: 20, borderRadius: 16, alignItems: 'center', borderWidth: 2, borderStyle: 'dashed' },
  statNum: { fontSize: 26, fontWeight: '800', marginBottom: 4 },
  statLabel: { fontSize: 12, fontWeight: '600' },
  formCard: { padding: 20, borderRadius: 16, borderWidth: 1, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 14 },
  label: { fontSize: 11, fontWeight: '700', marginBottom: 6, marginTop: 6, textTransform: 'uppercase' },
  input: { height: 48, borderRadius: 10, paddingHorizontal: 14, fontSize: 15, marginBottom: 4, borderWidth: 1 },
  inputLocked: { opacity: 0.55 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  mapBtn: { height: 42, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 14, marginTop: 4 },
  mapBtnText: { color: '#fff', fontWeight: 'bold' },
  primaryBtn: { height: 54, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  darkBtn: { height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  dangerBtn: { height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  dangerBtnText: { fontSize: 15, fontWeight: 'bold' },
  editBtns: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  cancelBtn: { flex: 1, height: 54, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  cancelBtnText: { fontSize: 15, fontWeight: 'bold' },
  saveBtn: { flex: 2, height: 54, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBox: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 36, minHeight: '55%', maxHeight: '85%' },
  modalHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 14 },
  modalTitle: { fontSize: 17, fontWeight: 'bold', flex: 1 },
  closeBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  closeBtnText: { fontSize: 13, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', padding: 20 },
  notifCard: { flexDirection: 'row', padding: 14, borderRadius: 12, marginBottom: 10, borderWidth: 1, alignItems: 'center' },
  notifText: { fontSize: 14, lineHeight: 20 },
  notifTime: { fontSize: 11, marginTop: 6, fontWeight: '600' },
  iotCard: { padding: 14, borderRadius: 14, marginBottom: 14, borderWidth: 1 },
  iotCardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  iotFarmName: { fontSize: 15, fontWeight: 'bold' },
  iotStatus: { fontSize: 12, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  iotDataRow: { flexDirection: 'row', padding: 10, borderRadius: 10, marginBottom: 12 },
  iotDataBox: { flex: 1, alignItems: 'center' },
  iotDataVal: { fontSize: 18, fontWeight: 'bold' },
  iotDataLabel: { fontSize: 11, marginTop: 3 },
  iotBtn: { paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  iotBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
