from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_db_connection, init_db

app = Flask(__name__)
CORS(app) # Arayüzlerin (Web/Mobil) API'ye erişebilmesi için CORS ayarları

# --- GENEL ---

@app.route("/", methods=["GET"])
def read_root():
    return jsonify({"message": "ATYS Backend API (Flask) Çalışıyor! 🚀"})

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

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=8000, debug=True)
