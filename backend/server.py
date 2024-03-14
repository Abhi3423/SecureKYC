from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
import vision_speech

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():    
    return ("This is SecureKYC.")

@app.route('/audio_generate', methods=['POST'])
def create_audio():
    dist_audio_url = {}  # Dictionary to store audio URLs
    if request.method == 'POST':
        data = request.get_json()  # Get JSON data from the request
        for language_block in data:
            language = language_block
            for i in data[language]:
                key = i
                text = data[language][i]
                
                audio_url = vision_speech.audio(key, text, language)  # Call vision_speech.audio() to generate audio URL
                
                try:
                    dist_audio_url[language][key] = audio_url.split("?")[0]  # Store audio URL in the dictionary
                except KeyError:
                    dist_audio_url[language] = {}
                    dist_audio_url[language][key] = audio_url.split("?")[0]
                    
        with open('processed_audio_url.json', 'w') as outfile:
            json.dump(dist_audio_url, outfile)  # Save the dictionary as JSON in a file
                
        return jsonify(dist_audio_url)  # Return the dictionary as JSON response
    
@app.route('/get_audio/<language>', methods=['GET'])
def get_audio(language):
    if request.method == 'GET':
        
        with open('processed_audio_url.json') as f:
            data = json.load(f)  # Load the JSON data from the file
            
        return jsonify(data[language])  # Return the audio URLs for the specified language
    
@app.route('/start_generate', methods=['POST'])
def create_start():
    dist_start_url = {
        "default": "https://securekyc.s3.ap-south-1.amazonaws.com/audio/start/default.mp3"
    }  # Dictionary to store start URLs
    if request.method == 'POST':
        data = request.get_json()  # Get JSON data from the request
        for i in data:
            language = i
            text = data[i]
            audio_url = vision_speech.audio('start', text, language)  # Call vision_speech.audio() to generate start URL
            
            dist_start_url[language] = audio_url.split("?")[0]  # Store start URL in the dictionary
            
        with open('processed_start_url.json', 'w') as outfile:
            json.dump(dist_start_url, outfile)  # Save the dictionary as JSON in a file
        
        return jsonify(dist_start_url)  # Return the dictionary as JSON response
    
@app.route('/get_start', methods=['GET'])
def get_start():
    if request.method == 'GET':
        
        with open('processed_start_url.json') as f:
            data = json.load(f)  # Load the JSON data from the file
            
        return jsonify(data)  # Return the start URLs
    
@app.route('/ocr_front', methods=['POST'])
def ocr_front():
    if request.method == 'POST':
        data = request.get_json()
        
        response = vision_speech.ocr_front(data['image'].split(",")[1])  # Call vision_speech.ocr_front() to extract data from the front of the Aadhar card
        
        return jsonify(response)
    
@app.route('/ocr_back', methods=['POST'])
def ocr_back():
    if request.method == 'POST':
        data = request.get_json()
        
        response = vision_speech.ocr_back(data['image'].split(",")[1])  # Call vision_speech.ocr_back() to extract data from the back of the Aadhar card
        
        return jsonify(response)
    
@app.route('/get_user_data', methods=['GET'])
def get_data():
    if request.method == 'GET':
        
        with open('pesonal_user_data.json') as f:
            data = json.load(f)  # Load the JSON data from the file
        
        return jsonify(data)  # Return the extracted data
                
if __name__ == '__main__':
    app.run()
