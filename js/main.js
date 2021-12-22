const api_key = "api_key=43d1439860767035d11845aeba6a6738";
const root_api = "https://api.themoviedb.org/3";
const API_URL = `${root_api}/discover/movie?sort_by=popularity.desc&${api_key}`;
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=43d1439860767035d11845aeba6a6738

const IMG_URL = `https://image.tmdb.org/t/p/w500`;
//https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg

const SEARCH_URL = `${root_api}/search/movie?${api_key}`;
// https://api.themoviedb.org/3/search/movie?api_key=43d1439860767035d11845aeba6a6738&query=venom

const main = document.querySelector("#main");
const search_form = document.querySelector("#search-form");
const search_input = document.querySelector("#search-input");

// https://api.themoviedb.org/3/genre/movie/list?api_key=43d1439860767035d11845aeba6a6738
const genres = [
    {
    "id": 28,
    "name": "Action"
    },
    {
    "id": 12,
    "name": "Adventure"
    },
    {
    "id": 16,
    "name": "Animation"
    },
    {
    "id": 35,
    "name": "Comedy"
    },
    {
    "id": 80,
    "name": "Crime"
    },
    {
    "id": 99,
    "name": "Documentary"
    },
    {
    "id": 18,
    "name": "Drama"
    },
    {
    "id": 10751,
    "name": "Family"
    },
    {
    "id": 14,
    "name": "Fantasy"
    },
    {
    "id": 36,
    "name": "History"
    },
    {
    "id": 27,
    "name": "Horror"
    },
    {
    "id": 10402,
    "name": "Music"
    },
    {
    "id": 9648,
    "name": "Mystery"
    },
    {
    "id": 10749,
    "name": "Romance"
    },
    {
    "id": 878,
    "name": "Science Fiction"
    },
    {
    "id": 10770,
    "name": "TV Movie"
    },
    {
    "id": 53,
    "name": "Thriller"
    },
    {
    "id": 10752,
    "name": "War"
    },
    {
    "id": 37,
    "name": "Western"
    }
    ];
const sectionGenres = document.querySelector("#genres");



function getGenre() {
    sectionGenres.innerHTML = '';

    genres.forEach(genre => {
        const genreDiv = document.createElement("div");
        genreDiv.classList.add("genre");
        genreDiv.id = genres.id;
        genreDiv.innerHTML = genre.name;
        genreDiv.addEventListener("click", () => {
            getMovies(`${API_URL}&with_genres=${genre.id}`);
        });
        sectionGenres.append(genreDiv);
    });
};



getGenre();



function getMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.log(error))
};



getMovies(API_URL);



function displayMovies(data) {
    main.innerHTML = ``;

    data.forEach(movie => {
        const { title } = movie;
        const { poster_path} = movie;
        const { vote_average } = movie;
        const { overview } = movie;

        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `
            <img src="${poster_path? IMG_URL + poster_path : "./img/retrocinema.jpg" }" alt="${title}" class="movie-img">

            <div class="infos">
                <h3>${title}</h3>
                <span class="${voteColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        
        main.appendChild(movieDiv);
    });
};



function voteColor(vote) {
    return (vote >= 8)? "rating-color-green": (vote >=5)? "rating-color-yellow" : "rating-color-red";
};



search_form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (search_input.value.trim().length === 0) {
        search_form.setAttribute("disabled", true);
        getMovies(API_URL)
    } else {
        search_form.removeAttribute("disabled");
        getMovies(SEARCH_URL + '&query=' + search_input.value);
    };
});

