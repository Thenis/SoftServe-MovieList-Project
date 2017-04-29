let movieListManipulator = (function () {
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
        getMovies: () => {return movies} // returns movies
    }
})();

function listMovies() {
    let tbody = document.getElementById("movie-list");

    tbody.innerHTML = "";// clear table child elements


    movieListManipulator.getMovies().forEach(function (value, key) {
        let tr = document.createElement("tr");
        let tdMovie = document.createElement("td");
        let tdRating = document.createElement("td");
        let tdDeleteButton = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Remove";

        deleteButton.onclick = function () {
            this.parentNode.parentNode.remove();
        };

        tdDeleteButton.appendChild(deleteButton);

        tdMovie.innerText = value.movieName;
        tdRating.innerText = value.rating;

        tr.appendChild(tdMovie);
        tr.appendChild(tdRating);
        tr.appendChild(tdDeleteButton);
        tbody.appendChild(tr);


        console.log(`${key} = ${value.movieName}`)


    });




}

function addMovie() {
    let movieName = document.getElementById("movie-input").value;

    movieListManipulator.addMovie({movieName: movieName, date: Date.now(), watched: false, rating: "-"});
    //console.log(getDate);
    //console.log(movieName);
    movieListManipulator.toString();
    /*movieListManipulator.mapKeys();*/
    listMovies();
}

/*movieListManipulator.addMovie({name: "GOT"});
 movieListManipulator.addMovie({name: "Batman"});
 movieListManipulator.addMovie({name: "Star wars"});*/
