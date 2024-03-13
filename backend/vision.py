import os
import pandas as pd
from google.cloud import vision
from google_vision_ai import VisionAI
from google_vision_ai import prepare_image_local
from tools import extract_12_digit_numbers

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "./standard-chartered-417102-aceef618da22.json"
client = vision.ImageAnnotatorClient()

image_file_path = "./me_aadhar.jpg"
image = prepare_image_local(image_file_path)
va = VisionAI(client, image)

texts = va.text_detection()
print(extract_12_digit_numbers(texts[0].description))
