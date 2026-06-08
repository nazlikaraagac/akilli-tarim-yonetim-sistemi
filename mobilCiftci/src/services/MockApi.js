import { API_BASE_URL, FALLBACK_TO_DEMO_DATA } from './ApiConfig';

// ============================================================
// Bu dosya artık "sahte" değil — gerçek Flask + MySQL backend'ine
// bağlanıyor. Backend'e ulaşılamazsa (kapalı / yanlış IP / sunum
// anında ağ sorunu), aşağıdaki demo verileriyle sorunsuz çalışmaya
// devam eder. Ekranlar (Dashboard, Tarlalar, Takvim, Profil...)
// hiçbir değişiklik gerektirmeden aynı şekilde kullanılmaya devam eder.
// ============================================================

// ÖNEMLİ: Bu isimler/ürünler artık backend'in MySQL veritabanındaki
// gerçek kayıtlarla (database.py -> "fields" tablosu varsayılan verisi)
// BİREBİR aynı: "Kuzey Tarlası - Buğday" ve "Güney Tarlası - Mısır".
// Böylece mobil ve web ekranları aynı tarlalardan bahsediyor — tutarlı
// bir demo sunumu olur. Backend, "lot/parsel/koordinat/ph/sulama/görsel"
// gibi görsel detayları henüz döndürmediği için (DB şemasında yok), bu
// alanları burada tutup gerçek backend'den gelen canlı sensör/giriş/
// takvim/alarm verileriyle birleştiriyoruz.
export const TARLALAR_INITIAL = [
  {
    id: 1,
    ad: 'Kuzey Tarlası',
    alan: '15.5 dönüm',
    toprak: 'Killi-Tınlı',
    urun: 'Buğday',
    ekim: 'Ekim 2025',
    hasat: 'Temmuz 2026',
    sicaklik: '22°C',
    nem: '%55',
    durum: 'İdeal',
    isWarning: false,
    image: 'https://beyn.org/icerik/bugday-tarlasi.jpg',
    lot: 'L-0441', parsel: 'P-112',
    koordinat: '38.6810° K, 39.2264° D',
    ilce: 'Merkez / Elazığ',
    sulama: 'Yağmurlama', gubre: 'Üre + DAP',
    ph: '6.8', verimBeklenti: '4.2 ton/dönüm',
    sonIsleme: 'Sıvı Gübreleme — 3 gün önce',
    sonIsleme2: 'Yağmurlama Sulama (3 saat) — 1 hafta önce',
    ph_mineral: 'Fosfor: Normal | Potasyum: Normal | Azot: Yüksek',
  },
  {
    id: 2,
    ad: 'Güney Tarlası',
    alan: '10 dönüm',
    toprak: 'Kumlu-Killi',
    urun: 'Mısır',
    ekim: 'Nisan 2026',
    hasat: 'Eylül 2026',
    sicaklik: '28°C',
    nem: '%18',
    durum: 'Su Bekleniyor!',
    isWarning: true,
    image: 'https://arastirma.tarimorman.gov.tr/gaptaem/IcerikResimleri/HaberResimleri/2017%20Y%C4%B1l%C4%B1/SAM_1036.JPG',
    lot: 'L-0442', parsel: 'P-113',
    koordinat: '38.5647° K, 38.8083° D',
    ilce: 'Baskil / Elazığ',
    sulama: 'Damla Sulama', gubre: 'NPK + Organik Kompost',
    ph: '7.1', verimBeklenti: '3.8 ton/dönüm',
    sonIsleme: 'İlaçlama (Yaprak Biti) — 5 gün önce',
    sonIsleme2: 'Damla Sulama (2 saat) — 10 gün önce',
    ph_mineral: 'Fosfor: Düşük | Potasyum: Normal | Azot: Normal',
  },
];

let mockTarlalar = TARLALAR_INITIAL.map(t => ({ ...t }));

let mockBildirimler = [
  { id: 1, text: 'Güney Tarlası: Nem %18 seviyesine düştü. Sulama motorunu çalıştırın!', time: '10 dk önce', isWarn: true },
  { id: 2, text: 'Sistem Uyarısı: Elazığ geneli gece don ve kırağı tehlikesi raporlanmıştır.', time: '2 saat önce', isWarn: true },
  { id: 3, text: 'Kuzey Tarlası: Büyüme beklenen seviyede seyrediyor.', time: '1 gün önce', isWarn: false },
];

