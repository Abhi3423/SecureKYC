import re

def extract_12_digit_numbers(input_string):
    # Regular expression pattern to match a 12-digit number separated by spaces
    pattern = r'\b\d{4}\s\d{4}\s\d{4}\b'

    # Find all matches
    matches = re.findall(pattern, input_string)

    # Replace spaces and return the matches
    return [match.replace(" ", "") for match in matches]

