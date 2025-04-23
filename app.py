from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import jwt
import datetime
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from functools import wraps
import pyttsx3
import speech_recognition as sr
import pandas as pd
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'complex_secret_key_for_production'  # More secure secret key

# --- Realistic Data Storage (Simulated) ---
user_profiles = {}  # Simulate a database for user profiles and preferences
content_database = {  # Simulate a database for content with more features
    "article_1": {"title": "Understanding Dyslexia", "topic": "learning_disabilities", "difficulty": "medium", "text": "Dyslexia is a learning disability...", "tts_enabled": True},
    "article_2": {"title": "Tips for Reading with Dyslexia", "topic": "reading_strategies", "difficulty": "easy", "text": "Use visual aids...", "tts_enabled": True},
    "exercise_1": {"title": "Phonological Awareness Game", "type": "game", "topic": "phonological_awareness", "instructions": "Listen to the sounds...", "stt_enabled": True},
    "video_1": {"title": "What is Auditory Processing Disorder?", "type": "video", "topic": "auditory_processing", "url": "https://example.com/video1", "tts_available": True},
    "quiz_1": {"title": "Reading Comprehension Quiz", "type": "quiz", "topic": "reading_comprehension", "questions": ["...", "..."]},
    "article_3": {"title": "The Role of Technology in Dyslexia Support", "topic": "assistive_technology", "difficulty": "medium", "text": "Many technological tools...", "tts_enabled": True},
    "exercise_2": {"title": "Rhyming Words Challenge", "type": "game", "topic": "phonological_awareness", "instructions": "Find words that rhyme...", "stt_enabled": True},
}

user_performance = {}  # Simulate a database for user performance data

# --- Multimodal Learning Module (TTS & STT) ---
engine = pyttsx3.init()

def text_to_speech_engine(text):
    try:
        engine.say(text)
        engine.runAndWait()
        return jsonify({'message': 'Text spoken successfully'}), 200
    except Exception as e:
        return jsonify({'error': f'TTS Error: {str(e)}'}), 500

def speech_to_text_engine():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Speak now...")
        try:
            audio = recognizer.listen(source, phrase_time_limit=5)  # Limit listening time
            return recognizer.recognize_google(audio, language="en-IN") # Specify Indian English
        except sr.UnknownValueError:
            return None  # Indicate no speech detected
        except sr.RequestError as e:
            print(f"STT Error: {e}")
            return None
        except Exception as e:
            print(f"STT General Error: {e}")
            return None

# --- Analytics & Insights Module ---
def record_performance(user_id, activity_type, metrics):
    if user_id not in user_performance:
        user_performance[user_id] = []
    user_performance[user_id].append({'timestamp': datetime.datetime.utcnow(), 'activity': activity_type, **metrics})

def generate_personalized_report(user_id):
    if user_id not in user_performance or not user_performance[user_id]:
        return jsonify({'message': 'No performance data available for this user'}), 404

    df = pd.DataFrame(user_performance[user_id])
    if df.empty:
        return jsonify({'message': 'No performance data available for this user'}), 404

    summary = df.describe()
    report_data = {col: summary[col].to_dict() for col in summary.columns if pd.api.types.is_numeric_dtype(df[col])}
    return jsonify({'report': report_data}), 200

def get_overall_analytics():
    if not user_performance:
        return jsonify({'message': 'No user performance data available'}), 404
    all_data = pd.DataFrame([item for sublist in user_performance.values() for item in sublist])
    if all_data.empty:
        return jsonify({'message': 'No user performance data available'}), 404
    summary = all_data.describe()
    report_data = {col: summary[col].to_dict() for col in summary.columns if pd.api.types.is_numeric_dtype(all_data[col])}
    return jsonify({'overall_report': report_data}), 200

def get_user_performance_data(user_id):
    return user_performance.get(user_id, [])

def calculate_skill_strengths_improvements(user_id, performance_data):
    # --- Dummy Skill Calculation (Replace with your actual logic) ---
    strengths = [
        {'skill': 'Reading Comprehension', 'percentage': random.randint(80, 95)},
        {'skill': 'Vocabulary', 'percentage': random.randint(75, 90)},
    ]
    improvements = [
        {'skill': 'Phonological Awareness', 'percentage': random.randint(60, 70)},
        {'skill': 'Reading Speed', 'percentage': random.randint(65, 75)},
    ]
    return {'strengths': strengths, 'improvements': improvements}

# --- Content Recommendation Engine (More Realistic) ---
def get_user_preferences(user_id):
    return user_profiles.get(user_id, {'preferred_topics': [], 'difficulty_level': 'medium'})

def recommend_content_personalized(user_id):
    preferences = get_user_preferences(user_id)
    preferred_topics = preferences.get('preferred_topics', [])
    preferred_difficulty = preferences.get('difficulty_level', 'medium')

    relevant_content = [
        item for item_id, item in content_database.items()
        if (not preferred_topics or item['topic'] in preferred_topics) and item.get('difficulty', 'medium') == preferred_difficulty
    ]

    if not relevant_content:
        # Fallback to recommending based on general popularity or other criteria
        return jsonify({'recommendations': random.sample(list(content_database.keys()), min(3, len(content_database)))}), 200

    return jsonify({'recommendations': [item['title'] for item in random.sample(relevant_content, min(3, len(relevant_content)))]}), 200

