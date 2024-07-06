from flask import Blueprint, jsonify, request
import requests

search_bp = Blueprint('search', __name__)

@search_bp.route('/search', methods=['POST'])
def search():
    # Get keywords from the request body
    data = request.get_json()
    keywords = data.get('keywords')

    # Check if keywords are present
    if not keywords:
        return jsonify({'error': 'Keywords not provided'}), 400

    # Define the API endpoint to proxy the request
    api_url = 'http://188.165.208.177:8006/search'

    # Prepare the request headers
    headers = {'Content-Type': 'application/json'}

    # Prepare the request body
    body = {'keywords': keywords}

    try:
        # Make the HTTP POST request to the external API
        response = requests.post(api_url, json=body, headers=headers)

        # Check if the request was successful
        if response.ok:
            # Return the response from the external API
            return jsonify(response.json()), response.status_code
        else:
            # Return an error response if the request failed
            return jsonify({'error': 'Failed to fetch data from the external API'}), response.status_code
    except Exception as e:
        # Handle exceptions if any
        return jsonify({'error': str(e)}), 500
