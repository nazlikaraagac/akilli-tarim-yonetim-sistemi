import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MockApi } from '../services/MockApi';
import { useTheme } from '../context/ThemeContext';

const TYPE_OPTIONS = [
  { key: "ilac", label: "İlaçlama", icon: "flask", color: "#ef4444" },
  { key: "gubre", label: "Gübreleme", icon: "nutrition", color: "#3b82f6" },
  { key: "hasat", label: "Hasat", icon: "leaf", color: "#eab308" },
  { key: "sulama", label: "Sulama", icon: "water", color: "#0ea5e9" },
];

const STATUS_COLORS = {
  'Bekliyor': '#f59e0b',
  'Planlandı': '#3b82f6',
  'Takipte': '#8b5cf6',
  'Tamamlandı': '#10b981',
};

export default function CalendarScreen() {
  const { c } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newType, setNewType] = useState('ilac');

  useEffect(() => {
    MockApi.getTakvimGörevleri().then(setTasks);
  }, []);

  const addTask = () => {
    if (!newTitle.trim() || !newDate.trim()) {
      Alert.alert('Uyarı', 'Lütfen görev adı ve tarihi giriniz.');
      return;
    }
    setTasks(prev => [{
      id: Date.now(), title: newTitle.trim(), date: newDate.trim(), type: newType, status: 'Planlandı',
    }, ...prev]);
    setNewTitle(''); setNewDate(''); setNewType('ilac');
    setModalVisible(false);
  };

  const markDone = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'Tamamlandı' } : t));
  
  const getTypeInfo = (type) => TYPE_OPTIONS.find(o => o.key === type) ?? TYPE_OPTIONS[0];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]}>
      <View style={styles.topBar}>
        <View>
          <Text style={[styles.title, { color: c.textMain }]}>📅 Tarım Takvimi</Text>
          <Text style={[styles.subtitle, { color: c.textMuted }]}>İlaçlama, gübreleme ve hasat işlemleri.</Text>
        </View>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: c.primary }]} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {tasks.map((task) => {
          const typeInfo = getTypeInfo(task.type);
          const isDone = task.status === 'Tamamlandı';
          const statusColor = STATUS_COLORS[task.status] ?? '#64748b';
          return (
            <View key={task.id} style={[styles.taskCard, { backgroundColor: c.card, borderColor: c.border }, isDone && { opacity: 0.55 }]}>
              <View style={[styles.iconContainer, { backgroundColor: typeInfo.color + '20' }]}>
                <Ionicons name={typeInfo.icon} size={26} color={isDone ? c.textMuted : typeInfo.color} />
              </View>
              <View style={styles.taskInfo}>
                <Text style={[styles.taskTitle, { color: c.textMain }, isDone && { textDecorationLine: 'line-through', color: c.textMuted }]}>{task.title}</Text>
                <Text style={[styles.taskDate, { color: c.textMuted }]}>📅 {task.date}</Text>
              </View>
              <View style={styles.rightCol}>
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '20', borderColor: statusColor }]}>
                  <Text style={[styles.statusText, { color: statusColor }]}>{task.status}</Text>
                </View>
                {!isDone && (
                  <TouchableOpacity style={styles.doneBtn} onPress={() => markDone(task.id)}>
                    <Ionicons name="checkmark-circle-outline" size={22} color={c.primary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: c.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: c.textMain }]}>Yeni Görev Ekle</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={c.textMuted} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.label, { color: c.textMuted }]}>GÖREV ADI</Text>
            <TextInput style={[styles.input, { backgroundColor: c.inputBg, borderColor: c.border, color: c.textMain }]} value={newTitle} onChangeText={setNewTitle} placeholder="ör. Kuzey Tarlası - İlaçlama" placeholderTextColor={c.textMuted} />
            <Text style={[styles.label, { color: c.textMuted }]}>TARİH</Text>
            <TextInput style={[styles.input, { backgroundColor: c.inputBg, borderColor: c.border, color: c.textMain }]} value={newDate} onChangeText={setNewDate} placeholder="ör. 15 Haziran 2026" placeholderTextColor={c.textMuted} />
            <Text style={[styles.label, { color: c.textMuted }]}>GÖREV TÜRÜ</Text>
            <View style={styles.typeRow}>
              {TYPE_OPTIONS.map(opt => (
                <TouchableOpacity key={opt.key} style={[styles.typeBtn, { borderColor: c.border, backgroundColor: c.background }, newType === opt.key && { backgroundColor: opt.color, borderColor: opt.color }]} onPress={() => setNewType(opt.key)}>
                  <Ionicons name={opt.icon} size={15} color={newType === opt.key ? '#fff' : opt.color} />
                  <Text style={[styles.typeBtnText, { color: newType === opt.key ? '#fff' : c.textMuted }]}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={[styles.saveBtn, { backgroundColor: c.primary }]} onPress={addTask}>
              <Text style={styles.saveBtnText}>Görevi Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 13, marginTop: 3 },
  addBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 20, paddingTop: 10 },
  taskCard: { flexDirection: 'row', padding: 15, borderRadius: 14, marginBottom: 12, borderWidth: 1, alignItems: 'center' },
  iconContainer: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 15, fontWeight: 'bold' },
  taskDate: { fontSize: 12, marginTop: 4 },
  rightCol: { alignItems: 'center', gap: 6 },
  statusBadge: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  doneBtn: { padding: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  label: { fontSize: 11, fontWeight: '700', marginBottom: 8, letterSpacing: 0.5 },
  input: { height: 48, borderRadius: 10, paddingHorizontal: 15, fontSize: 15, marginBottom: 16, borderWidth: 1 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  typeBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5 },
  typeBtnText: { fontSize: 13, fontWeight: '600' },
  saveBtn: { height: 52, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
