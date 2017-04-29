let movieList = (function () {
    let movies = new Map();
    let counter = 0;

    return{
        addMovie: (item) => {
            movies.set(counter, item);
            counter++;
            },
        deleteMovie: (key) => movies.delete(key),
        toString:() => console.log(movies.values()),
        mapKeys: () => console.log(movies.keys()),
        getMovies: () => {
            return movies;
        }
    }
})();

function listMovies() {
    let tbody = document.getElementById("movie-list");

    tbody.innerHTML = "";// clear table child elements


    movieList.getMovies().forEach(function (value, key) {
        let tr = document.createElement("tr");
        let tdMovie = document.createElement("td");
        let tdRating = document.createElement("td");

        tdMovie.innerText = value.movieName;

        tr.appendChild(tdMovie);
        tbody.appendChild(tr);


        console.log(`${key} = ${value.movieName}`)


    });




}

function addMovie() {
    let movieName = document.getElementById("movie-input").value;

    movieList.addMovie({movieName: movieName, date: Date.now(), watched: false, rating: "Not rated"});
    //console.log(getDate);
    //console.log(movieName);
   /* movieList.toString();
    movieList.mapKeys();*/
    listMovies();
}

/*movieList.addMovie({name: "GOT"});
movieList.addMovie({name: "Batman"});
movieList.addMovie({name: "Star wars"});*/