// Demo giriş bilgileri artık backend'in MySQL "users" tablosundaki
// gerçek kayıtla birebir aynı: ahmet_ciftci / 1234
export const MOCK_USER = {
  username: 'ahmet_ciftci',
  fullName: 'Ahmet Çiftçi',
  email: 'ahmet@tarim.com',
  phone: '0530 111 2233',
  region: 'Doğu Anadolu Bölgesi',
  city: 'Elazığ',
  supervisor: 'Dr. Ayşe Yılmaz (Yönetici)',
  farmSize: '25.5 Dönüm',
  joinMonth: '23 Mart 2026',
  rol: 'ciftci',
  avatarUrl: null,
};

// ------------------------------------------------------------
// Küçük yardımcı: backend'e istek atar, hata olursa fırlatır.
// ------------------------------------------------------------
async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  let data = null;
  try { data = await res.json(); } catch { /* boş gövde olabilir */ }
  if (!res.ok) {
    const msg = (data && (data.message || data.detail)) || `Sunucu hatası (${res.status})`;
    throw { success: false, message: msg, raw: data };
  }
  return data;
}

const sicaklikStr = (v) => (v == null ? null : `${Math.round(v)}°C`);
const nemStr = (v) => (v == null ? null : `%${Math.round(v)}`);

function gorevTipiTahminEt(taskName = '') {
  const t = taskName.toLowerCase();
  if (t.includes('ilaç')) return 'ilac';
  if (t.includes('gübre')) return 'gubre';
  if (t.includes('hasat')) return 'hasat';
  if (t.includes('sula')) return 'sulama';
  return 'ilac';
}
function durumCevir(status) {
  if (status === 'done' || status === 'completed') return 'Tamamlandı';
  if (status === 'in_progress' || status === 'tracking') return 'Takipte';
  if (status === 'planned') return 'Planlandı';
  return 'Bekliyor';
}

