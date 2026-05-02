import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function IrrigationScreen() {
  const [isAuto, setIsAuto] = useState(true);
  const [motorOn, setMotorOn] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Ionicons name="water" size={24} color={COLORS.info} style={{marginRight: 8}} />
          <Text style={styles.headerTitle}>Sulama Kontrolü</Text>
        </View>

        <View style={styles.alertBanner}>
          <Ionicons name="information-circle" size={24} color={COLORS.info} style={{marginRight: 10}} />
          <View style={{flex: 1}}>
            <Text style={styles.alertTitle}>Nem Seviyesi Uygun</Text>
            <Text style={styles.alertText}>Şu an sulama yapılmasına gerek yoktur. Toprak nemi %55 seviyesinde.</Text>
          </View>
        </View>

        {/* Mode Card */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View>
              <Text style={styles.cardTitle}>Otomatik Mod</Text>
              <Text style={styles.cardSubtitle}>Yapay zeka önerilerine göre sular.</Text>
            </View>
            <Switch
              value={isAuto}
              onValueChange={setIsAuto}
              trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
              thumbColor={isAuto ? COLORS.primary : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Big Control Button */}
        <View style={[styles.card, { alignItems: 'center', paddingVertical: 30 }]}>
          <TouchableOpacity 
            style={[styles.bigBtn, motorOn ? styles.btnDanger : styles.btnPrimary, isAuto && { opacity: 0.5 }]}
            disabled={isAuto}
            onPress={() => setMotorOn(!motorOn)}
          >
            <Ionicons name={motorOn ? "stop" : "play"} size={32} color="#fff" style={{marginRight: 10}} />
            <Text style={styles.bigBtnText}>{motorOn ? "Motoru Durdur" : "Motoru Başlat"}</Text>
          </TouchableOpacity>
          {isAuto && <Text style={styles.hintText}>Manuel kontrol için otomatik modu kapatın.</Text>}
        </View>

        {/* History */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Geçmiş Sulamalar</Text>
          <HistoryItem date="Bugün, 06:00" duration="45 dk" type="Otomatik" />
          <HistoryItem date="Dün, 19:30" duration="30 dk" type="Otomatik" />
          <HistoryItem date="28 Nisan, 18:00" duration="60 dk" type="Manuel" last />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const HistoryItem = ({ date, duration, type, last }) => (
  <View style={[styles.listItem, last && { borderBottomWidth: 0 }]}>
    <View style={styles.liIcon}>
      <Ionicons name="time" size={18} color={COLORS.muted} />
    </View>
    <View style={styles.liContent}>
      <Text style={styles.liTitle}>{date}</Text>
      <Text style={styles.liSub}>{type} Sulama</Text>
    </View>
    <Text style={styles.liValue}>{duration}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.darkBg },
  scrollContent: { padding: 16, paddingBottom: 30, backgroundColor: COLORS.background, minHeight: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: 10 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  alertBanner: { backgroundColor: '#EFF6FF', borderColor: COLORS.info, borderWidth: 1, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  alertTitle: { fontWeight: 'bold', color: '#1E40AF', fontSize: 14 },
  alertText: { color: '#1E40AF', fontSize: 12, marginTop: 2 },
  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  cardSubtitle: { fontSize: 12, color: COLORS.muted },
  bigBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
  btnPrimary: { backgroundColor: COLORS.info },
  btnDanger: { backgroundColor: COLORS.error },
  bigBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  hintText: { fontSize: 12, color: COLORS.muted, marginTop: 16 },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  liIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  liContent: { flex: 1 },
  liTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
  liSub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  liValue: { fontSize: 14, fontWeight: 'bold', color: COLORS.info }
});
