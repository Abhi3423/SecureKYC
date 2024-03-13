from flask import Flask,request,jsonify
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
    dist_audio_url = {}
    if request.method == 'POST':
        data = request.get_json()
        for language_block in data:
            language = language_block
            for i in data[language]:
                key = i
                text = data[language][i]
                
                audio_url = vision_speech.audio(key, text, language)
                
                try:
                    dist_audio_url[language][key] = audio_url.split("?")[0]
                except KeyError:
                    dist_audio_url[language] = {}
                    dist_audio_url[language][key] = audio_url.split("?")[0]
                    
        with open('processed_audio_url.json', 'w') as outfile:
            json.dump(dist_audio_url, outfile)
                
        return jsonify(dist_audio_url)
    
@app.route('/get_audio/<language>', methods=['GET'])
def get_audio(language):
    if request.method == 'GET':
        
        with open('processed_audio_url.json') as f:
            data = json.load(f)
            
        return jsonify(data[language])
    
@app.route('/start_generate', methods=['POST'])
def create_start():
    dist_start_url = {
        "default": "https://securekyc.s3.ap-south-1.amazonaws.com/audio/start/default.mp3"
    }
    if request.method == 'POST':
        data = request.get_json()
        for i in data:
            language = i
            text = data[i]
            audio_url = vision_speech.audio('start', text, language)
            
            dist_start_url[language] = audio_url.split("?")[0]
            
        with open('processed_start_url.json', 'w') as outfile:
            json.dump(dist_start_url, outfile)
        
        return jsonify(dist_start_url)
    
@app.route('/get_start', methods=['GET'])
def get_start():
    if request.method == 'GET':
        
        with open('processed_start_url.json') as f:
            data = json.load(f)
            
        return jsonify(data)
        

if __name__ == '__main__':
    app.run()