from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
import os
from dotenv import load_dotenv
import cohere
import training
from flask import request


load_dotenv()
COHERE = os.getenv('COHERE')
# MONGO_USER = os.getenv('MONGO_USER')
# MONGO_PASS = os.getenv('MONGO_PASS')
# client = MongoClient(f'mongodb+srv://{MONGO_USER}:{MONGO_PASS}@cluster0.tk2cy.mongodb.net/?retryWrites=true&w=majority')
# db=client.run1
co = cohere.Client(COHERE)

app = Flask(__name__)
CORS(app)


@app.route("/api", methods=['POST'])
def api():
    if request.method == 'POST':
        data = request.json['data']
        print({"you entered ": data})

        classifications = co.classify(
            model='medium',
            inputs=[data],
            examples=training.examples
        )
        print(classifications)
        output = []
        for cl in classifications.classifications:
            output.append({
                'title': cl.input,
                'sentiment': cl.prediction,
                'confidence': cl.confidence[0].confidence
            })
        return {data: output}

    return {"hello": "world"}
