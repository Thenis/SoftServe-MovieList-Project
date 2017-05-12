window.onload = function () {
    showView("home-page");

    document.getElementById("start-now-btn").addEventListener("click", function () {
        showView("lists-page");
    });

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

    document.getElementById("add-movie").addEventListener("click", function () {
        showView("add-movie-form");
        loadListNamesInSelect();
    });
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

        getListNameById: (id) => lists[id].name,

        addMovieToList: (listId, movie) => {
            lists[listId]["movies"][id] = movie;
            id++;
        },
        deleteMovie: (listId, movieId) => delete lists[listId]["movies"][movieId]
    };
})();

function addList() {
    let listNameInput = document.getElementById("list-input").value;
    let listDescrInput = document.getElementById("list-descr").value;

    console.log(listDescrInput);

    movieListManipulator.addList({name: listNameInput, description: listDescrInput, movies:{}});
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

            let cardListDescription = document.createElement("i");
            cardListDescription.innerText = (listObj[listKey].description === "") ? "No Description" : listObj[listKey].description;

            linkElement.addEventListener("click", function () {
               listMovies(listKey, listObj[listKey].movies); // lists the movies with listId and movies object
            });

            cardTitle.appendChild(linkElement);

            cardBlockDiv.appendChild(cardTitle);
            cardBlockDiv.appendChild(cardListDescription);

            cardDiv.appendChild(cardBlockDiv);

            gridDiv.appendChild(cardDiv);

            target.appendChild(gridDiv);

        }
    }
}

function loadListNamesInSelect() {
    let select = document.getElementById("list-select");
    select.innerHTML = ""; // clear options

    let listNames = movieListManipulator.getLists();

    for (let key in listNames){
        if(listNames.hasOwnProperty(key)){
            let option = document.createElement("option");
            option.value = key;
            option.innerText = listNames[key].name;
            select.appendChild(option);
        }

    }
}

function addMovie() {
    let movieName = document.getElementById("movie-input").value;

    let select = document.getElementById("list-select");
    let listId = select.options[select.selectedIndex].value;

    movieListManipulator.addMovieToList(listId, {name: movieName})
}

function listMovies(listId, movieObj) {
    let tbody = document.getElementById("movie-list");

    tbody.innerHTML = ""; // clear table child elements
    document.getElementById("movie-header").innerText = `Movies in list - ${movieListManipulator.getListNameById(listId)}`;

    for (let key in movieObj) {
        if (movieObj.hasOwnProperty(key)) {

            let tr = document.createElement("tr");

            let tdMovie = document.createElement("td");

            let tdUpDown = document.createElement("td");

            let tdDeleteButton = document.createElement("td");

            let deleteButton = document.createElement("button");
            deleteButton.innerText = "Remove";
            deleteButton.className = "btn btn-sm btn-danger";

            let upSpan = document.createElement("span");
            let downSpan = document.createElement("span");
            upSpan.className = "glyphicon glyphicon-arrow-up";
            downSpan.className = "glyphicon glyphicon-arrow-down";

            deleteButton.onclick = function () {
                movieListManipulator.deleteMovie(listId, key);

                this.parentNode.parentNode.remove();
            };

            tdDeleteButton.appendChild(deleteButton);

            tdMovie.innerText = movieObj[key].name;
            tr.id = key;
            tdUpDown.appendChild(upSpan);
            tdUpDown.appendChild(downSpan);

            tr.appendChild(tdMovie);
            tr.appendChild(tdUpDown);
            tr.appendChild(tdDeleteButton);
            tbody.appendChild(tr);

            showView("movie-page");
        }
    }
}