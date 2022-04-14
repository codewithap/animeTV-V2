from bs4 import BeautifulSoup
import requests

animeName = "naruto"

base_url = "https://gogoanime.fi//search.html?keyword="

def getSearchResult(url):
    r = requests.get(url)
    html = BeautifulSoup(r.content, 'html.parser')
    result = html.select(".items li a")
    links=[]
    titles=[]
    for a in result:
        links.append(f"https://gogoanime.fi{a['href']}")
        titles.append(a["title"])
    return [links,titles]




print(getSearchResult(base_url+animeName))