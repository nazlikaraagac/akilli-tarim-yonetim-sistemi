from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_db_connection, init_db

app = Flask(__name__, static_folder="static", static_url_path="/static")
CORS(app) # Arayüzlerin (Web/Mobil) API'ye erişebilmesi için CORS ayarları

import threading
import time
def _init_db_safely():
    for _ in range(15):
        try:
            init_db()
            print("Veritabanı bağlantısı ve kurulumu başarılı!")
            break
        except Exception as e:
            print("Veritabanı bekleniyor...", e)
            time.sleep(3)

threading.Thread(target=_init_db_safely, daemon=True).start()

import os
from werkzeug.utils import secure_filename

# --- GENEL ---

@app.route("/", methods=["GET"])
def read_root():
    return jsonify({"message": "ATYS Backend API (Flask) Çalışıyor! 🚀"})

# --- AUTH (GİRİŞ) ---

@app.route("/api/login", methods=["POST"])
def login():
    from werkzeug.security import check_password_hash
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        db_pass = user["password"]
        # Eğer şifre hashlenmişse check_password_hash ile, düz metinse doğrudan karşılaştır
        if db_pass.startswith("scrypt:") or db_pass.startswith("pbkdf2:"):
            is_valid = check_password_hash(db_pass, password)
        else:
            is_valid = (db_pass == password)
            
        if is_valid:
            return jsonify({
                "success": True, 
                "message": "Giriş başarılı!", 
                "role": user["role"], 
                "username": user["username"],
                "first_name": user.get("first_name", "") or "",
                "last_name": user.get("last_name", "") or "",
                "avatar_url": user.get("avatar_url", "")
            })
            
    return jsonify({"success": False, "message": "Kullanıcı adı veya şifre hatalı!"}), 401

@app.route("/api/register", methods=["POST"])
def register():
    from werkzeug.security import generate_password_hash
    data = request.json
    username   = (data.get("username") or "").strip()
    email      = (data.get("email") or "").strip().lower()
    password   = data.get("password") or ""
    role       = data.get("role") or "farmer"
    first_name = (data.get("first_name") or "").strip()
    last_name  = (data.get("last_name") or "").strip()

    if not username or not email or not password or not first_name or not last_name:
        return jsonify({"success": False, "message": "Lütfen tüm alanları doldurunuz."}), 400

    if len(password) < 6:
        return jsonify({"success": False, "message": "Password must be at least 6 characters."}), 400

    if "@" not in email or "." not in email:
        return jsonify({"success": False, "message": "Lütfen geçerli bir e-posta adresi giriniz."}), 400

    hashed = generate_password_hash(password)

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (username, email, password, role, first_name, last_name) VALUES (%s, %s, %s, %s, %s, %s)",
            (username, email, hashed, role, first_name, last_name)
        )
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "Hesap başarıyla oluşturuldu!"})
    except Exception as e:
        err = str(e)
        if "Duplicate entry" in err and "username" in err:
            return jsonify({"success": False, "message": "Bu kullanıcı adı zaten kullanılıyor."}), 409
        if "Duplicate entry" in err and "email" in err:
            return jsonify({"success": False, "message": "Bu e-posta adresi zaten kayıtlı."}), 409
        return jsonify({"success": False, "message": "Kayıt işlemi başarısız oldu. Lütfen tekrar deneyiniz."}), 500

@app.route("/api/upload_avatar", methods=["POST"])
def upload_avatar():
    if 'avatar' not in request.files:
        return jsonify({"success": False, "message": "Dosya seçilmedi"}), 400
        
    file = request.files['avatar']
    username = request.form.get('username')
    
    if file.filename == '':
        return jsonify({"success": False, "message": "Dosya seçilmedi"}), 400
        
    if file and username:
        filename = secure_filename(f"{username}_{file.filename}")
        upload_folder = os.path.join(os.path.dirname(__file__), 'uploads')
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
            
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)
        
        avatar_url = f"/uploads/{filename}"
        
        # Update DB
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET avatar_url = %s WHERE username = %s", (avatar_url, username))
        conn.commit()
        conn.close()
        
        return jsonify({"success": True, "avatar_url": avatar_url})
        
    return jsonify({"success": False, "message": "Hata oluştu"}), 500

