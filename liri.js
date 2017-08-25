var fs = require("fs");
var moment = require("moment");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

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

  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
    tweets.forEach(function(tweet) {
      var tweetOutput =
        moment(tweet.created_at).format("LLLL") + "\n" + tweet.text + "\n";

      fs.appendFile("log.txt", tweetOutput, function(err) {
        if (err) throw err;
        console.log(tweetOutput);
      });
    });
    }
  });
}

// Spotify

function getSong(request) {
  var spotify = new Spotify({
    id: keys.spotifyKeys.id,
    secret: keys.spotifyKeys.secret
  });

  spotify.search({ type: "track", query: request }, function(err, data) {
    if (!err) {
      var songOutput =
        data.tracks.items[0].album.artists[0].name + "\n" +
        request + "\n" +
        data.tracks.items[0].album.name + "\n" +
        data.tracks.items[0].preview_url + "\n";

      fs.appendFile("log.txt", songOutput, function(err) {
        if (err) throw err;
        console.log(songOutput);
      });
    }
  });
}

// OMDB

function getMovie(request) {
  var omdb = new Omdb({
    api_key: keys.exports.omdbKeys.api_key
  });

  console.log("in function");

  request.get(request, function(err, results) {
    if (!err) {
      results.forEach(function(movie) {
        var movieOutput = [
          JSON.parse(body).title,
          JSON.parse(body).year,
          JSON.parse(body).imdbRating,
          JSON.parse(body).country,
          JSON.parse(body).language,
          JSON.parse(body).plot,
          JSON.parse(body).actors];

        fs.appendFile("log.txt", movieOutput, function(err) {
          if (err) throw err;
          console.log(movieOutput);
        });
      });
    }
  });
}
