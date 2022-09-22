    const sresult = document.querySelector("#Sresult");
   
    const base_url = "https://api.jikan.moe/v3";
    let last_page = "";
    let loadMore = document.querySelector("#loadMore");

    function search(url, pageNumber, query) {
        loadMore.innerHTML = "Loding...";
        loadMore.disabled = true;
        fetch(`${url}/search/anime?q=${query}&page=${pageNumber}`)
            .then(res => res.json())
            .then(data => sResult(data))
            .catch(err => err());
    }

    function sResult(data) {
        let animArr = data["results"]
        for (let i = 0; i < animArr.length; i++) {
            sresult.innerHTML += template(animArr[i]["title"], animArr[i]["mal_id"], animArr[i]["image_url"]);
        }
        last_page = data["last_page"];
        loadMore.innerHTML = "Load More";
        loadMore.disabled = false;
    }

    function template(title, id, imgUrl) {
        return `
    <div class="card">
            <a href="/anime?id=${id}"><button>
                <div>
                    <img loading="lazy" src="${imgUrl}">
                </div>
                <h4>${title}</h4>
            </button></a>
        </div>
    `
    }
    sessionStorage.setItem("page", 2);
    search(base_url, 1, query)

    function loadAnime() {
        page = sessionStorage.getItem("page");
        search(base_url, page, query);
        sessionStorage.removeItem('image');
        sessionStorage.setItem("page", Number(page) + 1);
        if (Number(page) == last_page) {
            document.querySelector("#loadMore").style.display = "none";
        }
    }
    let error = document.querySelector("#err");

    function err() {
        setTimeout(() => {
            error.style.display = "flex";
        }, 4000);
        error.style.disabled = "none";
    }
