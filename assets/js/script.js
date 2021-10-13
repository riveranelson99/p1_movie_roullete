var $apiKey = "67a7bac5263ae44afd8231f3402a5637";
var $ytApiKey = "AIzaSyDffwDfF2JLHOkYqWgIXEWlnOZOjPhkMs4"
//var $tmdbGenres = "https://api.themoviedb.org/3/genre/movie/list?api_key=67a7bac5263ae44afd8231f3402a5637";
var submitBtn = document.querySelector('.btn');


//function test() {
//    fetch($tmdbGenres)
//    .then(function(response) {
//        return response.json();
//    })
//    .then(function(data) {
//        console.log(data);
//    })
//}

function movieGenre(genreId) {
    var $tmdbTop = `https://api.themoviedb.org/3/discover/movie?api_key=${$apiKey}&with_genres=${genreId}&language=en-US&vote_count.gte=2500&sort_by=popularity.desc`;

    fetch($tmdbTop)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            document.getElementById("movie-list").innerHTML = "";

            var $movie = document.getElementById("movie-list");

            var $row = document.createElement("div");
            $row.setAttribute("class", "row");

            for (i = 0; i < 10; i++) {

                var $size = document.createElement("div");
                $size.setAttribute("class", "col s12 m3");

                var $card = document.createElement("div");
                $card.setAttribute("class", "card")
                $card.setAttribute("data-movie", data.results[i].title) //adding title behind a data-movie attribute
                $card.setAttribute("data-bulk",JSON.stringify(data.results[i])) //adding all the movie data behind a data-bulk attribute

                var $img = document.createElement("div");
                $img.setAttribute("class", "card-image");

                var $content = document.createElement("div");
                $content.setAttribute("class", "card-content");

                var $action = document.createElement("div");
                $action.setAttribute("class", "card-action");

                var $poster = document.createElement("img");
                $poster.setAttribute("src", "https://image.tmdb.org/t/p/w300" + data.results[i].poster_path);

                // var $title = document.createElement("span");
                // $title.setAttribute("class", "card-title");
                // $title.textContent = data.results[i].title;

                // var $description = document.createElement("p");
                // $description.textContent = data.results[i].overview;
                var youtubeStringTitleQuery = data.results[i].title.replace(" ", "+")

                var $trailer = document.createElement("a");
                $trailer.setAttribute("href", "https://www.youtube.com/results?search_query=" + youtubeStringTitleQuery);
                $trailer.setAttribute("id", "youtube")
                $trailer.textContent = data.results[i].title;

                // $content.appendChild($title);
                // $content.appendChild($description);
                $img.appendChild($poster);
                $action.appendChild($trailer);
                $card.appendChild($img);
                // $card.appendChild($content);
                $card.appendChild($action);
                $size.appendChild($card);
                $row.appendChild($size);
                $movie.appendChild($row);

            }

//             var movieList = document.querySelector('#movie-list');
// movieList.addEventListener('click', function(event) {
//     console.log('i know how to do a click')
//     console.log('event', event.currentTarget)
//     // if (event.target.matches('.card')) {
//         var selectedMovieBulk = event.currentTarget.getAttribute('data-bulk');
//         var selectedMovieTitle = event.currentTarget.getAttribute('data-title');

//         console.log('movie title:  ' + selectedMovieTitle);
//         console.log('bulk data', JSON.parse(selectedMovieBulk));
    // }

// })
            // var $youTube = document.getElementById("youtube");

            // for (i = 0; i < $youTube.length; i++) {
            //     $youTube[i].addEventListener("click", (getTrailerForMovie(i)))
            // }
            // loop through posters
            // event listener for each one
            // each event listener will be the intended target
            // $youTube.addEventListener("click", function() {
            //     var $movieTitle = document.querySelectorAll(".card-title");
            //     console.log(this.closest(".card-title"));
            //     console.log($movieTitle);
            //     getTrailerForMovie($movieTitle);
            // })
        })
}

// function getMoviesByGenre(genreId) {

//     var requestUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreId}&language=en-US&vote_count.gte=2500&sort_by=popularity.desc`;

//     fetch(requestUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);

//     });
// }

function generateDropdownFromGenreIdList() {

    let dropdown = document.getElementById('movies');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose a genre';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${$apiKey}`;

    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    console.log(response);
                    return;
                }

                // Examine the text in the response  
                response.json().then(function (data) {
                    console.log(data.genres[0].name, data.genres[0].id);
                    //console.log(data[0].id);

                    let option;

                    for (let i = 0; i < data.genres.length; i++) {
                        option = document.createElement('option');
                        option.text = data.genres[i].name;
                        option.value = data.genres[i].id;
                        dropdown.add(option);
                    }
                });
            }
        )
        .catch(function (err) {
            console.error('Fetch Error -', err);
        });
}

function getTrailerForMovie(movieTitle) {
    var $ytRequestUrl = `https://content-youtube.googleapis.com/youtube/v3/search?type=video&q=${movieTitle} Official Trailer&part=snippet&maxResults=1&key=${$ytApiKey}`;

    fetch($ytRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

        });

}
getTrailerForMovie('The Matrix');

//test();
//movieGenre();
generateDropdownFromGenreIdList();

submitBtn.addEventListener("click", function () {
    var dropdownSelection = document.getElementById("movies").value;
    console.log(dropdownSelection);
    movieGenre(dropdownSelection);
});

$(document).on('click', '.card', function(event) {
    console.log('this', this);
    var dataBulk = JSON.parse($(this).attr('data-bulk'));
    var title = $(this).attr('data-title');
    console.log(dataBulk);
    console.log(title);
    // hit the youtube api to get its trailer and you can even potentially embed straight into your modal

})

function modalDisplay() {

}
// var $poster = document.querySelector("img");