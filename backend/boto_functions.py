import base64
import logging
import boto3
from botocore.exceptions import ClientError
import json
from io import BytesIO

aws_resources = boto3.resource('s3')
s3 = boto3.client('s3')

for bucket in aws_resources.buckets.all():
    bucket = bucket.name
    
def create_presigned_url(bucket_name, object_name, expiration=2592000):
    # Generate a presigned URL for the S3 object
    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response
    
def audio_upload(key, language):
    
    s3.upload_file(
        Filename="processed_audio.mp3", 
        Bucket=bucket, 
        Key = "audio/" + language + "/" + key + ".mp3"
        )
    
    audio_url = create_presigned_url(bucket, "audio/" + language + "/" + key + ".mp3")
    
    if audio_url is not None:
        return audio_url
    else:
        return "Error in creating audio url"
    
def upload_user_photo(base64_image):
    
    data = base64.b64decode(base64_image)
    image = BytesIO(data)
    
    s3.upload_fileobj(
        Fileobj=image, 
        Bucket="face-detection-sc-s3", 
        Key = "source.jpg"
        )
    
    image_url = create_presigned_url("face-detection-sc-s3", "source.jpg")
    
    if image_url is not None:
        return image_url.split("?")[0]
    else:
        return "Error in creating source image url"
    
def upload_card_photo(base64_image):
    
    data = base64.b64decode(base64_image)
    image = BytesIO(data)
    
    s3.upload_fileobj(
        Fileobj=image, 
        Bucket="face-detection-sc-s3", 
        Key = "target.jpg"
        )
    
    image_url = create_presigned_url("face-detection-sc-s3", "target.jpg")
    
    if image_url is not None:
        return image_url.split("?")[0]
    else:
        return "Error in creating target image url"
    
    
def upload_user_sign(base64_image):
        
        data = base64.b64decode(base64_image)
        image = BytesIO(data)
        
        s3.upload_fileobj(
            Fileobj=image, 
            Bucket="face-detection-sc-s3", 
            Key = "sign.jpg"
            )
        
        image_url = create_presigned_url("face-detection-sc-s3", "sign.jpg")
        
        if image_url is not None:
            return image_url.split("?")[0]
        else:
            return "Error in creating sign image url"
