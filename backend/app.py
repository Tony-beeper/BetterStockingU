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
MONGO_USER = os.getenv('MONGO_USER')
MONGO_PASS = os.getenv('MONGO_PASS')
print(
    f'mongodb+srv://{MONGO_USER}:{MONGO_PASS}@cluster0.nuben.mongodb.net/?retryWrites=true&w=majority')
client = MongoClient(
    f'mongodb+srv://{MONGO_USER}:{MONGO_PASS}@cluster0.nuben.mongodb.net/?retryWrites=true&w=majority')
db = client.stockingu
co = cohere.Client(COHERE)

app = Flask(__name__)
CORS(app)
print(db)


@app.route("/api", methods=['POST'])
def api():
    if request.method == 'POST':
        data = request.json['data']
        print({"you entered ": data})
        collection = db.stockingu
        result = collection.find_one({'data.title': data})
        print(result)
        # convert OjectID to string
        if result:
            print("cache hit")
            result['_id'] = str(result['_id'])
            return result
        else:
            classifications = co.classify(
                model='medium',
                inputs=[data],
                examples=training.examples
            )
            print(classifications)
            output = {}
            for cl in classifications.classifications:
                output = {
                    'title': cl.input,
                    'sentiment': cl.prediction,
                    'confidence': cl.confidence[0].confidence
                }
            collection.insert_one({'data': output})
            return output

    return {"hello": "world"}
