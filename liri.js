// node arguments
var command = process.argv[2];
var value = process.argv[3];

// my require modules
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require('fs');

// keys
var keys = require("./keys.js");
var spClient = new Spotify(keys.spotify);
var client = new Twitter(keys.twitterKeys);

// username for twitter
var params = {
    screen_name: 'brendan_kellams',
    count: 20
}

commands();

// User input for process.argv[3]
function commands() {
    if (command === "movie-this") {
        movie();
    }
    else if (command === "my-tweets") {
        tweet();
    }
    else if (command === "spotify-this-song") {
        song();
    }
    else if (command === "do-what-it-says") {
        doSomething();
    }
    else {
        console.log("I'm sorry, please enter a valid option:\n" + "1. movie-this \n" +
            "2. my-tweets\n" + "3. spotify-this-song\n" + "4. do-what-it-says\n")
    }

}

// Request with OMDB
function movie() {
    var movieNameToken = process.argv.slice(3);
    var movieName = movieNameToken.join('+');
    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieName + "&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {
        var data = JSON.parse(body);
        var rating = data["Ratings"];
        function checkRating(rating) {
            return rating.Source === "Rotten Tomatoes";
        }
        if (!error && response.statusCode == 200) {
            console.log("Title: " + data.Title);
            console.log("Year: " + data.Year);
            console.log("Imdb Rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings.find(checkRating).Value);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
        } else {
            console.log(error);
        }
    });
}

// Spotify
function song(song) {
    var song = process.argv.slice(3);
    var songJoin = song.join(" ").trim();

    spClient.search({ type: 'track', query: songJoin, limit: 1 }, function (error, data) {
        if (!error) {
            var albums = data.tracks.items[0];
            console.log("Artist: " + albums.artists[0].name);
            console.log("Song: " + albums.name);
            console.log("Album: " + albums.album.name);
            console.log("Preview URL: " + albums.preview_url);
        }
        else {
            console.log('error', error);
        }
    });
}

// Twitter
function tweet() {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode == 200) {
            console.log(' ');
            console.log('Last 20 Tweets:')
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
            }
        } else {
            console.log(error);
        }
    });
}

// Grabbing function
function doSomething() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (!error) {
            results = data.split(",");
            song(results[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};




