from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json

# Start the app and setup the static directory for the html, css, and js files.
app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)

jsonDirectory = "app/json"
patientFileName = "patient.json"
patientFilePath = jsonDirectory + "/" + patientFileName

@app.route('/')
def helloWorld():
    return "Placeholder"


@app.route('/patient_info')
def patientInfo():
    if patientFileName:
        with open(patientFilePath, 'r') as f:
            data = json.load(f)
    
    patientData = {
        "name": getFullName(data),
        "organization": getOrganizationName(data),
        "gender": getGender(data),
        "numOfConditions": getNumOfConditions(data),
        "conditions": getConditions(data)
    }

    return jsonify(patientData)


def getFullName(data):
    return data["name"][0]["given"][0] + " " + data["name"][0]["family"][0]

def getOrganizationName(data):
    return data["managingOrganization"]["display"]

def getGender(data):
    return data["gender"]

def getNumOfConditions(data):
    return len(data["conditions"])

def getConditions(data):
    return data["conditions"]


if __name__ == "__main__":
    # For debugging while developing
    app.run(host='0.0.0.0', debug=True, port=os.environ.get('PORT', 80))
