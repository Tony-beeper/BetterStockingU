from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
import os
from dotenv import load_dotenv
import cohere
import training
from flask import request
import requests

load_dotenv()
COHERE = os.getenv('COHERE')
MONGO_USER = os.getenv('MONGO_USER')
MONGO_PASS = os.getenv('MONGO_PASS')
TWITTER_BRARER = os.getenv('bearer_token')
print(
    f'mongodb+srv://{MONGO_USER}:{MONGO_PASS}@cluster0.nuben.mongodb.net/?retryWrites=true&w=majority')
client = MongoClient(
    f'mongodb+srv://{MONGO_USER}:{MONGO_PASS}@cluster0.nuben.mongodb.net/?retryWrites=true&w=majority')
db = client.stockingu
co = cohere.Client(COHERE)

app = Flask(__name__)
CORS(app)
print(db)


def get_rating(company, posts):
    collection = db.stockingu
    company_rating = collection.find_one({'data.company': company})
    if company_rating:
        print("cache hit")
        company_rating['_id'] = str(company_rating['_id'])
        return company_rating
    else:
        classifications = co.classify(
            model='medium',
            inputs=posts,
            examples=training.examples
        )
        output = []
        average = 0
        for cl in classifications.classifications:
            print(cl)
            title = cl.input
            sentiment = cl.prediction
            confidence_p = cl.labels['positive'].confidence
            confidence_n = cl.labels['negative'].confidence
            confidence = 0
            if sentiment == "positive":
                confidence = confidence_p
            elif sentiment == "negative":
                confidence = confidence_n*-1

            output.append({
                'title': title,
                'sentiment': sentiment,
                'confidence': confidence
            })
        average += confidence

        result = {'data': {'company': company, 'rating': average /
                  len(classifications.classifications)}}
        collection.insert_one(result)
        result['_id'] = str(result['_id'])
        return {'data': output}


@app.route("/api", methods=['POST'])
def api():
    if request.method == 'POST':
        posts = request.json['posts']
        company = request.json['company']
        print({"you entered ": posts})
        return get_rating(company, posts)

    return {"hello": "world"}


@app.route("api/twiiter/<query>")
def search_twitter(query):
    # api-endpoint
    URL = "https://api.twitter.com/2/tweets/search/recent?query=lang%3Aen%20Apple&max_results=10"

    headers = {"Authorization": TWITTER_BRARER}

    # # defining a params dict for the parameters to be sent to the API
    # PARAMS = {'address':location}

    # sending get request and saving the response as response object
    r = requests.get(url=URL, headers=headers)

    # extracting data in json format
    data = r.json()

    print(data)
