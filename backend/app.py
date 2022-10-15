from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
# MONGO_USER = os.getenv('MONGO_USER')
# MONGO_PASS = os.getenv('MONGO_PASS')
# client = MongoClient(f'mongodb+srv://{MONGO_USER}:{MONGO_PASS}@cluster0.tk2cy.mongodb.net/?retryWrites=true&w=majority')
# db=client.run1

app = Flask(__name__)
CORS(app)


@app.route("/api")
def api():
    return {"hello": "world"}
