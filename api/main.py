from flask import Flask,render_template,request
from flask_cors import CORS, cross_origin
from scrappers.gogoanime import search as s
from scrappers.gogoanime import getEpisodes,getDownloadUrl
from requests import get
import socket

app = Flask(__name__)
cors = CORS(app) 

@app.route("/")
def home():
    return render_template("home.html", url="https://www.animetv.ml/static/ap.png")
    
@app.route("/robots.txt")
def robots():
  return render_template("robots.txt")

@app.route("/search",methods = ["GET","POST"])
def search():
    query = request.args.get("search")
    return render_template("search.html",query=query)

@app.route("/anime/<string:animeId>/<string:title>",methods=["GET","POST"])
def anime(animeId,title):
    url = request.args.get("url")
    return render_template("anime.html",animeId=animeId,title = title,url=url)
id
@app.route("/anime/<string:animeId>")
def episodes(animeId):
    hostname = socket.gethostname()
    sname = request.args.get("name")
    sjpname = request.args.get("jpname")
    # animeId = request.args.get("id")
    uoChaecters = ["(",")",":","."]
    for i in uoChaecters: 
        sname = sname.replace(i,"")
        sjpname = sjpname.replace(i,"")
    if sname == "Black Clover":
        sname = "Black Clover tv"
    try:
        ep = getEpisodes(s(sjpname.lower()))
        return render_template("episodes.html",ep =ep ,s =sname,loopRange = len(ep),animeId=animeId)
    except:
        try:
            ep = getEpisodes(s(sname))
            return render_template("episodes.html",ep =ep ,s =sname,loopRange = len(ep),animeId=animeId)
        except:
            return "No episodes found on server"

@app.route("/anime/episodes/<string:link>")
@cross_origin()
def download(link):
    jsondata = getDownloadUrl(link)
    return jsondata

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",port=80)
