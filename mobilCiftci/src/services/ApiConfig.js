// ============================================================
// BACKEND BAĞLANTI AYARI
// ============================================================
// Arkadaşlarınızın hazırladığı Flask + MySQL backend'i nerede
// çalışıyorsa o adresi aşağıya yazın.
//
//  - Bilgisayarınızda Docker ile çalıştırıyorsanız (docker compose up)
//    backend varsayılan olarak 8000 portunda açılır.
//  - Telefon GERÇEK CİHAZ ise "localhost" YAZMAYIN — telefon, kendi
//    içinde "localhost" arar ve bulamaz. Bilgisayarınızın yerel ağ
//    IP adresini yazmalısınız (örn: 192.168.1.34).
//
//    Mac'te bulmak için terminalde:   ipconfig getifaddr en0
//    Windows'ta:                       ipconfig  (IPv4 Adres satırı)
//
//  - Telefon ve bilgisayar AYNI Wi-Fi ağında olmalı.
// ============================================================

export const API_BASE_URL = 'http://192.168.1.100:8000';

// Sunucuya ulaşılamazsa (kapalıysa / IP yanlışsa) uygulama otomatik
// olarak yerel demo verileriyle çalışmaya devam eder — sunum sırasında
// "ekranda hiçbir şey görünmüyor" durumuna düşmemek için bir güvenlik ağı.
export const FALLBACK_TO_DEMO_DATA = true;
