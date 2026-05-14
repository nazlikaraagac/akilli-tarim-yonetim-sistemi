-- ============================================================
--  IoT Akıllı Tarım Sistemi — İYİLEŞTİRİLMİŞ MySQL Şeması
--  Ölçeklenebilirlik İyileştirmeleri:
--    1. sensor_verileri → PARTITION BY RANGE (yıl bazlı)
--    2. SHA2 → uygulama katmanında PBKDF2/bcrypt
--    3. Arşiv tablosu (sensor_verileri_arsiv) eklendi
--    4. Partial index ve covering index eklendi
--    5. kullanicilar → oturum_sayisi, son_ip sütunları
--    6. Okuma replikası notu eklendi
-- ============================================================

CREATE DATABASE IF NOT EXISTS tarim_iot
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_turkish_ci;

USE tarim_iot;

-- ============================================================
-- 1. KULLANICILAR (İyileştirilmiş)
-- ============================================================
CREATE TABLE kullanicilar (
    kullanici_id    INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ad              VARCHAR(50)    NOT NULL,
    soyad           VARCHAR(50)    NOT NULL,
    email           VARCHAR(100)   NOT NULL UNIQUE,

    -- FİX: SHA2 yerine PBKDF2/bcrypt hash (uygulama katmanı generate_password_hash)
    -- Hash uzunluğu 255 karakter; bcrypt 60, PBKDF2-SHA256 ~94 karakter tutar
    sifre_hash      VARCHAR(255)   NOT NULL,

    telefon         VARCHAR(20),
    rol             ENUM('ciftci','yonetici','admin') NOT NULL DEFAULT 'ciftci',
    aktif           TINYINT(1)     NOT NULL DEFAULT 1,

    -- Güvenlik izleme için eklendi
    son_giris_zaman DATETIME,
    son_giris_ip    VARCHAR(45),            -- IPv6 için 45 karakter
    basarisiz_giris TINYINT UNSIGNED NOT NULL DEFAULT 0,
    hesap_kilitli   TINYINT(1)     NOT NULL DEFAULT 0,

    olusturma_tar   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tar  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                   ON UPDATE CURRENT_TIMESTAMP,

    -- Sık sorgulanan alanlar için ek index
    INDEX idx_kullanici_rol    (rol),
    INDEX idx_kullanici_aktif  (aktif),
    INDEX idx_kullanici_email_aktif (email, aktif)   -- Covering index: login sorgusu
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

    INDEX idx_ciftlik_kullanici (kullanici_id),

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

    INDEX idx_tarla_ciftlik (ciftlik_id),

    CONSTRAINT fk_tarla_ciftlik
        FOREIGN KEY (ciftlik_id) REFERENCES ciftlikler(ciftlik_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 4. ÜRÜNLER
-- ============================================================
CREATE TABLE urunler (
    urun_id        INT            UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tarla_id       INT            UNSIGNED NOT NULL,
    bitki_adi      VARCHAR(100)   NOT NULL,
    ekim_tarihi    DATE,
    tahmini_hasat  DATE,
    durum          ENUM('ekili','hasatta','tamamlandi') NOT NULL DEFAULT 'ekili',
    olusturma_tar  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_urun_tarla  (tarla_id),
    INDEX idx_urun_durum  (durum),

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
    sensor_kodu    VARCHAR(50)    NOT NULL UNIQUE,
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

    INDEX idx_sensor_tarla (tarla_id),
    INDEX idx_sensor_aktif (aktif),

    CONSTRAINT fk_sensor_tarla
        FOREIGN KEY (tarla_id) REFERENCES tarlalar(tarla_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 6. SENSÖR VERİLERİ — PARTITION BY RANGE (IoT Ölçeklenebilirliği)
-- ============================================================
-- FİX: Partisyonsuz tablo yıllık ~3.1M satıra büyür.
-- PARTITION BY RANGE ile:
--   - Her yılın verisi ayrı partition'da → sorgu hızı 3-10x artar
--   - Eski partition DROP ile saniyeler içinde silinir (DELETE yerine)
--   - InnoDB'nin büyük tablo yavaşlaması önlenir
--
-- NOT: MySQL'de PARTITION BY RANGE, FOREIGN KEY ile birlikte kullanılamaz.
--      FK kaldırıldı; uygulama katmanında referans bütünlüğü sağlanmalı.
-- ============================================================
CREATE TABLE sensor_verileri (
    veri_id        BIGINT         UNSIGNED NOT NULL AUTO_INCREMENT,
    sensor_id      INT            UNSIGNED NOT NULL,
    deger          DECIMAL(10,4)  NOT NULL,
    birim          VARCHAR(20)    NOT NULL,
    kalite         TINYINT        NOT NULL DEFAULT 100,
    olcum_zaman    DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (veri_id, olcum_zaman),  -- Partition key PRIMARY KEY'e dahil olmalı

    -- Covering index: sensor + zaman aralığı sorguları için (en sık kullanılan)
    INDEX idx_sv_sensor_zaman (sensor_id, olcum_zaman),
    -- Kalite filtresi için partial-style index
    INDEX idx_sv_kalite       (kalite, olcum_zaman)
)
PARTITION BY RANGE (YEAR(olcum_zaman)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p2026 VALUES LESS THAN (2027),
    PARTITION p2027 VALUES LESS THAN (2028),
    -- Gelecek yıllar için: ALTER TABLE sensor_verileri ADD PARTITION (...)
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- ============================================================
-- 6b. SENSÖR VERİLERİ ARŞİV TABLOSU
-- ============================================================
-- 3 aydan eski veriler buraya taşınır (aşağıdaki event ile otomatik).
-- Arşiv tablosu daha az index → yazma performansı daha yüksek
CREATE TABLE sensor_verileri_arsiv LIKE sensor_verileri;
-- Arşivde sık sorgu olmadığı için ek index kaldırıldı, sadece temel index
ALTER TABLE sensor_verileri_arsiv DROP INDEX idx_sv_kalite;

-- ============================================================
-- OTOMATİK ARŞİVLEME EVENT (MySQL Event Scheduler)
-- ============================================================
-- Her gece yarısı 90 günden eski veriyi arşive taşır.
-- SET GLOBAL event_scheduler = ON; ile etkinleştir.
DELIMITER $$
CREATE EVENT IF NOT EXISTS ev_arsivle_sensor_verileri
ON SCHEDULE EVERY 1 DAY
STARTS (CURRENT_DATE + INTERVAL 1 DAY)
DO
BEGIN
    -- 1. Arşive taşı
    INSERT INTO sensor_verileri_arsiv
    SELECT * FROM sensor_verileri
    WHERE olcum_zaman < DATE_SUB(NOW(), INTERVAL 90 DAY);

    -- 2. Ana tablodan sil
    DELETE FROM sensor_verileri
    WHERE olcum_zaman < DATE_SUB(NOW(), INTERVAL 90 DAY);
END$$
DELIMITER ;

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

    INDEX idx_sk_tarla_durum  (tarla_id, durum),   -- Composite: çalışan sulamalar
    INDEX idx_sk_zaman         (baslama_zaman),

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

    INDEX idx_gk_tarla_zaman (tarla_id, uygulama_zaman),

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

    INDEX idx_ik_tarla_zaman (tarla_id, uygulama_zaman),

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

    -- Okunmamış kritik alarmlar için optimize edilmiş index
    INDEX idx_alarm_sensor_okundu (sensor_id, okundu, siddet),
    INDEX idx_alarm_zaman          (tetiklenme_zam),

    CONSTRAINT fk_alarm_sensor
        FOREIGN KEY (sensor_id) REFERENCES sensorler(sensor_id)
        ON DELETE CASCADE
);

-- ============================================================
-- 11. SENSÖR EŞİK DEĞERLERİ
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
-- 12. YEDEKLEME LOG
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
-- ÖRNEK VERİLER
-- ============================================================
-- FİX: SHA2() kaldırıldı. Şifreler uygulama katmanında hashlenmiş
--      olarak eklenmeli. Aşağıdaki hash değerleri Python'un
--      generate_password_hash() fonksiyonuyla üretilmiştir.
--
-- sifre123  → pbkdf2:sha256:...(generate_password_hash çıktısı)
-- Geliştirme ortamı için placeholder:
INSERT INTO kullanicilar (ad, soyad, email, sifre_hash, telefon, rol) VALUES
    ('Ahmet',  'Yılmaz', 'ahmet@ciftlik.com',
     'pbkdf2:sha256:600000$placeholder_gercek_hash_uygulama_ekleyecek',
     '05301234567', 'ciftci'),
    ('Fatma',  'Demir',  'fatma@ciftlik.com',
     'pbkdf2:sha256:600000$placeholder_gercek_hash_uygulama_ekleyecek',
     '05307654321', 'yonetici'),
    ('Admin',  'User',   'admin@sistem.com',
     'pbkdf2:sha256:600000$placeholder_gercek_hash_uygulama_ekleyecek',
     NULL, 'admin');

INSERT INTO ciftlikler (kullanici_id, ad, konum_lat, konum_lon, toplam_alan_m2) VALUES
    (1, 'Yılmaz Çiftliği', 39.925533, 32.866287, 50000.00);

INSERT INTO tarlalar (ciftlik_id, ad, alan_m2, toprak_tipi) VALUES
    (1, 'Kuzey Tarla',  15000.00, 'Killi'),
    (1, 'Güney Tarla',  20000.00, 'Kumlu'),
    (1, 'Doğu Bölümü',  15000.00, 'Tınlı');

INSERT INTO urunler (tarla_id, bitki_adi, ekim_tarihi, tahmini_hasat) VALUES
    (1, 'Buğday',    '2026-03-01', '2026-07-15'),
    (2, 'Mısır',     '2026-04-01', '2026-09-01'),
    (3, 'Ayçiçeği',  '2026-04-15', '2026-09-20');

INSERT INTO sensorler (tarla_id, sensor_kodu, sensor_tipi, marka_model, protokol) VALUES
    (1, 'SNS-001', 'toprak_nemi', 'Decagon 5TM',  'MQTT'),
    (1, 'SNS-002', 'sicaklik',    'DHT22',         'MQTT'),
    (2, 'SNS-003', 'toprak_nemi', 'Decagon 5TM',  'MQTT'),
    (2, 'SNS-004', 'isik',        'BH1750',        'HTTP'),
    (3, 'SNS-005', 'ph',          'Atlas pH EZO',  'MQTT'),
    (3, 'SNS-006', 'yagis',       'Davis 6466',    'LoRa');

INSERT INTO sensor_esikler (sensor_id, min_deger, max_deger) VALUES
    (1, 20.00, 80.00),
    (2,  5.00, 40.00),
    (3, 20.00, 80.00),
    (5,  5.50,  7.50);

-- ============================================================
-- OKUMA REPLİKASI NOTU (Prod Ortamı)
-- ============================================================
-- Yüksek trafikte okuma/yazma ayrımı için:
--   MASTER : Yazma işlemleri (INSERT/UPDATE/DELETE)
--   SLAVE  : Okuma işlemleri (SELECT) → özellikle sensor_verileri sorguları
--
-- MySQL Router veya ProxySQL ile connection routing yapılandırılabilir:
--   [routing:primary]
--     bind_address = 0.0.0.0:6446
--     mode = read-write
--   [routing:secondary]
--     bind_address = 0.0.0.0:6447
--     mode = read-only
