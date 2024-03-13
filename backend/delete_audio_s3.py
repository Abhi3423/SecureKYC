import boto3

aws_resources = boto3.resource('s3')

for bucket in aws_resources.buckets.all():
    bucket = bucket.name
    
s3 = boto3.client('s3')

response = s3.delete_object(Bucket=bucket, Key="audio")
print(response)