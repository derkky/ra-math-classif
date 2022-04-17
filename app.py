from flask import Flask, request, send_from_directory
from api.algo import predict_label

app = Flask(__name__, static_folder="client", static_url_path='')

@app.route("/")
def render_client():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/getlabel", methods=["POST"])
def get_label():
    return {"labels": list(predict_label(request.json["question"]))}
