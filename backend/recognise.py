import boto3

client_reko = boto3.client('rekognition')

def check_faces():
    response = client_reko.compare_faces(
        SimilarityThreshold=70,
        SourceImage={
            'S3Object': {
                'Bucket': 'face-detection-sc-s3',
                'Name': 'source.jpg'
            }
        },
        TargetImage={
            'S3Object': {
                'Bucket': 'face-detection-sc-s3',
                'Name': 'target.jpg'
            }
        }
    )

    for i in response['FaceMatches']:
        if i['Similarity'] > 80:
            return True
        else:
            return False