var fs = require("fs");
var moment = require("moment");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var omdbRequest = require("request");

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
  doWhatitSays();
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
    screen_name: "tweeteralias",
    count: 20,
    result_type: "recent"
  };

  client.get("statuses/user_timeline", params, function(err, tweets, response) {
    if (!err) {
      tweets.forEach(function(tweet) {
        var tweetOutput =
          moment(tweet.created_at).format("LLLL") + "\n" + tweet.text + "\n\n";

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
        "Artist: " +
        data.tracks.items[0].album.artists[0].name +
        "\n" +
        "Song Name: " +
        data.tracks.items[0].name +
        "\n" +
        "Album Name: " +
        data.tracks.items[0].album.name +
        "\n" +
        "Preview URL: " +
        data.tracks.items[0].preview_url +
        "\n";

      fs.appendFile("log.txt", songOutput, function(err) {
        if (err) throw err;
        console.log(songOutput);
      });
    }
  });
}

// OMDB

function getMovie(request) {
  var omdbKey = keys.omdbKeys.api_key;

  var omdbUrl = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + request;

  omdbRequest.get(omdbUrl, function(err, results, body) {
    if (!err) {
      var movieObj = JSON.parse(body);
      var movieOutput =
        "Title: " +
        movieObj.Title +
        "\n" +
        "Year: " +
        movieObj.Year +
        "\n" +
        "IMDB Rating: " +
        movieObj.imdbRating +
        "\n" +
        "Country: " +
        movieObj.Country +
        "\n" +
        "Language: " +
        movieObj.Language +
        "\n" +
        "Plot: " +
        movieObj.Plot +
        "\n" +
        "Actors: " +
        movieObj.Actors;

      fs.appendFile("log.txt", movieOutput, function(err) {
        if (err) throw err;
        console.log(movieOutput);
      });
    }
  });
}

//  Do What It Says

function doWhatitSays() {
  var randomArray;
  fs.readFile("random.txt", function read(err, data) {
    if (err) {
      throw err;
    }
    randomArray = data;
   
   fs.appendFile("log.txt", randomArray, function(err) {
    if (err) throw err;
    console.log('test:' + randomArray);
  });
});
}
