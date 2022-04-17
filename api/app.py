from flask import Flask, request
import joblib
from algo import predict_label

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/getlabel", methods=["POST"])
def get_label():
    return {"labels": list(predict_label(request.json["question"]))}
