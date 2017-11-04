// var fs = require('fs');
var keys = require("./keys.js");
// var request = require('request');
var Spotify = require('node-spotify-api');
// var twitter = require('twitter');
var spClient = new Spotify(keys.spotify);
// var twClient = new Twitter(keys.twitterKeys);




var command = process.argv[2];
var value = process.argv[3];

// if (command === "movie-this") {
//     movie();
// }
// else if (command === "my-tweets") {
//     tweet();
// }
 if (command === "spotify-this-song") {
    song();
}
// else if (command === "do-what-it-says") {
//     grab();
// }
// else {
//     console.log("I'm sorry, please enter a valid option:\n" + "1. movie-this \n" +
//         "2. my-tweets\n" + "3. spotify-this-song\n" + "4. do-what-it-says\n")
// }

// Request with OMDB
// function movie() {
//     var movieNameToken = process.argv.slice(3);
//     var movieName = movieNameToken.join('+');
//     request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieName + "&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {
//         var data = JSON.parse(body);
//         var rating = data["Ratings"];
//         function checkRating(rating) {
//             return rating.Source === "Rotten Tomatoes";
//         }
//         if (!error && response.statusCode == 200) {
//             console.log("Title: " + data.Title);
//             console.log("Year: " + data.Year);
//             console.log("Imdb Rating: " + data.imdbRating);
//             console.log("Rotten Tomatoes Rating: " + data.Ratings.find(checkRating).Value);
//             console.log("Country: " + data.Country);
//             console.log("Language: " + data.Language);
//             console.log("Plot: " + data.Plot);
//             console.log("Actors: " + data.Actors);
//         } else {
//             console.log(error);
//         }
//     });
// }

// Spotify
function song() {
    var song = process.argv.slice(3);
    var songJoin = song.join(" ");
    spClient.search({ type: 'track', query: songJoin, limit: 1 }, function (error, data, body) {
        if (!error && data.statusCode == 200) {
            jsonBody = JSON.parse(data);
            console.log('success', data);
            console.log(body);

        } else {
            console.log('error', error);
        }
    });
        
} 
// end spotifyThis function








// var twitter = require('twitter');
// var T = new twitter(twitterKeys);

// var commands = process.argv[2];

// var params = { screen_name: "brendan_kellams", count: 20 };
// T.get('statuses/user_timeline', params, function (error, tweets, response) {
//     if (!error) {
//         console.log(tweets);
//     } else {

//     }
// });
// var request = require('request');
// var spotify = require('node-spotify-api');

