const apiKey = "87cdafe12d9bdca68ba01c573e34376f";
let query = "Gotham";
let result = $.ajax({
	method: "GET",
	url: "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey +"&language=en-US&indexes=movies,tv_shows/movie,tv_show&query=" + query,
	dataType: "JSON"
});

console.log(result);