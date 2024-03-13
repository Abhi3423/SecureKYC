from flask import Flask,request,jsonify
import json
import os

from flask_cors import CORS, cross_origin
from google.cloud import texttospeech

app = Flask(__name__)
CORS(app)

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "./standard-chartered-417102-aceef618da22.json"
@app.route('/')
def index():    
    return ("This is SecureKYC.")

@app.route('/audio')
def create_audio():
    
        # Instantiates a client
        client = texttospeech.TextToSpeechClient()

        # Set the text input to be synthesized
        synthesis_input = texttospeech.SynthesisInput(text="Hello, World!")

        # Build the voice request, select the language code ("en-US") and the ssml
        # voice gender ("neutral")
        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
        )

        # Select the type of audio file you want returned
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )
            
        # Perform the text-to-speech request on the text input with the selected
        # voice parameters and audio file type
        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )
            
        # The response's audio_content is binary.
        with open("output.mp3", "wb") as out:
            # Write the response to the output file.
            out.write(response.audio_content)
            print('Audio content written to file "output.mp3"')

        return jsonify({'user_created': True})
        

if __name__ == '__main__':
    # port = os.environ.get('PORT', '5000')
    # app.run(debug=False, host='0.0.0.0', port=port)
    app.run()