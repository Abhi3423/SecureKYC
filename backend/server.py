from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
import vision_speech
import boto_functions
import recognise
import tools

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
        
        customer_data_response = vision_speech.ocr_front(data['image'].split(",")[1])  # Call vision_speech.ocr_front() to extract data from the front of the Aadhar card
        
        upload_url = boto_functions.upload_card_photo(data['image'].split(",")[1])  # Call boto_functions.upload_card_photo() to upload the Aadhar card image
        
        response = recognise.check_faces()  # Call recognise.check_faces() to check if the uploaded image contains a face
        
        with open('pesonal_user_data.json', 'r') as outfile:
            customer_data = json.load(outfile)
            
        customer_data["aadhar_url"] = upload_url
        
        with open('pesonal_user_data.json', 'w') as outfile:
            json.dump(customer_data, outfile)
            
        return jsonify({"customer_data": customer_data_response, "upload_url": upload_url, "response": response})
    
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
    
@app.route('/post_user_image', methods=['POST'])
def post_image():
    if request.method == 'POST':
        data = request.get_json()
        
        response = boto_functions.upload_user_photo(data['image'].split(",")[1])
        
        with open('pesonal_user_data.json', 'r') as outfile:
            customer_data = json.load(outfile)
            
        customer_data["image_url"] = response
        
        with open('pesonal_user_data.json', 'w') as outfile:
            json.dump(customer_data, outfile)
            
        return jsonify({"image_url": response})
    
    
@app.route('/get_signature', methods=['POST'])
def post_sign():
    if request.method == 'POST':
        data = request.get_json()
        
        response = boto_functions.upload_user_sign(data['image'].split(",")[1])
        
        with open('pesonal_user_data.json', 'r') as outfile:
            customer_data = json.load(outfile)
            
        customer_data["signature_url"] = response
        
        with open('pesonal_user_data.json', 'w') as outfile:
            json.dump(customer_data, outfile)
            
        return jsonify({"signature_url": response})
    
@app.route('/get_pan_data', methods=['Post'])
def pan():
    if request.method == 'POST':
        data = request.get_json()
        
        ocr_data = vision_speech.pan_ocr(data['image'].split(",")[1])   
        response = boto_functions.upload_pan_image(data['image'].split(",")[1])
        
        with open('pesonal_user_data.json', 'r') as outfile:
            customer_data = json.load(outfile)
            
        customer_data["pan_url"] = response
        customer_data["pan_no"] = tools.extract_pan_string(ocr_data)[0]
        customer_data["father_name"] = tools.extract_fathers_name(ocr_data)
        customer_data["pan_dob"] = tools.extract_birth_date(ocr_data)
        customer_data["pan_name"] = tools.extract_names(ocr_data)
        
        with open('pesonal_user_data.json', 'w') as outfile:
            json.dump(customer_data, outfile)
        
        return jsonify({"response_url": response, "ocr_data": ocr_data})
        
                
if __name__ == '__main__':
    app.run()