# --- Authentication ---
def generate_unique_user_id():
    return str(uuid.uuid4())

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            try:
                token = request.headers['Authorization'].split()[1]
            except IndexError:
                return jsonify({'message': 'Bearer token not properly formatted'}), 401

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user_id = data['user_id']
            return f(current_user_id, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401
        except Exception as e:
            return jsonify({'message': f'Invalid token: {str(e)}'}), 401
    return decorated

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400
    if username in user_profiles:
        return jsonify({'message': 'User already exists'}), 409
    user_id = generate_unique_user_id()
    hashed_password = generate_password_hash(password)
    user_profiles[username] = {'user_id': user_id, 'password': hashed_password, 'preferred_topics': [], 'difficulty_level': 'medium'}
    return jsonify({'message': 'User registered successfully', 'user_id': user_id}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user_data = user_profiles.get(username)
    if user_data and check_password_hash(user_data['password'], password):
        token = jwt.encode({'user_id': user_data['user_id'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({'token': token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/profile', methods=['GET', 'POST'])
@token_required
def user_profile(current_user_id):
    username = next((uname for uname, data in user_profiles.items() if data['user_id'] == current_user_id), None)
    if not username:
        return jsonify({'message': 'User not found'}), 404

    if request.method == 'GET':
        profile = user_profiles[username].copy()
        profile.pop('password', None)
        return jsonify(profile), 200

    elif request.method == 'POST':
        data = request.get_json()
        if 'preferred_topics' in data:
            user_profiles[username]['preferred_topics'] = data['preferred_topics']
        if 'difficulty_level' in data and data['difficulty_level'] in ['easy', 'medium', 'hard']:
            user_profiles[username]['difficulty_level'] = data['difficulty_level']
        return jsonify({'message': 'Profile updated successfully'}), 200

# --- API Endpoints ---
@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Dyslexia Learning System API'}), 200

@app.route('/recommendations', methods=['GET'])
@token_required
def get_recommendations(current_user_id):
    return recommend_content_personalized(current_user_id)

@app.route('/content/<content_id>', methods=['GET'])
@token_required
def get_content(current_user_id, content_id):
    content = content_database.get(content_id)
    if content:
        return jsonify(content), 200
    return jsonify({'message': 'Content not found'}), 404

@app.route('/tts', methods=['POST'])
@token_required
def tts_endpoint(current_user_id):
    data = request.get_json()
    text = data.get('text')
    if not text:
        return jsonify({'message': 'Text parameter is required'}), 400
    return text_to_speech_engine(text)

@app.route('/stt', methods=['POST'])
@token_required
def stt_endpoint(current_user_id):
    transcript = speech_to_text_engine()
    if transcript is not None:
        return jsonify({'transcript': transcript}), 200
    return jsonify({'message': 'Could not understand or no speech detected'}), 204 # 204 No Content

@app.route('/analytics/report/personalized', methods=['GET'])
@token_required
def personalized_analytics(current_user_id):
    """Endpoint to generate a personalized analytics report for the user."""
    return generate_personalized_report(current_user_id)

@app.route('/analytics/report/overall', methods=['GET'])
@token_required
def overall_analytics(current_user_id):
    return get_overall_analytics()

@app.route('/performance', methods=['POST'])
@token_required
def record_performance_endpoint(current_user_id):
    data = request.get_json()
    activity_type = data.get('activity_type')
    metrics = data.get('metrics')
    if not activity_type or not metrics:
        return jsonify({'message': 'activity_type and metrics are required'}), 400
    record_performance(current_user_id, activity_type, metrics)
    return jsonify({'message': 'Performance recorded successfully'}), 201

@app.route('/content', methods=['GET'])
def get_all_content():
    content_list = []
    for content_id, content in content_database.items():
        content_list.append({
            'id': content_id,
            **content
        })
    return jsonify(content_list), 200

@app.route('/api/analytics', methods=['GET'])
@token_required
def get_analytics_data(current_user_id):
    performance_data = get_user_performance_data(current_user_id)

    if not performance_data:
        return jsonify({"message": "No performance data available"}), 200

    total_score = sum(p.get('score', 0) for p in performance_data if p.get('score') is not None)
    scored_activities_count = sum(1 for p in performance_data if p.get('score') is not None)
    total_time_spent = sum(p.get('timeSpent', 0) for p in performance_data if p.get('timeSpent') is not None)
    total_completion_rate = sum(p.get('completionRate', 0) for p in performance_data if p.get('completionRate') is not None)

    average_score = round(total_score / scored_activities_count, 2) if scored_activities_count > 0 else 0
    average_completion_rate = round(total_completion_rate / len(performance_data), 2) if performance_data else 0

    progress_over_time = []
    if performance_data:
        progress_by_date = {}
        for p in performance_data:
            date = p.get('timestamp')
            if date:
                date_str = datetime.datetime.fromtimestamp(date / 1000).isoformat().split('T')[0] # Convert milliseconds to datetime
                if date_str not in progress_by_date:
                    progress_by_date[date_str] = {'total': 0, 'count': 0}
                progress_by_date[date_str]['total'] += p.get('completionRate', 0)
                progress_by_date[date_str]['count'] += 1
        progress_over_time = [{'date': d, 'progress': round(data['total'] / data['count'], 2)} for d, data in progress_by_date.items()]
        progress_over_time.sort(key=lambda item: item['date'])

    skill_data = calculate_skill_strengths_improvements(current_user_id, performance_data)
    skill_strengths = skill_data.get('strengths', [])
    skill_improvements = skill_data.get('improvements', [])

    return jsonify({
        "averageScore": average_score,
        "totalTimeSpent": total_time_spent,
        "averageCompletionRate": average_completion_rate,
        "progressOverTime": progress_over_time,
        "skillStrengths": skill_strengths,
        "skillImprovements": skill_improvements,
    }), 200

if __name__ == '__main__':
    app.run(debug=True)