import mysql.connector
import os

# XAMPP / WAMP için varsayılan MySQL ayarları
DB_CONFIG = {
    "host": os.environ.get("DB_HOST", "localhost"),
    "user": "root",
    "password": ""
}
DB_NAME = "tarim_iot"

def get_db_connection():
    # Veritabanı adı ile bağlan
    conn = mysql.connector.connect(
        host=DB_CONFIG["host"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        database=DB_NAME
    )
    return conn

def init_db():
    print("MySQL Veritabanı başlatılıyor...")
    
    # Önce sadece sunucuya bağlanıp veritabanını oluşturalım
    setup_conn = mysql.connector.connect(**DB_CONFIG)
    setup_cursor = setup_conn.cursor()
    setup_cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    setup_conn.commit()
    setup_conn.close()

    # Şimdi veritabanına bağlanıp tabloları kuralım
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1. Kullanıcılar Tablosu
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL,
        avatar_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Add email column if not exists (for existing databases)
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN email VARCHAR(100) UNIQUE")
        conn.commit()
    except Exception:
        pass

    # Add avatar_url column if not exists
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN avatar_url VARCHAR(255)")
        conn.commit()
    except Exception:
        pass

    # Add first_name column if not exists
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN first_name VARCHAR(50)")
        conn.commit()
    except Exception:
        pass

    # Add last_name column if not exists
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN last_name VARCHAR(50)")
        conn.commit()
    except Exception:
        pass

    # 2. Tarlalar Tablosu
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS fields (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        crop_type VARCHAR(50) NOT NULL,
        area_size FLOAT,
        owner_id INT,
        FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
    )
    ''')

    # 3. Sensörler Tablosu
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sensors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        field_id INT,
        type VARCHAR(50) NOT NULL,
        status VARCHAR(20) DEFAULT 'online',
        FOREIGN KEY (field_id) REFERENCES fields(id) ON DELETE CASCADE
    )
    ''')

    # 4. Sensör Verileri Tablosu
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sensor_readings (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        sensor_id INT,
        temperature FLOAT,
        humidity FLOAT,
        soil_moisture FLOAT,
        nitrogen FLOAT,
        phosphorus FLOAT,
        potassium FLOAT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sensor_id) REFERENCES sensors(id) ON DELETE CASCADE
    )
    ''')

    # 5. Alarmlar Tablosu
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS alarms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        field_id INT,
        message TEXT NOT NULL,
        severity VARCHAR(20) NOT NULL,
        is_resolved BOOLEAN DEFAULT 0,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (field_id) REFERENCES fields(id) ON DELETE CASCADE
    )
    ''')

    # 6. Yapay Zeka Önerileri Tablosu
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS ai_recommendations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        field_id INT,
        analysis_type VARCHAR(50) NOT NULL,
        status_label VARCHAR(50) NOT NULL,
        description TEXT,
        confidence_score FLOAT,
        is_active BOOLEAN DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (field_id) REFERENCES fields(id) ON DELETE CASCADE
    )
    ''')

    # 7. Tarım Takvimi Tablosu
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS farm_calendar (
        id INT AUTO_INCREMENT PRIMARY KEY,
        field_id INT,
        task_name VARCHAR(100) NOT NULL,
        task_date DATE NOT NULL,
        status VARCHAR(20) DEFAULT 'planned',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (field_id) REFERENCES fields(id) ON DELETE CASCADE
    )
    ''')

    # Varsayılan verileri ekleyelim (Eğer tablo boşsa)
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO users (username, email, password, role) VALUES ('ahmet_ciftci', 'ahmet@tarim.com', '1234', 'farmer')")
        cursor.execute("INSERT INTO users (username, email, password, role) VALUES ('ayse_yonetici', 'ayse@tarim.com', '1234', 'admin')")
        
        cursor.execute("INSERT INTO fields (name, crop_type, area_size, owner_id) VALUES ('Kuzey Tarlası', 'Buğday', 15.5, 1)")
        cursor.execute("INSERT INTO fields (name, crop_type, area_size, owner_id) VALUES ('Güney Tarlası', 'Mısır', 10.0, 1)")
        
        cursor.execute("INSERT INTO sensors (field_id, type) VALUES (1, 'DHT22')")
        cursor.execute("INSERT INTO sensors (field_id, type) VALUES (1, 'NPK')")

        # Örnek AI verisi
        cursor.execute("INSERT INTO ai_recommendations (field_id, analysis_type, status_label, description, confidence_score) VALUES (1, 'Yapay Zeka Analizi', 'Kritik', 'Acil Sulama Gerekli', 0.97)")
        
        # Örnek Takvim verisi
        cursor.execute("INSERT INTO farm_calendar (field_id, task_name, task_date, status) VALUES (1, 'İlaçlama', '2026-06-10', 'planned')")
        cursor.execute("INSERT INTO farm_calendar (field_id, task_name, task_date, status) VALUES (2, 'Gübreleme', '2026-06-15', 'planned')")

    conn.commit()
    conn.close()
    print("MySQL veritabanı kurulumu tamamlandı!")

if __name__ == "__main__":
    init_db()
