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

@app.route("/anime/e")
def episodes():
    sname = request.args.get("name")
    animeId = request.args.get("id")
    uoChaecters = ["(",")"]
    for i in uoChaecters: 
        sname = sname.replace(i,"")
    if sname == "Black Clover":
        sname = "Black Clover tv"
    try:
        ep = getEpisodes(s(sname))
       # return f"{ep}"
        return render_template("episodes.html",ep =ep ,s =sname,loopRange = len(ep),animeId=animeId)
    except:
        return "No episodes found on server"

@app.route("/anime/episodes/<string:link>")
@cross_origin()
def download(link):
    durl = getDownloadUrl(link)
    return f"{durl}"

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",port=80)
