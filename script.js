let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let messageEl = document.getElementById("message");
let spinnerEl = document.getElementById("spinner");
let headingEl = document.createElement("h1");

function createAndAppendSearchResults(search_results) {
    if (search_results.length < 1) {
        messageEl.textContent = "No Results Found";
        searchResultsEl.textContent = "";
        headingEl.textContent = "";
    } else {
        searchResultsEl.textContent = "";
        messageEl.textContent = "";
        headingEl.textContent = "Popular Books";
        searchResultsEl.appendChild(headingEl);
        for (let eachItem of search_results) {
            let title = eachItem.title;
            let imageUrl = eachItem.imageLink;
            let author = eachItem.author;
            let imageEl = document.createElement("img");
            let textEl = document.createElement("p");
            imageEl.setAttribute("src", imageUrl);
            textEl.textContent = author;
            searchResultsEl.appendChild(imageEl);
            searchResultsEl.appendChild(textEl);
            console.log(eachItem);
        }
    }
};

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");

        let searchInputVal = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputVal;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                createAndAppendSearchResults(search_results);
                spinnerEl.classList.toggle("d-none");
            });
    }
});