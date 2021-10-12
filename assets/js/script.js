var $apiKey = "67a7bac5263ae44afd8231f3402a5637";
var $tmdbGenres = "https://api.themoviedb.org/3/genre/movie/list?api_key=67a7bac5263ae44afd8231f3402a5637";
var $tmdbTop = "https://api.themoviedb.org/3/discover/movie?api_key=b317866565935a86e63d93d931149cda&with_genres=35";

function test() {
    fetch($tmdbGenres)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
}

function test2() {
    fetch($tmdbTop)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var $movie = document.getElementById("movie-list");

        var $row = document.createElement("div");
        $row.setAttribute("class", "row");

        var $size = document.createElement("div");
        $size.setAttribute("class", "col s12 m3");

        var $card = document.createElement("div");
        $card.setAttribute("class", "card");

        var $img = document.createElement("div");
        $img.setAttribute("class", "card-image");

        var $content = document.createElement("div");
        $content.setAttribute("class", "card-content");

        var $action = document.createElement("div");
        $action.setAttribute("class", "card-action");

        var $poster = document.createElement("img");
        $poster.setAttribute("style", "background-image: url(https://image.tmdb.org/t/p/w200" + data.results[0].poster_path + ")");

        var $title = document.createElement("span");
        $title.setAttribute("class", "card-title");
        $title.textContent = data.results[0].title;

        var $description = document.createElement("p");
        $description.textContent = data.results[0].overview;

        var $trailer = document.createElement("a");
        $trailer.setAttribute("href", "#");
        $trailer.textContent = ("This is a link");

        $content.appendChild($title);
        $content.appendChild($description);
        $img.appendChild($poster);
        $action.appendChild($trailer);
        $card.appendChild($img);
        $card.appendChild($content);
        $card.appendChild($action);
        $size.appendChild($card);
        $row.appendChild($size);
        $movie.appendChild($row);
    })
}


test();
test2();