const apiKey = "api_key=43d1439860767035d11845aeba6a6738";
const rootApi = "https://api.themoviedb.org/3";
const API_URL = `${rootApi}/discover/movie?sort_by=popularity.desc&${apiKey}`;
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=43d1439860767035d11845aeba6a6738

const IMG_URL = `https://image.tmdb.org/t/p/w500`;
//https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg

const SEARCH_URL = `${rootApi}/search/movie?${apiKey}`;
// https://api.themoviedb.org/3/search/movie?api_key=43d1439860767035d11845aeba6a6738&query=venom

const main = document.querySelector("#main");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

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
            searchInput.value = '';
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



searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (searchInput.value.trim().length === 0) {
        searchForm.setAttribute("disabled", true);
        getMovies(API_URL)
    } else {
        searchForm.removeAttribute("disabled");
        getMovies(SEARCH_URL + '&query=' + searchInput.value);
    };
});

