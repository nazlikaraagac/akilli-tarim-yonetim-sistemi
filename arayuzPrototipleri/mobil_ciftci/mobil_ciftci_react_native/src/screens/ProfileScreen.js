import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profilim</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>AÇ</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Ahmet Çelik</Text>
            <Text style={styles.profileRole}>Çiftçi Hesabı</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Tarla</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Sensör</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>A+</Text>
            <Text style={styles.statLabel}>Verim</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuGroup}>
          <MenuItem icon="person-circle-outline" title="Kişisel Bilgiler" />
          <MenuItem icon="map-outline" title="Tarlalarım" />
          <MenuItem icon="notifications-outline" title="Bildirim Ayarları" />
        </View>

        <View style={styles.menuGroup}>
          <MenuItem icon="lock-closed-outline" title="Şifre Değiştir" />
          <MenuItem icon="help-buoy-outline" title="Yardım ve Destek" />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} style={{marginRight: 8}} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const MenuItem = ({ icon, title }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuIconBox}>
      <Ionicons name={icon} size={20} color={COLORS.muted} />
    </View>
    <Text style={styles.menuTitle}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color={COLORS.border} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.darkBg },
  scrollContent: { padding: 16, paddingBottom: 40, backgroundColor: COLORS.background, minHeight: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 10 },
  header: { alignItems: 'center', marginBottom: 20, marginTop: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16 },
  avatarPlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  profileRole: { fontSize: 13, color: COLORS.muted, marginTop: 4 },
  editBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  statsRow: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 16, paddingVertical: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 24 },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  statLabel: { fontSize: 12, color: COLORS.muted, marginTop: 4 },
  statDivider: { width: 1, backgroundColor: COLORS.border, marginVertical: 4 },
  menuGroup: { backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  menuTitle: { flex: 1, fontSize: 15, fontWeight: '500', color: COLORS.text },
  logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, backgroundColor: '#FEE2E2', borderRadius: 16, marginTop: 8 },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: COLORS.error }
});
