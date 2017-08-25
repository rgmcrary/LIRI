var fs = require("fs");
var moment = require("moment");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
// const OMDBAPI = require("omdbapi");

var keys = require("./keys.js");

var inputType = process.argv[2];
var entries = process.argv.slice(3);
var request = entries.join(" ");

if (inputType === "my-tweets") {
  getTweets();
} else if (inputType === "spotify-this-song") {
  if (request === "") {
    getSong("Ace of Base, The Sign");
  } else {
    getSong(request);
  }
} else if (inputType === "movie-this") {
  if (request === "") {
    getMovie("Mr. Nobody");
  } else {
    getMovie(request);
  }
} else {
}

// Twitter

function getTweets() {
  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  var params = {
    screen_name: "Liri Bootcamp Homework",
    count: 20,
    result_type: "recent"
  };



  client.get(
    "statuses/user_timeline",
    params,
    function(error, tweets, response) {
      if (!error) {
        tweets.forEach(function(tweet) {
          var output = moment(tweet.created_at).format("LLLL") + "\n" + tweet.text + "\n";
          fs.appendFile("log.txt", output, function(err) {
            if (err) throw err;
            console.log(
              output
            );
          });
        });
      }
    },
    // Spotify

    function getSong(request) {
      var spotify = new Spotify({
        id: keys.spotifyKeys.id,
        secret: keys.spotifyKeys.secret
      });

      spotify.search({ type: "track", query: request }, function(err, data) {
        if (err) {
          console.log("Error occurred: ", err);
        } else console.log(data.tracks.items[0].album.artists[0].name);
        console.log(request);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].preview_url);
      });
    },
    // OMDB

    function getMovie(request) {
      var omdb = new omdb({
        api_key: keys.exports.omdbKeys.api_key
      });
      console.log("in function");

      omdb.search(request, function(results) {
        if (err) {
          console.log("Error occurred: ", err);
        } else {
          console.log(JSON.parse(body).title);
          console.log(JSON.parse(body).year);
          console.log(JSON.parse(body).imdbRating);
          console.log(JSON.parse(body).country);
          console.log(JSON.parse(body).language);
          console.log(JSON.parse(body).plot);
          console.log(JSON.parse(body).actors);
        }
      });
    }
  );
}
