import requests
from config import ASSEMBLY_API_KEY

def transcribe_with_assembly(file_obj) -> str:
    headers = {'authorization': ASSEMBLY_API_KEY}
    # Upload the file directly from the file object
    upload_resp = requests.post(
        'https://api.assemblyai.com/v2/upload',
        headers=headers,
        data=file_obj
    )
    audio_url = upload_resp.json()['upload_url']

    # Request transcription
    json_req = {'audio_url': audio_url}
    trans_resp = requests.post(
        'https://api.assemblyai.com/v2/transcript',
        json=json_req,
        headers=headers
    )
    trans_id = trans_resp.json()['id']

    # Poll for transcription result
    while True:
        status_resp = requests.get(
            f'https://api.assemblyai.com/v2/transcript/{trans_id}',
            headers=headers
        )
        data = status_resp.json()
        if data['status'] == 'completed':
            return data['text']
        if data['status'] == 'error':
            raise Exception(data['error'])