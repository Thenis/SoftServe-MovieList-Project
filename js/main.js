$(function(){

    showView("home-page");

    $("#start-now-btn").click(function(){
        showView("add-list-form");
    });

    $("#home").click(function() {
        showView("home-page");
    });

    $("#lists").click(function () {
        showView("lists-page");
        listAllLists();
    });

    $("#add-list").click(function () {
        showView("add-list-form");
    });

    $("#add-movie").click(function () {
        showView("add-movie-form");
        loadListNamesInSelect();
    });
});


function showView(view) {
    let sections = $("section");

    sections.hide();

    $("#" + view).show();
}

function showMsg(msg, type) {
    let alert;

    if (type === "success") {
        alert = $("#success-alert");
    } else {
        alert = $("#error-alert");
    }

    alert
        .text(msg) // append msg
        .show(); // show it


    setTimeout(() => {
        alert.fadeOut();
    }, 2000); // alert fades out after 2s
}

function checkObjIfEmpty(obj) {
    if (Object.keys(obj).length === 0) {
        return true;
    }

    return false;
}

let movieListManipulator = (function() {
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
    let listNameInput = $("#list-input").val();
    let listDescrInput = $("#list-descr").val();

    movieListManipulator.addList({
        name: listNameInput,
        description: listDescrInput,
        movies: {}
    });

    showMsg("List successfully added!", "success");
}

function listAllLists() {
    let target = $("#target-location"); // location of where the lists will be appended

    let listObj = movieListManipulator.getLists();

    if (checkObjIfEmpty(listObj)) {
        return;
    }

    target.empty(); // clear child elements

    for (let listKey in listObj) {
        if (listObj.hasOwnProperty(listKey)) {
            let gridDiv = $("<div>").addClass("col-sm-6");

            let cardDiv = $("<div>").addClass("card");

            let cardBlockDiv = $("<div>").addClass("card-block center-block");

            let cardTitle = $("<h3>").addClass("card-title text-center");

            let linkElement = $("<a>")
                                    .attr("href", "#")
                                    .text(listObj[listKey].name);

            let cardListDescription = $("<i>")
                                        .text((listObj[listKey].description === "") ? "No Description" : listObj[listKey].description); // checks if the is a description. If there isn't it displays "No description"

            linkElement.click(function () {
                if (checkObjIfEmpty(listObj[listKey].movies)) {
                    showMsg("No movies available in selected list.");
                } else {
                    listMovies(listKey, listObj[listKey].movies); // lists the movies with listId and movies object
                }
            });

            cardTitle.append(linkElement);

            cardBlockDiv.append(cardTitle);
            cardBlockDiv.append(cardListDescription);

            cardDiv.append(cardBlockDiv);

            gridDiv.append(cardDiv);

            target.append(gridDiv);

        }
    }
}

function loadListNamesInSelect() {
    let select = $("#list-select");

    let listNames = movieListManipulator.getLists();

    if (checkObjIfEmpty(listNames)) {
        return;
    }

    select.empty(); // empties all the its children

    for (let key in listNames) {
        if (listNames.hasOwnProperty(key)) {
            let option = $("<option>")
                                    .val(key)
                                    .text(listNames[key].name)
                                    .appendTo(select);
        }
    }
}

function addMovie() {
    let movieName = $("#movie-input").val();

    let listId = $("#list-select :selected").val();

    if (listId === "no-lists") {
        showMsg("No lists available.", "error");
        return;
    }

    movieListManipulator.addMovieToList(listId, {
        name: movieName
    })

    showMsg("Movie successfully added!", "success");
}

function listMovies(listId, movieObj) {
    let tbody = $("#movie-list");

    tbody.empty(); // clear table child elements

    $("#movie-header").text(`Movies in list - ${movieListManipulator.getListNameById(listId)}`);

    for (let key in movieObj) {
        if (movieObj.hasOwnProperty(key)) {

            let tr = $("<tr>");

            let tdMovie = $("<td>");

            let tdUpDown = $("<td>");

            let tdDeleteButton = $("<td>");

            let deleteButton = $("<button>")
                                        .text("Remove")
                                        .addClass("btn btn-sm btn-danger")
                                        .click(function () {
                                            movieListManipulator.deleteMovie(listId, key);

                                            $(this).parent().parent().remove();

                                            showMsg("Movie successfully removed!", "success");
                                        });

            let upSpan = $("<span>")
                                .addClass("glyphicon glyphicon-arrow-up")
                                .click(function () {

                                    let tr = $(this).parent().parent();
                                    let previousSibling = tr.prev();
                                    tr.insertBefore(previousSibling);

                                });


            let downSpan = $("<span>")
                                    .addClass("glyphicon glyphicon-arrow-down")
                                    .click(function () {
                                        let tr = $(this).parent().parent();
                                        let nextSibling = tr.next();
                                        tr.insertAfter(nextSibling);
                                    });


            tdDeleteButton.append(deleteButton);

            tdMovie.text(movieObj[key].name);
            tr.attr("id", key);
            tdUpDown.append(upSpan);
            tdUpDown.append(downSpan);

            tr.append(tdMovie);
            tr.append(tdUpDown);
            tr.append(tdDeleteButton);
            tbody.append(tr);

            showView("movie-page");
        }
    }
}