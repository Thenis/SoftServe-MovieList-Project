window.onload = function () {
    document.getElementById("table").style.display = "none";
    document.getElementById("movie-form").style.display = "none";

    document.getElementById("home").addEventListener("click", function () {
        showHomeView();
    });


};

function showView(view) {
    let sections = document.getElementsByTagName("section");

    for(let section of sections){
        section.style.display = "none";
    }

    document.getElementById(view).style.display = "";

}

function showHomeView() {
    showView("home-page");
}


let movieListManipulator = (function () {
    let movies = {};
    let id = 0;

    return {
        addMovie: (item) => {
            movies[id] = item;
            id++;
        },
        deleteMovie: (key) => delete movies[key],
        toString: () => console.log(movies),
        mapKeys: () => console.log(Object.keys(movies)),
        getMovies: () => movies // returns movies
    }
})();

function listMovies() {
    let tbody = document.getElementById("movie-list");

    tbody.innerHTML = ""; // clear table child elements

    let movieObj = movieListManipulator.getMovies();

    for(let key in movieObj){
        if(movieObj.hasOwnProperty(key)){

            let tr = document.createElement("tr");
            let tdMovie = document.createElement("td");
            let tdRating = document.createElement("td");
            let tdDeleteButton = document.createElement("td");
            let deleteButton = document.createElement("button");
            deleteButton.innerText = "Remove";
            deleteButton.className = "btn btn-sm btn-danger";

            deleteButton.onclick = function () {
                let id = this.parentNode.parentNode.id;

                movieListManipulator.deleteMovie(id);

                this.parentNode.parentNode.remove();

                movieListManipulator.mapKeys();
            };

            tdDeleteButton.appendChild(deleteButton);

            tdMovie.innerText = movieObj[key].movieName;
            tdRating.innerText = movieObj[key].rating;
            tr.id = key;

            tr.appendChild(tdMovie);
            tr.appendChild(tdRating);
            tr.appendChild(tdDeleteButton);
            tbody.appendChild(tr);


            console.log(`${key} = ${movieObj[key].movieName}`);
            movieListManipulator.mapKeys();
        }
    }


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
