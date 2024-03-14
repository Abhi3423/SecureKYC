import re

def extract_12_digit_numbers(input_string):
    # Regular expression pattern to match a 12-digit number separated by spaces
    pattern = r'\b\d{4}\s\d{4}\s\d{4}\b'

    # Find all matches
    matches = re.findall(pattern, input_string)

    # Replace spaces and return the matches
    return [match.replace(" ", "") for match in matches]


def extract_names(input_string):

    # Regular expression pattern to match names with two or three words
    pattern = r'\b(?!(?:Government of India|Year of Birth|Place of Birth|Male|Female|Others|पुरुष|महिला|अन्य|Issue Date)\b)[A-Z][a-zA-Z]*\s[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)?\b'
    
    # Find all matches
    matches = re.findall(pattern, input_string)
    
    return matches[0]

def extract_gender(input_string):

    pattern = r'\b(?:Male|Female)\b'
    
    # Find the match
    match = re.search(pattern, input_string)
    
    # Return the match if found, otherwise return None
    return match.group() if match else None

def extract_birth_date(input_string):

    # Regular expression pattern to match date of birth in "03/07/2001" format or year of birth as "1998"
    pattern = r'(?:DOB:|DOB|Date of Birth|Year of Birth)\s*:\s*(\d{2}/\d{2}/\d{4}|\d{4})\b'
    
    # Find the match
    match = re.search(pattern, input_string)
    
    # Return the match if found, otherwise return None
    return match.group(1) if match else None