@app.route("/api/remove_avatar", methods=["POST"])
def remove_avatar():
    data = request.json
    username = data.get("username")
    if not username:
        return jsonify({"success": False, "message": "Kullanıcı adı gerekli"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT avatar_url FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user and user.get("avatar_url"):
        # Delete file from disk
        file_path = os.path.join(os.path.dirname(__file__), 'uploads', os.path.basename(user["avatar_url"]))
        if os.path.exists(file_path):
            os.remove(file_path)

    cursor.execute("UPDATE users SET avatar_url = NULL WHERE username = %s", (username,))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Profil fotoğrafı kaldırıldı."})

# Serve uploaded files
@app.route("/uploads/<path:filename>")
def serve_upload(filename):
    upload_folder = os.path.join(os.path.dirname(__file__), 'uploads')
    from flask import send_from_directory
    return send_from_directory(upload_folder, filename)


# --- DASHBOARD ---

@app.route("/api/dashboard", methods=["GET"])
def get_dashboard_summary():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) as total_fields FROM fields")
    total_fields = cursor.fetchone()["total_fields"]

    cursor.execute("SELECT COUNT(*) as total_sensors FROM sensors")
    total_sensors = cursor.fetchone()["total_sensors"]

    cursor.execute("SELECT COUNT(*) as active_alarms FROM alarms WHERE is_resolved = 0")
    active_alarms = cursor.fetchone()["active_alarms"]

    conn.close()

    return jsonify({
        "total_fields": total_fields,
        "total_sensors": total_sensors,
        "active_alarms": active_alarms,
        "system_status": "Sağlıklı" if active_alarms == 0 else "Uyarılar Var"
    })

# --- SENSÖRLER ---

@app.route("/api/fields/<int:field_id>/sensors/latest", methods=["GET"])
def get_latest_sensor_data(field_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT sr.* FROM sensor_readings sr
        JOIN sensors s ON sr.sensor_id = s.id
        WHERE s.field_id = %s
        ORDER BY sr.timestamp DESC LIMIT 1
    """, (field_id,))

    reading = cursor.fetchone()
    conn.close()

    if not reading:
        return jsonify({"detail": "Bu tarla için sensör verisi bulunamadı."}), 404

    return jsonify(reading)

# --- ALARMLAR ---

@app.route("/api/alarms", methods=["GET"])
def get_alarms():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM alarms ORDER BY timestamp DESC")
    alarms = cursor.fetchall()
    conn.close()
    return jsonify(alarms)

@app.route("/api/alarms/<int:alarm_id>/resolve", methods=["POST"])
def resolve_alarm(alarm_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("UPDATE alarms SET is_resolved = 1 WHERE id = %s", (alarm_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": f"{alarm_id} numaralı alarm çözüldü olarak işaretlendi."})

# --- SULAMA ---

@app.route("/api/irrigation/toggle", methods=["POST"])
def toggle_irrigation():
    data = request.json
    field_id = data.get("field_id")
    motor_status = data.get("motor_status")
    
    status_text = "Başlatıldı" if motor_status else "Durduruldu"
    return jsonify({
        "success": True,
        "message": f"{field_id} numaralı tarlada sulama motoru {status_text}."
    })

# --- GÜBRELEME (FR-10) ---

@app.route("/api/fields/<int:field_id>/fertilizer/recommendation", methods=["GET"])
def get_fertilizer_recommendation(field_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT sr.nitrogen, sr.phosphorus, sr.potassium
        FROM sensor_readings sr
        JOIN sensors s ON sr.sensor_id = s.id
        WHERE s.field_id = %s
        ORDER BY sr.timestamp DESC LIMIT 1
    """, (field_id,))

    reading = cursor.fetchone()
    conn.close()

    if not reading:
        return jsonify({"detail": "Gübre önerisi için yeterli sensör verisi yok."}), 404

    n, p, k = reading["nitrogen"], reading["phosphorus"], reading["potassium"]
    recommendations = []

    if n < 35:
        recommendations.append({
            "type": "Üre (N46)",
            "amount_kg_per_decare": round((35 - n) * 0.5, 1),
            "reason": f"Azot (N) seviyesi ({n}) optimum değerin ({35}) altında."
        })
    if p < 25:
        recommendations.append({
            "type": "DAP (18-46-0)",
            "amount_kg_per_decare": round((25 - p) * 0.4, 1),
            "reason": f"Fosfor (P) seviyesi ({p}) optimum değerin ({25}) altında."
        })
    if k < 15:
        recommendations.append({
            "type": "Potasyum Sülfat",
            "amount_kg_per_decare": round((15 - k) * 0.6, 1),
            "reason": f"Potasyum (K) seviyesi ({k}) optimum değerin ({15}) altında."
        })

    if not recommendations:
        return jsonify({
            "status": "optimal",
            "message": "Toprak NPK değerleri optimum seviyede. Gübreleme gerekmiyor.",
            "recommendations": []
        })

    return jsonify({
        "status": "action_required",
        "message": f"{len(recommendations)} besin maddesi için gübreleme önerilmektedir.",
        "recommendations": recommendations
    })

# --- TAKVİM (CALENDAR) ---

@app.route("/api/calendar", methods=["GET"])
def get_calendar():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT c.*, f.name as field_name 
        FROM farm_calendar c 
        JOIN fields f ON c.field_id = f.id 
        ORDER BY c.task_date ASC
    """)
    tasks = cursor.fetchall()
    conn.close()
    return jsonify(tasks)

@app.route("/api/calendar/add", methods=["POST"])
def add_calendar_task():
    data = request.json
    field_id = data.get("field_id")
    task_name = data.get("task_name")
    task_date = data.get("task_date")
    notes = data.get("notes", "")
    
    if not field_id or not task_name or not task_date:
        return jsonify({"success": False, "message": "Eksik bilgi"}), 400
        
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO farm_calendar (field_id, task_name, task_date, notes) VALUES (%s, %s, %s, %s)",
        (field_id, task_name, task_date, notes)
    )
    conn.commit()
    conn.close()
    
    return jsonify({"success": True, "message": "Görev başarıyla eklendi!"})

@app.route("/api/calendar/<int:task_id>", methods=["DELETE"])
def delete_calendar_task(task_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM farm_calendar WHERE id = %s", (task_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Görev silindi."})

# --- YAPAY ZEKA (AI) ---

@app.route("/api/predict", methods=["GET"])
def ai_predict():
    import pickle
    import os
    import pandas as pd
    
    model_path = os.path.join(os.path.dirname(__file__), 'irrigation_model.pkl')
    if not os.path.exists(model_path):
        return jsonify({"error": "Model bulunamadı"}), 404
        
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
        
    # Sensör verilerini veritabanından çekelim (Örnek Tarla 1)
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT sr.temperature, sr.humidity, sr.soil_moisture, sr.nitrogen, sr.phosphorus, sr.potassium
        FROM sensor_readings sr
        JOIN sensors s ON sr.sensor_id = s.id
        WHERE s.field_id = 1
        ORDER BY sr.timestamp DESC LIMIT 1
    """)
    reading = cursor.fetchone()
    conn.close()
    
    if not reading:
        # Eğer veritabanı boşsa varsayılan (kritik) sensör değerleriyle simüle et
        reading = {
            'temperature': 35.0, 'humidity': 30.0, 'soil_moisture': 18.0,
            'nitrogen': 45.0, 'phosphorus': 30.0, 'potassium': 60.0
        }
        
    df = pd.DataFrame([reading])
    prediction = model.predict(df)[0]
    
    # Karar ağacı olasılık (confidence) skoru
    proba = model.predict_proba(df)[0]
    confidence = max(proba) * 100
    
    if prediction == 1:
        return jsonify({
            "status": "Kritik",
            "message": "Acil Sulama Gerekli",
            "confidence": round(confidence, 1),
            "reading": reading
        })
    else:
        return jsonify({
            "status": "İdeal",
            "message": "Durum Normal",
            "confidence": round(confidence, 1),
            "reading": reading
        })

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=8000, debug=True)
