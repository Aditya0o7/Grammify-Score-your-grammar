import requests
from config import os, load_dotenv

load_dotenv()
LANGUAGETOOL_API_URL = os.getenv('LANGUAGETOOL_API_URL')

def check_grammar(text: str) -> dict:
    # Prepare the API request
    params = {
        'text': text,
        'language': 'en-US'
    }
    response = requests.post(LANGUAGETOOL_API_URL, data=params)
    if response.status_code != 200:
        raise Exception(f"LanguageTool API error: {response.status_code} - {response.text}")

    # Parse the response
    data = response.json()
    matches = data.get('matches', [])
    total_words = len(text.split()) or 1
    error_count = len(matches)
    score = max(0, 100 - (error_count / total_words) * 100)
    highlights = []

    for match in matches:
        highlights.append({
            'offset': match['offset'],
            'length': match['length'],
            'message': match['message'],
            'suggestions': [replacement['value'] for replacement in match.get('replacements', [])]
        })

    return {
        'text': text,
        'total_words': total_words,
        'error_count': error_count,
        'score': round(score, 2),
        'highlights': highlights
    }