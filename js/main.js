window.onload = function () {
    document.getElementById("table").style.display = "none";
    document.getElementById("movie-form").style.display = "none";

    showView("home-page");

    document.getElementById("home").addEventListener("click", function () {
        showView("home-page");
    });

    document.getElementById("lists").addEventListener("click", function () {
        showView("lists-page");
        listAllLists();
    });

    document.getElementById("add-list").addEventListener("click", function () {
        showView("add-list-form");
    });

    movieListManipulator.addList({name: "Favourites", movies:{}});
    movieListManipulator.addList({name: "Must watch", movies: {}});
    movieListManipulator.addMovieToList(0, {name: "Batman"});
    movieListManipulator.addMovieToList(0, {name: "Iron Man"});
    movieListManipulator.addMovieToList(1, {name: "Superman"});


};

function showView(view) {
    let sections = document.getElementsByTagName("section");

    for (let section of sections) {
        section.style.display = "none";
    }

    document.getElementById(view).style.display = "";

}

let movieListManipulator = (function () {
    let lists = {};
    let id = 0;

    return {
        addList: (list) => {
            lists[id] = list;
            id++;
        },
        getLists: () => lists,
        addMovieToList: (listId, movie) => {
            lists[listId]["movies"][id] = movie;
            id++;
        },
        deleteMovie: (listId, movieId) => delete lists[listId]["movies"][movieId],

    }


})();

function addList() {
    let listInput = document.getElementById("list-input").value;

    movieListManipulator.addList({name: listInput , movies:{}});

    console.log(movieListManipulator.getLists());
}

function listAllLists() {
    let target = document.getElementById("target-location"); // location of where the lists will be appended

    target.innerHTML = ""; // clear the target of children elements

    let listObj = movieListManipulator.getLists();

    for (let listKey in listObj){
        if(listObj.hasOwnProperty(listKey)){
            let gridDiv = document.createElement("div");
            gridDiv.className = "col-sm-6";

            let cardDiv = document.createElement("div");
            cardDiv.className = "card";

            let cardBlockDiv = document.createElement("div");
            cardBlockDiv.className = "card-block center-block";

            let cardTitle = document.createElement("h3");
            cardTitle.className = "card-title text-center";

            let linkElement = document.createElement("a");
            linkElement.setAttribute("href", "#");
            linkElement.innerText = listObj[listKey].name;

            cardTitle.appendChild(linkElement);

            cardBlockDiv.appendChild(cardTitle);

            cardDiv.appendChild(cardBlockDiv);

            gridDiv.appendChild(cardDiv);

            target.appendChild(gridDiv);

        }
    }
}


/*let movieListManipulator = (function () {
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
 })();*/

function listMovies() {
    let tbody = document.getElementById("movie-list");

    tbody.innerHTML = ""; // clear table child elements

    let movieObj = movieListManipulator.getMovies();

    for (let key in movieObj) {
        if (movieObj.hasOwnProperty(key)) {

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