var $apiKey = "67a7bac5263ae44afd8231f3402a5637";
var $ytApiKey ="AIzaSyDffwDfF2JLHOkYqWgIXEWlnOZOjPhkMs4"
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
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var $movie = document.getElementById("movie-list");

        // var $genre = document.getElementById("movies");
        // $genre.innerHTML = "";

        var $row = document.createElement("div");        
        $row.setAttribute("class", "row");

        for (i = 0; i < 10; i++) {

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
            $poster.setAttribute("src", "https://image.tmdb.org/t/p/w300" + data.results[i].poster_path);

            // var $title = document.createElement("span");
            // $title.setAttribute("class", "card-title");
            // $title.textContent = data.results[i].title;

            // var $description = document.createElement("p");
            // $description.textContent = data.results[i].overview;

            var $trailer = document.createElement("a");
            $trailer.setAttribute("href", "#");
            $trailer.textContent = ("This is a link");

            // $content.appendChild($title);
            // $content.appendChild($description);
            $img.appendChild($poster);
            $action.appendChild($trailer);
            $card.appendChild($img);
            $card.appendChild($content);
            $card.appendChild($action);
            $size.appendChild($card);
            $row.appendChild($size);
            $movie.appendChild($row);
        }
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
        function(response) {  
        if (response.status !== 200) {  
            console.warn('Looks like there was a problem. Status Code: ' + 
            response.status);
            console.log(response);  
            return;  
        }
    
          // Examine the text in the response  
        response.json().then(function(data) {  
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
    .catch(function(err) {  
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

//test();
//movieGenre();
generateDropdownFromGenreIdList();

submitBtn.addEventListener("click", function() {
    var dropdownSelection = document.getElementById("movies").value;;
    console.log(dropdownSelection);
    movieGenre(dropdownSelection);
});