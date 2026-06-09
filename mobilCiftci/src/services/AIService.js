/*
 * Kural tabanlı tarım yapay zeka motoru
 * Scikit-learn benzeri karar ağacı mantığı simüle edilmektedir.
 */

const SULAMA_ESIK = 35;   // % nem — altında sulama önerisi
const SICAKLIK_ESIK = 32; // °C — üstünde sıcaklık uyarısı
const PH_MIN = 6.5;
const PH_MAX = 7.5;

function parseNem(str) { return parseInt(str.replace('%', '')) || 0; }
function parseSicaklik(str) { return parseInt(str.replace('°C', '')) || 0; }

export function analyzeTarla(tarla) {
  const nem = parseNem(tarla.nem);
  const sicaklik = parseSicaklik(tarla.sicaklik);
  const ph = parseFloat(tarla.ph) || 7.0;
  const oneriler = [];

  // ── Sulama kararı ──
  if (nem < 20) {
    oneriler.push({ tip: 'kritik', ikon: '🚨', mesaj: 'Acil Sulama Gerekli', detay: `Nem %${nem} — kritik alt sınır`, guven: 97 });
  } else if (nem < SULAMA_ESIK) {
    oneriler.push({ tip: 'uyari', ikon: '💧', mesaj: 'Sulama Planlanmalı', detay: `Nem %${nem} — 48 saat içinde sulama önerilir`, guven: Math.round(88 - (nem - 20)) });
  }

  // ── pH kararı ──
  if (ph < PH_MIN) {
    oneriler.push({ tip: 'uyari', ikon: '🧪', mesaj: 'Kireç Uygulaması Önerilir', detay: `pH ${ph} — asidik toprak tespit edildi`, guven: 84 });
  } else if (ph > PH_MAX) {
    oneriler.push({ tip: 'uyari', ikon: '🧪', mesaj: 'Sülfür Uygulaması Değerlendirin', detay: `pH ${ph} — bazik toprak tespit edildi`, guven: 76 });
  }

  // ── Sıcaklık kararı ──
  if (sicaklik > SICAKLIK_ESIK) {
    oneriler.push({ tip: 'bilgi', ikon: '🌡️', mesaj: 'Yüksek Sıcaklık Uyarısı', detay: `${sicaklik}°C — serinletme sulaması düşünülebilir`, guven: 71 });
  }

  // ── Pozitif durum ──
  if (oneriler.length === 0) {
    oneriler.push({ tip: 'iyi', ikon: '✅', mesaj: 'Koşullar İdeal', detay: 'Tüm parametreler normal aralıkta', guven: 99 });
  }

  return oneriler;
}

export function analyzeAllTarlalar(tarlalar) {
  // Her tarla için en kritik öneriyi al, genel özet üret
  const kritikler = [];
  const uyarilar = [];
  let iyiSayisi = 0;

  tarlalar.forEach(t => {
    const oneriler = analyzeTarla(t);
    oneriler.forEach(o => {
      if (o.tip === 'kritik') kritikler.push({ tarla: t.ad, ...o });
      else if (o.tip === 'uyari') uyarilar.push({ tarla: t.ad, ...o });
      else if (o.tip === 'iyi') iyiSayisi++;
    });
  });

  return { kritikler, uyarilar, iyiSayisi, toplam: tarlalar.length };
}
