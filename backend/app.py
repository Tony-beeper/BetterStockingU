import datetime
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
MAX_RESULTS = 10
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
    # if company_rating:
    #     print("cache hit")
    #     company_rating['_id'] = str(company_rating['_id'])
    #     return company_rating
    # else:
    classifications = co.classify(
        model='finance-sentiment',
        inputs=posts,
    )
    output = []
    average = 0
    for cl in classifications.classifications:
        print(cl)
        title = cl.input
        sentiment = cl.prediction
        confidence_p = cl.labels['POSITIVE'].confidence
        confidence_n = cl.labels['NEGATIVE'].confidence
        confidence = 0
        if sentiment == "POSITIVE":
            confidence = confidence_p
        elif sentiment == "NEGATIVE":
            confidence = confidence_n*-1

        output.append({
            'title': title,
            'sentiment': sentiment,
            'confidence': confidence
        })
    average += confidence
    rating = average / len(classifications.classifications)
    timestamp = datetime.datetime.utcnow()
    result = {'data': {'company': company,
                       'rating': rating, 'timestamp': timestamp}}
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


def get_twitter_page_data(query, next_token):
    # api-endpoint
    URL = "https://api.twitter.com/2/tweets/search/recent?query={}&max_results={}".format(
        query, MAX_RESULTS)
    nest_token_str = ("&next_token=" + next_token) if next_token else ""
    URL = URL + nest_token_str

    headers = {"Authorization": TWITTER_BRARER}

    # sending get request and saving the response as response object
    r = requests.get(url=URL, headers=headers)

    # extracting data in json format
    return r.json()


def get_twitter_data(query):
    round = 0
    next_token = ""
    text_arr = []
    while (round < 5):
        result = get_twitter_page_data(query=query, next_token=next_token)
        if (not 'data' in result):
            break
        for tweet in result['data']:
            text_arr.append(tweet['text'])
        if ('next_token' in result['meta']):
            next_token = result['meta']['next_token']
        round = round + 1
    return text_arr


@app.route("/api/twitter/search/<company>", methods=['GET'])
def search_twitter(company):
    query = "lang%3Aen%20%23{}".format(company)
    text_arr = get_twitter_data(query)
    return {"text_arr": text_arr}


@app.route("/api/twitter/user/<username>", methods=['GET'])
def search_by_user(username):
    query = "lang%3Aen%20from%3A{}".format(username)
    text_arr = get_twitter_data(query)
    return {"text_arr": text_arr}


@app.route("/test", methods=['GET'])
def test():
    return {"text_arr": "a"}
