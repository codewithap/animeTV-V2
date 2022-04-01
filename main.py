from flask import Flask,render_template,request

app = Flask(__name__)

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



if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",port=80)

