var express = require("express");
var parser = require("body-parser");
var request = require("request");

var app = express();
app.use(express.static("assests"));
app.use(parser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var data = {Search: []};
app.get("/", function(req, res){
	res.render("index", { movies: data["Search"]});
});

app.get("/results", function(req, res){
	var query = req.query.search;
	console.log(query);
	var url = "http://omdbapi.com/?apikey=thewdb&s=" + query;
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			data= JSON.parse(body);
			res.redirect("/");
		}
	});
});

app.listen(3000, "127.0.0.1", function(event){
	console.log("server started at 3000");
});
