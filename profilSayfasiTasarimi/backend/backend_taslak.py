"""
Akıllı Tarım Yönetim Sistemi - Backend Entegrasyon Taslağı (Flask Örneği)
Bu dosya sadece "Yazılım Mühendisliği Temelleri" projeniz için örnek bir referans teşkil etmektedir.
"""

from flask import Flask, jsonify, request, g
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
# from sklearn.ensemble import RandomForestClassifier # Projenizdeki makine öğrenmesi kısımları için

app = Flask(__name__)

# --- 1. Veritabanı Bağlantısı (MySQL) ---
def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="yourpassword",
            database="smart_agri_db"
        )
    return g.db

@app.teardown_appcontext
def close_db(error):
    db = g.pop('db', None)
    if db is not None:
        db.close()

# --- 2. RESTful API Endpoints ---

@app.route('/api/profile', methods=['GET'])
def get_profile():
    """
    Kullanıcı bilgilerini veritabanından çeker (READ).
    app.js içerisinde sayfa ilk yüklendiğinde bu endpoint çağrılacaktır.
    """
    # Normalde JWT veya Session üzerinden giriş yapmış kullanıcının id'si alınır
    user_id = 1 
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    # Veritabanından veriyi Select işlemi 
    query = "SELECT id, full_name, email, role, profile_image_url FROM users WHERE id = %s"
    cursor.execute(query, (user_id,))
    user = cursor.fetchone()
    
    if user:
        return jsonify({
            'status': 'success',
            'data': {
                'id': user['id'],
                'fullName': user['full_name'],
                'email': user['email'],
                'role': user['role'],
                'profileImageUrl': user['profile_image_url']
            }
        }), 200
    else:
        return jsonify({'status': 'error', 'message': 'Kullanıcı bulunamadı'}), 404


@app.route('/api/profile', methods=['PUT'])
def update_profile():
    """
    Kullanıcının formdan gönderdiği bilgileri günceller (UPDATE).
    """
    user_id = 1
    data = request.json
    
    if not data or 'fullName' not in data:
         return jsonify({'status': 'error', 'message': 'Eksik veri'}), 400
         
    new_name = data['fullName']
    
    db = get_db()
    cursor = db.cursor()
    
    # Tam adı MySQL veritabanında güncelleme
    query = "UPDATE users SET full_name = %s WHERE id = %s"
    cursor.execute(query, (new_name, user_id))
    db.commit()
    
    return jsonify({
        'status': 'success', 
        'message': 'Profil başarıyla güncellendi'
    }), 200


@app.route('/api/profile/password', methods=['PUT'])
def update_password():
    """
    Şifre değiştirme endpoint'i.
    Güvenlik: Şifreler düz metin olarak veritabanında tutulmamalı, HASH'lenmelidir.
    """
    user_id = 1
    data = request.json
    current_password = data.get('currentPassword')
    new_password = data.get('newPassword')
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    # 1. Kullanıcının mevcut şifre HASH'ini al
    cursor.execute("SELECT password_hash FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    
    if not user:
        return jsonify({'status': 'error', 'message': 'Kullanıcı bulunamadı'}), 404
        
    # 2. Hash kontrolü (Mevcut şifre doğru mu?)
    if check_password_hash(user['password_hash'], current_password):
        # 3. Yeni şifreyi HASH'leyerek veritabanına kaydet
        new_hashed_password = generate_password_hash(new_password)
        
        cursor.execute("UPDATE users SET password_hash = %s WHERE id = %s", (new_hashed_password, user_id))
        db.commit()
        
        return jsonify({'status': 'success', 'message': 'Şifre güncellendi'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Mevcut şifre hatalı'}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)
