from flask import Flask,render_template,request
from flask_cors import CORS, cross_origin
from scrappers.gogoanime import search as s
from scrappers.gogoanime import getEpisodes,getDownloadUrl
from requests import get
from bs4 import BeautifulSoup
import threading
import subprocess
import socket
import os

subprocess.Popen("nohup python3 /app/scripts/p2p.py", shell=True)

    

app = Flask(__name__)
cors = CORS(app) 

@app.route("/")
def home():

    return render_template("home.html")

@app.route("/search",methods = ["GET","POST"])
def search():
    query = request.args.get("search")

    return render_template("search.html",query=query)


@app.route("/anime",methods=["GET","POST"])
def anime():
    animeId = request.args.get("id")

    return render_template("anime.html",animeId=animeId)



@app.route("/api/search/<string:q>")
@cross_origin()
def result(q):
    return s(q)

@app.route("/api/episodes/<string:link>")
@cross_origin()
def episodes(link):
    return getEpisodes(link)

@app.route("/api/download/<string:data>")
@cross_origin()
def download(data):
    return getDownloadUrl(data)



@app.route("/logs")
def logs():
    hostname = socket.gethostname()
    ip = get('https://api.ipify.org').text
    with open("nohup.out") as f:
        message = f.readlines()
    return  f"""
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.0/themes/prism.min.css"
/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.0/prism.min.js"></script>

<pre><code class="language-css">
    <br>
    ip: {ip}
    hostname: {hostname}

    {massage}
</code></pre>



    """


if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",port=80)

