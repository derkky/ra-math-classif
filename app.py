from flask import Flask, request, send_from_directory
#from flask_cors import CORS
from api.algo import predict_label

app = Flask(__name__, static_folder="client", static_url_path='')
#CORS(app)

@app.route("/")
def render_client():
    return send_from_directory(app.static_folder, "index.html")

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route("/api/getlabel", methods=["POST"])
def get_label():
    return {"labels": list(predict_label(request.json["question"]))}