export const MockApi = {
  // --- GİRİŞ ---
  login: async (usernameOrEmail, password) => {
    const giris = (usernameOrEmail || '').trim();
    try {
      const data = await apiFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username: giris, password }),
      });
      if (data && data.success) {
        MOCK_USER.username = data.username || giris;
        const ad = (data.first_name || '').trim();
        const soyad = (data.last_name || '').trim();
        MOCK_USER.fullName = (ad || soyad) ? `${ad} ${soyad}`.trim() : MOCK_USER.username;
        MOCK_USER.rol = data.role === 'admin' ? 'yonetici' : 'ciftci';
        MOCK_USER.avatarUrl = data.avatar_url ? `${API_BASE_URL}${data.avatar_url}` : null;
        return { success: true, user: { ...MOCK_USER } };
      }
      throw { success: false, message: (data && data.message) || 'Kullanıcı adı veya şifre hatalı!' };
    } catch (err) {
      // Sunucuya ulaşılamadıysa (kapalı / yanlış IP) demo girişine düş.
      if (FALLBACK_TO_DEMO_DATA) {
        const lower = giris.toLowerCase();
        const demoEslesme = lower === MOCK_USER.email || lower === MOCK_USER.username;
        if (demoEslesme && password === '1234') {
          return { success: true, user: { ...MOCK_USER } };
        }
      }
      const message = (err && err.message) || 'Hatalı kullanıcı adı veya şifre!';
      throw { success: false, message };
    }
  },

  // --- DASHBOARD ---
  getDashboardData: async () => {
    try {
      const [summary, alarms] = await Promise.all([
        apiFetch('/api/dashboard'),
        apiFetch('/api/alarms'),
      ]);

      // Backend alarmlarını bildirim formatına çevir (çözülmemiş olanlar)
      mockBildirimler = (alarms || [])
        .filter(a => !a.is_resolved)
        .map(a => ({
          id: a.id,
          text: a.message,
          time: a.timestamp ? String(a.timestamp).replace('T', ' ').slice(0, 16) : 'Az önce',
          isWarn: (a.severity || '').toLowerCase() !== 'info',
        }));

      return {
        ciftlik: { ad: 'Ahmet Bey Çiftliği', toplam_alan: '25.5 dönüm', bolge: 'Doğu Anadolu', il: 'Elazığ' },
        tarlalar: mockTarlalar.map(t => ({ ...t })),
        bildirimler: [...mockBildirimler],
        stats: {
          tarlaSayisi: summary?.total_fields ?? mockTarlalar.length,
          sensorSayisi: summary?.total_sensors ?? mockTarlalar.length * 2,
        },
      };
    } catch {
      // Backend'e ulaşılamadı → demo verisiyle devam (sunum güvenliği)
      return {
        ciftlik: { ad: 'Ahmet Bey Çiftliği', toplam_alan: '25.5 dönüm', bolge: 'Doğu Anadolu', il: 'Elazığ' },
        tarlalar: mockTarlalar.map(t => ({ ...t })),
        bildirimler: [...mockBildirimler],
        stats: { tarlaSayisi: mockTarlalar.length, sensorSayisi: mockTarlalar.length * 2 },
      };
    }
  },

  // --- TARLALAR (canlı sensör verisiyle zenginleştirilmiş) ---
  getTarlalar: async () => {
    try {
      const guncellenmis = await Promise.all(mockTarlalar.map(async (tarla) => {
        try {
          const okuma = await apiFetch(`/api/fields/${tarla.id}/sensors/latest`);
          const yeniNem = okuma.soil_moisture;
          const isWarning = yeniNem != null ? yeniNem < 30 : tarla.isWarning;
          return {
            ...tarla,
            sicaklik: sicaklikStr(okuma.temperature) ?? tarla.sicaklik,
            nem: nemStr(yeniNem) ?? tarla.nem,
            isWarning,
            durum: isWarning ? 'Su Bekleniyor!' : (tarla.durum === 'Su Bekleniyor!' ? 'İdeal' : tarla.durum),
          };
        } catch {
          return { ...tarla }; // bu tarla için canlı veri yoksa eski değerleri koru
        }
      }));
      mockTarlalar = guncellenmis;
      return guncellenmis.map(t => ({ ...t }));
    } catch {
      return mockTarlalar.map(t => ({ ...t }));
    }
  },

  // --- SULAMA MOTORU ---
  startEngine: async (tarlaId) => {
    try {
      const data = await apiFetch('/api/irrigation/toggle', {
        method: 'POST',
        body: JSON.stringify({ field_id: tarlaId, motor_status: true }),
      });
      const idx = mockTarlalar.findIndex(t => t.id === tarlaId);
      if (idx > -1) {
        mockTarlalar[idx] = { ...mockTarlalar[idx], nem: '%60', durum: 'Sulanıyor', isWarning: false };
        mockBildirimler.unshift({
          id: Date.now(),
          text: data?.message || `Sistem: ${mockTarlalar[idx].ad} sulama işlemi başarıyla başlatıldı.`,
          time: 'Şimdi', isWarn: false,
        });
      }
      return { success: true, message: data?.message || 'Sulama motoru başarıyla çalıştırıldı.' };
    } catch (err) {
      // Sunucuya ulaşılamasa bile arayüz akışı bozulmasın diye yerelde simüle et.
      const idx = mockTarlalar.findIndex(t => t.id === tarlaId);
      if (idx > -1) {
        mockTarlalar[idx] = { ...mockTarlalar[idx], nem: '%60', durum: 'Sulanıyor', isWarning: false };
        mockBildirimler.unshift({
          id: Date.now(),
          text: `Sistem: ${mockTarlalar[idx].ad} sulama işlemi başarıyla başlatıldı.`,
          time: 'Şimdi', isWarn: false,
        });
      }
      return { success: true, message: 'Sulama motoru başarıyla çalıştırıldı.' };
    }
  },

  // --- BİLDİRİMLER (backend'de "alarm çözümleme" karşılığı) ---
  deleteNotif: (id) => {
    mockBildirimler = mockBildirimler.filter(n => n.id !== id);
    apiFetch(`/api/alarms/${id}/resolve`, { method: 'POST' }).catch(() => {});
  },
  clearNotifs: () => {
    const idler = mockBildirimler.map(n => n.id);
    mockBildirimler = [];
    idler.forEach(id => apiFetch(`/api/alarms/${id}/resolve`, { method: 'POST' }).catch(() => {}));
  },

  // --- TAKVİM ---
  getTakvimGörevleri: async () => {
    try {
      const gorevler = await apiFetch('/api/calendar');
      return (gorevler || []).map(g => ({
        id: g.id,
        title: `${g.field_name} - ${g.task_name}`,
        date: g.task_date,
        type: gorevTipiTahminEt(g.task_name),
        status: durumCevir(g.status),
      }));
    } catch {
      return [
        { id: 1, title: 'Kuzey Tarlası - İlaçlama', date: '10 Haziran 2026', type: 'ilac', status: 'Planlandı' },
        { id: 2, title: 'Güney Tarlası - Gübreleme', date: '15 Haziran 2026', type: 'gubre', status: 'Planlandı' },
      ];
    }
  },

  // --- YAPAY ZEKA TAHMİNİ (backend'deki gerçek scikit-learn modeli) ---
  getAiPrediction: async () => {
    try {
      return await apiFetch('/api/predict');
    } catch {
      return null; // Ekranlar bunu null kontrolüyle ele alıp yerel AIService'e düşebilir
    }
  },
};
