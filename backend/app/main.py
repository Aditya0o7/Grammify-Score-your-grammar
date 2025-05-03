import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from assembly import transcribe_with_assembly
from grammar import check_grammar

app = Flask(__name__)
CORS(app)

@app.route('/score', methods=['POST'])
def score_audio():
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    try:
        # Transcribe audio directly from the file object
        text = transcribe_with_assembly(file)
        # Grammar check
        result = check_grammar(text)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(result)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)