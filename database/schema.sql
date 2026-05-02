-- ============================================================
--  IoT Akıllı Tarım Sistemi — MySQL Veritabanı Şeması
--  Hazırlayan : Özgür Ulusoy
--  Tarih       : 2026-04-29
-- ============================================================

-- ------------------------------------------------------------
-- 0. VERİTABANI
-- ------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS tarim_iot
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_turkish_ci;

USE tarim_iot;

-- ============================================================
-- 1. KULLANICILAR
-- ============================================================
CREATE TABLE kullanicilar (
    kullanici_id   INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ad             VARCHAR(50)    NOT NULL,
    soyad          VARCHAR(50)    NOT NULL,
    email          VARCHAR(100)   NOT NULL UNIQUE,
    sifre_hash     VARCHAR(255)   NOT NULL,
    telefon        VARCHAR(20),
    rol            ENUM('ciftci','yonetici','admin') NOT NULL DEFAULT 'ciftci',
    aktif          TINYINT(1)     NOT NULL DEFAULT 1,
    olusturma_tar  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tar DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                  ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. ÇİFTLİKLER
-- ============================================================
CREATE TABLE ciftlikler (
    ciftlik_id     INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kullanici_id   INT            UNSIGNED NOT NULL,
    ad             VARCHAR(100)   NOT NULL,
    konum_lat      DECIMAL(9,6),
    konum_lon      DECIMAL(9,6),
    toplam_alan_m2 DECIMAL(10,2),
    aciklama       TEXT,
    olusturma_tar  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ciftlik_kullanici
        FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(kullanici_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 3. TARLALAR
-- ============================================================
CREATE TABLE tarlalar (
    tarla_id       INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ciftlik_id     INT            UNSIGNED NOT NULL,
    ad             VARCHAR(100)   NOT NULL,
    alan_m2        DECIMAL(10,2),
    toprak_tipi    VARCHAR(50),
    olusturma_tar  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tarla_ciftlik
        FOREIGN KEY (ciftlik_id) REFERENCES ciftlikler(ciftlik_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 4. ÜRÜNLER (Ekilen bitkiler)
-- ============================================================
CREATE TABLE urunler (
    urun_id        INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tarla_id       INT            UNSIGNED NOT NULL,
    bitki_adi      VARCHAR(100)   NOT NULL,
    ekim_tarihi    DATE,
    tahmini_hasat  DATE,
    durum          ENUM('ekili','hasatta','tamamlandi') NOT NULL DEFAULT 'ekili',
    olusturma_tar  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_urun_tarla
        FOREIGN KEY (tarla_id) REFERENCES tarlalar(tarla_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 5. SENSÖRLER
-- ============================================================
CREATE TABLE sensorler (
    sensor_id      INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tarla_id       INT            UNSIGNED NOT NULL,
    sensor_kodu    VARCHAR(50)    NOT NULL UNIQUE,   -- cihaz seri no / MAC
    sensor_tipi    ENUM(
                       'toprak_nemi',
                       'sicaklik',
                       'isik',
                       'ph',
                       'yagis',
                       'nem',
                       'co2'
                   ) NOT NULL,
    marka_model    VARCHAR(100),
    protokol       ENUM('MQTT','HTTP','LoRa','Zigbee','BLE') NOT NULL DEFAULT 'MQTT',
    aktif          TINYINT(1)     NOT NULL DEFAULT 1,
    kurulum_tar    DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sensor_tarla
        FOREIGN KEY (tarla_id) REFERENCES tarlalar(tarla_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 6. SENSÖR VERİLERİ
-- ============================================================
CREATE TABLE sensor_verileri (
    veri_id        BIGINT         UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sensor_id      INT            UNSIGNED NOT NULL,
    deger          DECIMAL(10,4)  NOT NULL,
    birim          VARCHAR(20)    NOT NULL,   -- %, °C, lux, pH, mm …
    kalite         TINYINT        NOT NULL DEFAULT 100, -- 0-100 güvenilirlik skoru
    olcum_zaman    DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_sv_sensor   (sensor_id),
    INDEX idx_sv_zaman    (olcum_zaman),
    INDEX idx_sv_sen_zam  (sensor_id, olcum_zaman),  -- bileşik: aralık sorguları

    CONSTRAINT fk_sv_sensor
        FOREIGN KEY (sensor_id) REFERENCES sensorler(sensor_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 7. SULAMA KOMUTLARI
-- ============================================================
CREATE TABLE sulama_komutlari (
    komut_id       INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tarla_id       INT            UNSIGNED NOT NULL,
    tetikleyen     ENUM('otomatik','manuel') NOT NULL DEFAULT 'otomatik',
    baslama_zaman  DATETIME       NOT NULL,
    bitis_zaman    DATETIME,
    su_miktari_lt  DECIMAL(8,2),
    durum          ENUM('bekliyor','calisiyor','tamamlandi','iptal') NOT NULL DEFAULT 'bekliyor',
    aciklama       TEXT,
    olusturma_tar  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_sk_tarla  (tarla_id),
    INDEX idx_sk_zaman  (baslama_zaman),

    CONSTRAINT fk_sk_tarla
        FOREIGN KEY (tarla_id) REFERENCES tarlalar(tarla_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 8. GÜBRELEME KOMUTLARI
-- ============================================================
CREATE TABLE gubreleme_komutlari (
    komut_id       INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tarla_id       INT            UNSIGNED NOT NULL,
    gubre_turu     VARCHAR(100)   NOT NULL,
    miktar_kg      DECIMAL(8,2)   NOT NULL,
    tetikleyen     ENUM('otomatik','manuel') NOT NULL DEFAULT 'otomatik',
    uygulama_zaman DATETIME       NOT NULL,
    durum          ENUM('bekliyor','tamamlandi','iptal') NOT NULL DEFAULT 'bekliyor',
    aciklama       TEXT,
    olusturma_tar  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_gk_tarla (tarla_id),

    CONSTRAINT fk_gk_tarla
        FOREIGN KEY (tarla_id) REFERENCES tarlalar(tarla_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 9. İLAÇLAMA KOMUTLARI
-- ============================================================
CREATE TABLE ilaclama_komutlari (
    komut_id       INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tarla_id       INT            UNSIGNED NOT NULL,
    ilac_adi       VARCHAR(100)   NOT NULL,
    miktar_lt      DECIMAL(8,2)   NOT NULL,
    tetikleyen     ENUM('otomatik','manuel') NOT NULL DEFAULT 'otomatik',
    uygulama_zaman DATETIME       NOT NULL,
    durum          ENUM('bekliyor','tamamlandi','iptal') NOT NULL DEFAULT 'bekliyor',
    aciklama       TEXT,
    olusturma_tar  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_ik_tarla (tarla_id),

    CONSTRAINT fk_ik_tarla
        FOREIGN KEY (tarla_id) REFERENCES tarlalar(tarla_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 10. ALARMLAR
-- ============================================================
CREATE TABLE alarmlar (
    alarm_id       INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sensor_id      INT            UNSIGNED NOT NULL,
    alarm_tipi     ENUM('esik_asimi','baglanti_koptu','dusuk_batarya','anomali') NOT NULL,
    siddet         ENUM('dusuk','orta','yuksek','kritik') NOT NULL DEFAULT 'orta',
    mesaj          TEXT,
    tetiklenme_zam DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    okundu         TINYINT(1)     NOT NULL DEFAULT 0,
    cozuldu        TINYINT(1)     NOT NULL DEFAULT 0,
    cozum_zaman    DATETIME,

    INDEX idx_alarm_sensor (sensor_id),
    INDEX idx_alarm_zaman  (tetiklenme_zam),

    CONSTRAINT fk_alarm_sensor
        FOREIGN KEY (sensor_id) REFERENCES sensorler(sensor_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 11. SENSÖR EŞIK DEĞERLERİ
-- ============================================================
CREATE TABLE sensor_esikler (
    esik_id        INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sensor_id      INT            UNSIGNED NOT NULL UNIQUE,
    min_deger      DECIMAL(10,4),
    max_deger      DECIMAL(10,4),
    guncelleme_tar DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                  ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_esik_sensor
        FOREIGN KEY (sensor_id) REFERENCES sensorler(sensor_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 12. YEDEKLEMELer (Yedekleme log tablosu)
-- ============================================================
CREATE TABLE yedekleme_log (
    log_id         INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    yedek_adi      VARCHAR(200)   NOT NULL,
    boyut_mb       DECIMAL(8,2),
    durum          ENUM('basarili','basarisiz') NOT NULL,
    baslama_zaman  DATETIME       NOT NULL,
    bitis_zaman    DATETIME,
    notlar         TEXT
);

-- ============================================================
-- ÖRNEK VERİLER (geliştirme ortamı için)
-- ============================================================

INSERT INTO kullanicilar (ad, soyad, email, sifre_hash, telefon, rol) VALUES
    ('Ahmet',  'Yılmaz', 'ahmet@ciftlik.com',  SHA2('sifre123', 256), '05301234567', 'ciftci'),
    ('Fatma',  'Demir',  'fatma@ciftlik.com',  SHA2('sifre456', 256), '05307654321', 'yonetici'),
    ('Admin',  'User',   'admin@sistem.com',   SHA2('admin123', 256), NULL,          'admin');

INSERT INTO ciftlikler (kullanici_id, ad, konum_lat, konum_lon, toplam_alan_m2) VALUES
    (1, 'Yılmaz Çiftliği', 39.925533, 32.866287, 50000.00);

INSERT INTO tarlalar (ciftlik_id, ad, alan_m2, toprak_tipi) VALUES
    (1, 'Kuzey Tarla',  15000.00, 'Killi'),
    (1, 'Güney Tarla',  20000.00, 'Kumlu'),
    (1, 'Doğu Bölümü',  15000.00, 'Tınlı');

INSERT INTO urunler (tarla_id, bitki_adi, ekim_tarihi, tahmini_hasat) VALUES
    (1, 'Buğday', '2026-03-01', '2026-07-15'),
    (2, 'Mısır',  '2026-04-01', '2026-09-01'),
    (3, 'Ayçiçeği', '2026-04-15', '2026-09-20');

INSERT INTO sensorler (tarla_id, sensor_kodu, sensor_tipi, marka_model, protokol) VALUES
    (1, 'SNS-001', 'toprak_nemi', 'Decagon 5TM',   'MQTT'),
    (1, 'SNS-002', 'sicaklik',    'DHT22',          'MQTT'),
    (2, 'SNS-003', 'toprak_nemi', 'Decagon 5TM',   'MQTT'),
    (2, 'SNS-004', 'isik',        'BH1750',         'HTTP'),
    (3, 'SNS-005', 'ph',          'Atlas pH EZO',   'MQTT'),
    (3, 'SNS-006', 'yagis',       'Davis 6466',     'LoRa');

INSERT INTO sensor_esikler (sensor_id, min_deger, max_deger) VALUES
    (1, 20.00,  80.00),   -- toprak nemi %20-%80
    (2, 5.00,   40.00),   -- sıcaklık 5°C-40°C
    (3, 20.00,  80.00),
    (5, 5.50,    7.50);   -- pH 5.5-7.5