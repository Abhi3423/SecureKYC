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
    
    response_pan = client_reko.compare_faces(
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
                'Name': 'pan.jpg'
            }
        }
    )
    
    response_both = client_reko.compare_faces(
        SimilarityThreshold=70,
        SourceImage={
            'S3Object': {
                'Bucket': 'face-detection-sc-s3',
                'Name': 'target.jpg'
            }
        },
        TargetImage={
            'S3Object': {
                'Bucket': 'face-detection-sc-s3',
                'Name': 'pan.jpg'
            }
        }
    )

    # for i in response['FaceMatches']:
    #     if i['Similarity'] > 80:
    #         return True
    #     else:
    #         return False
     
    try:
        if response['FaceMatches'][0]['Similarity'] > 80 and response_pan['FaceMatches'][0]['Similarity'] > 80 and response_both['FaceMatches'][0]['Similarity'] > 80:
            return True
        else:
            return False
    except IndexError:
        return False