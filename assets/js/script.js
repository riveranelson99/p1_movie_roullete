// Establish global variables to be called upon as needed
// It was important that the keys for the apis be established as variables so that we could use template literal instead of relying on typing the keys out each time
var $apiKey = "67a7bac5263ae44afd8231f3402a5637";
var $ytApiKey = "AIzaSyDffwDfF2JLHOkYqWgIXEWlnOZOjPhkMs4"
var submitBtn = document.querySelector('.btn');

// The first function we established was generating a list of movies based on the users selection of genre
// When the genre is selected, a series of divs are created dynamically that will establish cards for the movie information
// The cards are sized according to materialize
// This is where the first api is called on to generate the movie information (TMDB)
function movieGenre(genreId) {
    var $tmdbTop = `https://api.themoviedb.org/3/discover/movie?api_key=${$apiKey}&with_genres=${genreId}&language=en-US&vote_count.gte=750&sort_by=popularity.desc`;

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
                $size.setAttribute("class", "col s12 m3 l12");

                var $card = document.createElement("div");
                $card.setAttribute("class", "card")
                $card.setAttribute("data-movie", data.results[i].title)

                var $img = document.createElement("div");
                $img.setAttribute("class", "card-image");

                var $content = document.createElement("div");
                $content.setAttribute("class", "card-content");

                var $poster = document.createElement("img");
                $poster.setAttribute("src", "https://image.tmdb.org/t/p/w300" + data.results[i].poster_path);

                $img.appendChild($poster);
                $card.appendChild($img);
                $size.appendChild($card);
                $row.appendChild($size);
                $movie.appendChild($row);
            }
        })
}

// This function uses the TMDB api once more to generate a list of movies based on the users selection of genre
// This function also helps generate the dropdown list of genres available to the TMDB api
// It populates the select list with the available genres returned from api
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

                response.json().then(function (data) {
                    console.log(data.genres[0].name, data.genres[0].id);

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

// This function utilizes the Youtube api to receive the trailer information from the movies generated using the TMDB api
// This function also serves as a redirect to take users directly to the Youtube page for the official trailer of the movie they selected on
async function getTrailerForMovie(movieTitle) {
    var $ytRequestUrl = `https://content-youtube.googleapis.com/youtube/v3/search?type=video&q=${movieTitle} Official Trailer&part=snippet&maxResults=1&key=${$ytApiKey}`;
    var movieID;

    await fetch($ytRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            movieID = data.items[0].id.videoId;
        });
        return `https://www.youtube.com/watch?v=${movieID}`;
}

// This event listener looks to see which genre the user selected in order to populate a list of movies based on the specific value of the api information coming in from TMDB
submitBtn.addEventListener("click", function () {
    var dropdownSelection = document.getElementById("movies").value;
    console.log(dropdownSelection);
    movieGenre(dropdownSelection);
    rmv()
    
});
function rmv() {
var element = document.getElementById("toprated");
    element.classList.remove("hide");
}
// This event listener looks to see when a user clicks on a movie card
// The movie card then returns the information for the specific movie utilizing both apis to get the movie information and provide a redirect to the trailer of the selected movie
$(document).on('click', '.card', function() {
    var title = $(this).attr('data-movie');
    console.log(title);
    
    getTrailerForMovie(title).then(function(movieID) {
        console.log(movieID);
        window.open(movieID, "_blank");
    });
})

// Establish the function to operate on page load so as to ensure the drop down list is properly generated based on the api information
generateDropdownFromGenreIdList();