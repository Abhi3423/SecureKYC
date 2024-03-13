import os
import pandas as pd
from google.cloud import vision
from google_vision_ai import VisionAI
from google_vision_ai import prepare_image_local
from tools import extract_12_digit_numbers

from google.cloud import texttospeech

import boto_functions

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "./standard-chartered-417102-aceef618da22.json"
client = vision.ImageAnnotatorClient()

client_speech = texttospeech.TextToSpeechClient()

# image_file_path = "./me_aadhar.jpg"
# image = prepare_image_local(image_file_path)
# va = VisionAI(client, image)

# texts = va.text_detection()
# print(extract_12_digit_numbers(texts[0].description))


def audio(key, text, language):
    
    synthesis_input = texttospeech.SynthesisInput(text=text)
    
    match language:
        case "English":
            voice = texttospeech.VoiceSelectionParams(
                language_code="en-US",
                name="en-US-Studio-O"
            )
        case "Hindi":
            voice = texttospeech.VoiceSelectionParams(
                language_code="hi-IN",
                name="hi-IN-Neural2-A"
            )
        case "Tamil":
            voice = texttospeech.VoiceSelectionParams(
                language_code="ta-IN",
                name="ta-IN-Wavenet-C"
            )
        case "Bangla":
            voice = texttospeech.VoiceSelectionParams(
                language_code="bn-IN",
                name="bn-IN-Wavenet-A"
            )
        case "Telugu":
            voice = texttospeech.VoiceSelectionParams(
                language_code="te-IN",
                name="te-IN-Standard-A"
            )
    
    
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        effects_profile_id=["handset-class-device"],
        speaking_rate=1,
        pitch=1
    )
    
    response = client_speech.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )
    
    with open("processed_audio.mp3", "wb") as out:
        out.write(response.audio_content)
        print(f'Audio content written to file "{key}.mp3"')
        
    audio_url = boto_functions.audio_upload(key, language)
    
    return audio_url
    