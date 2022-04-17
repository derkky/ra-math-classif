from flask import Flask, request, send_from_directory
from api.algo import predict_label

app = Flask(__name__)

@app.route("/")
def render_client():
    return send_from_directory("client", "index.html")

@app.route("/api/getlabel", methods=["POST"])
def get_label():
    return {"labels": list(predict_label(request.json["question"]))}
