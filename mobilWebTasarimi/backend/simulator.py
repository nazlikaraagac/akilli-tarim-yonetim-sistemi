import time
import random
from database import get_db_connection

def simulate_sensors():
    print("🌿 Sensör Simülatörü Başlatıldı... (Çıkış için CTRL+C)")
    
    while True:
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            
            # Sistemdeki tüm sensörleri bul
            cursor.execute("SELECT id, field_id FROM sensors")
            sensors = cursor.fetchall()
            
            for sensor in sensors:
                sensor_id = sensor["id"]
                field_id = sensor["field_id"]
                
                # Rastgele ama mantıklı tarım verileri üret
                temp = round(random.uniform(18.0, 35.0), 1)
                hum = round(random.uniform(40.0, 80.0), 1)
                soil_m = round(random.uniform(20.0, 60.0), 1)
                nitro = round(random.uniform(30.0, 50.0), 1)
                phos = round(random.uniform(20.0, 40.0), 1)
                potas = round(random.uniform(10.0, 30.0), 1)
                
                # Veritabanına kaydet
                cursor.execute("""
                    INSERT INTO sensor_readings 
                    (sensor_id, temperature, humidity, soil_moisture, nitrogen, phosphorus, potassium)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                """, (sensor_id, temp, hum, soil_m, nitro, phos, potas))
                
                # Kritik durum kontrolü (Alarm tetikleme)
                if soil_m < 25.0:
                    cursor.execute("""
                        INSERT INTO alarms (field_id, message, severity)
                        VALUES (?, ?, ?)
                    """, (field_id, f"Kritik Toprak Nemi (%{soil_m}) - Sulama Gerekli!", "Kritik"))
                    print(f"⚠️ ALARM: Tarla {field_id} için toprak nemi çok düşük!")
            
            conn.commit()
            conn.close()
            
            print(f"[{time.strftime('%H:%M:%S')}] Tüm sensörlerden veriler okundu ve kaydedildi.")
            
            # Gerçekte her dakika çalışır, test için 10 saniyede bir yapıyoruz
            time.sleep(10)
            
        except KeyboardInterrupt:
            print("\nSimülatör durduruldu.")
            break
        except Exception as e:
            print(f"Hata oluştu: {e}")
            time.sleep(5)

if __name__ == "__main__":
    simulate_sensors()
