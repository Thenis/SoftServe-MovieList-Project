let movieList = (function () {
    let movies = new Map();
    let counter = 0;

    return{
        addMovie: (item) => {
            movies.set(counter, item);
            counter++;
            },
        deleteMovie: (item) => movies.delete(item),
        toString:() => console.log(movies.values()),
        mapKeys: () => console.log(movies.keys())
    }
})();

function addMovie() {
    let movieName = document.getElementById("movie-input").value;

    movieList.addMovie({movieName: movieName, date: Date.now(), watched: false, rating: "Not rated"});
    //console.log(getDate);
    //console.log(movieName);
    movieList.toString();
    movieList.mapKeys();
}

/*movieList.addMovie({name: "GOT"});
movieList.addMovie({name: "Batman"});
movieList.addMovie({name: "Star wars"});*/
