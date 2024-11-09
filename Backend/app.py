from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import mysql.connector
from mysql.connector import Error
from werkzeug.security import generate_password_hash
import os
import google.generativeai as genai
import mysql.connector

app = Flask(__name__)
    
 
def create_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',  
            user='root',       
            password='',        
            database='innovaltion_db'  
        )
        return conn
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None


@app.route('/kayitol', methods=['GET', 'POST'])
def kayitol():
    if request.method == 'POST':
        name = request.form['name']
        mail = request.form['mail']
        birthday = request.form['birthday']
        password = request.form['password_sign']

        hashed_password = generate_password_hash(password)

        conn = create_connection()
        if conn is None:
            return "Database connection error", 500

        try:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO users (name, mail, birth_date, password) VALUES (%s, %s, %s, %s)',
                (name, mail, birthday, hashed_password)
            )
            conn.commit()
            cursor.close()
            conn.close()
            return redirect(url_for('index'))
        except Error as e:
            print(f"Error: {e}")
            return "An error occurred during registration", 500

    return render_template('deneme/kullanicigiris/kayitol.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


# Configure the Gemini API
genai.configure(api_key=os.environ.get("API_KEY"))

# Initialize model and configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config
)

@app.route('/')
def index():
    return render_template('deneme/ikinciarayuz/index.html')

# Route to the survey page
@app.route('/anket')
def anket():
    return render_template('deneme/ikinciarayuz/anket.html')

@app.route('/yolharitasi')
def yolharitasi():
    return render_template('deneme/yolharitasi/index.html')

@app.route('/generate_roadmap', methods=['POST'])
def generate_roadmap():
    try:
        field = request.form.get('field')
        print(f"Received field: {field}")  

        chat_session = model.start_chat()
        prompt = f"""Lütfen {field} için Yazılım alanlarında çoğu kişi yazılım nasıl öğreneceğini ve nasıl bir yol takip etmesi gerektiğini bilmemektedir. Bu bot kullanıcıya yol haritası çizip, en fazla üç detay yazıp kaynakları da vermeli. kaynaklar : youtube videoları, makaleler, kurslar olabilir. her harita için 5 ana başlık verilmelidir.\nLütfen verilen alan için bir öğrenme yol haritası oluştur.\n       başlık cumlesi olmadan adımlara başla, örneğin \"veri yapıları nasıl ögrenebilirim?\" diye sorduğum zaman \"İşte veri yapıları için bir öğrenme yol haritası:\" gibi bir cümle olmayacak, hemen şu şekilde \"1. **Temel Kavramlar:** vs vs\" olacak.\n        Tam olarak 5 adım olacak şekilde, numaralı liste formatında yanıt ver.\n        Her adım için:\n        - Kısa ama açıklayıcı bir başlık\n        - Bir veya iki cümlelik açıklama\n        - Öğrenme için bir kaynak önerisi (tercihen Türkçe)\n        \n        Örnek format:\n        1. [Başlık]: [Kısa açıklama]. Kaynak: [link/kaynak önerisi]\n        \n        Yanıtını Türkçe olarak ver.\n         kaynaklar ingilizce veya türkçe de olabilir."""

        response = chat_session.send_message(prompt)
        print(f"Generated response: {response.text}")  

        # Return the generated roadmap as JSON
        return jsonify({'roadmap': response.text})
    except Exception as e:
        print(f"Error in generate_roadmap: {str(e)}")  
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)



