const SEHIR = 'Elazig';

const WMO_ICONS = {
  sunny: '☀️', clear: '🌙', cloudy: '☁️', partly: '⛅',
  rain: '🌧️', drizzle: '🌦️', snow: '❄️', thunder: '⛈️', fog: '🌫️',
};

function getIcon(desc = '') {
  const d = desc.toLowerCase();
  if (d.includes('thunder')) return WMO_ICONS.thunder;
  if (d.includes('snow') || d.includes('blizzard')) return WMO_ICONS.snow;
  if (d.includes('rain') || d.includes('shower')) return WMO_ICONS.rain;
  if (d.includes('drizzle') || d.includes('light rain')) return WMO_ICONS.drizzle;
  if (d.includes('fog') || d.includes('mist')) return WMO_ICONS.fog;
  if (d.includes('overcast') || d.includes('cloudy')) return WMO_ICONS.cloudy;
  if (d.includes('partly') || d.includes('partial')) return WMO_ICONS.partly;
  if (d.includes('sunny') || d.includes('clear')) return WMO_ICONS.sunny;
  return '🌤️';
}

export async function fetchHavaDurumu() {
  try {
    const res = await fetch(`https://wttr.in/${SEHIR}?format=j1`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error('API hatası');
    const json = await res.json();
    const cur = json.current_condition[0];
    const desc = cur.weatherDesc[0].value;
    return {
      sehir: 'Elazığ',
      sicaklik: `${cur.temp_C}°C`,
      durum: desc,
      nem: `%${cur.humidity}`,
      ruzgar: `${cur.windspeedKmph} km/s`,
      icon: getIcon(desc),
      gercek: true,
    };
  } catch {
    // Ağ hatasında fallback
    return {
      sehir: 'Elazığ',
      sicaklik: '24°C',
      durum: 'Parçalı Bulutlu',
      nem: '%58',
      ruzgar: '12 km/s',
      icon: '⛅',
      gercek: false,
    };
  }
}
