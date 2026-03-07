🌱 Akıllı Tarım Yönetim Sistemi - Teknoloji Seçimi ve Analizi
Proje Adı: Akıllı Tarım Yönetim Sistemi
Görev: Teknoloji Araştırması ve Seçimi
Hazırlayan: Birgül Göktürk
Tarih: 08.03.2026
________________________________________
1. Giriş ve Stratejik Yaklaşım
Bu rapor, projenin "akıllı" bileşenlerini (AI) ve sahadaki veri akışını (IoT) en verimli şekilde hayata geçirmek için seçilen teknoloji yığınını (Tech Stack) içermektedir. Seçimler yapılırken; düşük enerji tüketimi, geniş kütüphane desteği ve hızlı geliştirme süreçleri temel kriter olarak alınmıştır.
________________________________________
2. Yazılım Dili ve Framework Değerlendirmesi
2.1. Backend ve Yapay Zeka: Python 3.x
Projenin karar destek mekanizması için Python dilinde karar kılınmıştır.
•	Avantajları: Scikit-learn ve Pandas gibi veri bilimi kütüphaneleriyle tam uyumludur. Tahminleme modellerini (gübreleme ve sulama) entegre etmek oldukça kolaydır.
•	Gerekçe: Projenin merkezinde yer alan AI modüllerinin (FR-06, FR-07) başka bir dilde bu kadar kısa sürede geliştirilmesi mümkün görünmemektedir.
2.2. Mobil Uygulama: Flutter (Dart)
Çiftçinin kullanacağı arayüz (FR-09) için hibrit bir mobil mimari tercih edilmiştir.
•	Avantajları: Tek kod tabanıyla hem iOS hem Android çıktısı alınabilir. Material Design 3 desteğiyle modern ve kullanıcı dostu bir arayüz sunar.
•	Gerekçe: Ekibimizin iki farklı platform için ayrı ayrı kod yazma yükünü ortadan kaldırarak zaman yönetimini (Scrum Planı) optimize eder.
________________________________________
3. Veri Yönetimi ve Haberleşme Altyapısı
3.1. Veritabanı: PostgreSQL
Sistemdeki sensör verilerinin (FR-04) saklanması için ilişkisel bir veritabanı seçilmiştir.
•	Analiz: NoSQL (MongoDB vb.) yerine PostgreSQL'in seçilme nedeni, tarih damgalı veriler arasındaki ilişkisel tutarlılığı korumaktır.
•	Kullanım: Çiftçi profilleri, tarla geçmişi ve mineral değişim grafiklerinin hızlı sorgulanması için kullanılacaktır.
3.2. IoT Haberleşme Protokolü: MQTT
Donanım ile bulut arasındaki veri transferinde HTTP yerine MQTT tercih edilmiştir.
•	Analiz: Tarımsal arazilerdeki internet bağlantısı genellikle zayıf ve değişkendir.
•	Gerekçe: MQTT, çok düşük bant genişliğinde dahi paket kaybını minimize eden "Hafif (Lightweight)" bir protokol olduğu için sahadaki sensörlerin enerji tüketimini de düşürecektir.
________________________________________
4. Teknik Stack Özeti (Tablo)
Katman	Seçilen Teknoloji	Öncelik
Yapay Zeka	Scikit-learn / NumPy	🔴 Yüksek
Backend	Python (FastAPI veya Flask)	🔴 Yüksek
Mobil UI	Flutter / Dart	🟡 Orta
Veritabanı	PostgreSQL	🔴 Yüksek
Haberleşme	MQTT (Mosquitto)	🟡 Orta
IDE / Araçlar	VS Code / Git / GitHub	🟢 Düşük
________________________________________
5. Risk Analizi ve Çözüm Önerileri
•	R-01 (Veri Kirliği): Sensörlerden gelecek hatalı veriler AI modelini yanıltabilir.
•	Çözüm: Python tarafında bir "Veri Ön İşleme" katmanı oluşturulacak ve uç değerler (Outliers) temizlenecektir.
•	R-02 (Bağlantı Sorunları): İnternet tamamen kesildiğinde veri kaybı yaşanabilir.
•	Çözüm: IoT cihazlarında yerel bellek (Buffer) kullanılacak, bağlantı geldiğinde MQTT üzerinden toplu gönderim sağlanacaktır.
