var fs = require("fs");
var moment = require("moment");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var omdbRequest = require("request");

var keys = require("./keys.js");

var inputType = process.argv[2];
var entries = process.argv.slice(3);
var request = entries.join(" ");

handleInput(inputType, request);

function handleInput(inputType, request) {
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
}

// Log Out Results

function logResults(output) {
  fs.appendFile("log.txt", output, function(err) {
    if (err) throw err;
    console.log(output);
  });
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
        var output =
          moment(tweet.created_at).format("LLLL") + "\n" + tweet.text + "\n\n";

        logResults(output);
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
      var output =
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
        "\n\n";

      logResults(output);
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
      var output =
        "Title: " +
        movieObj.Title +
        "\n" +
        "Year: " +
        movieObj.Year +
        "\n" +
        "IMDB Rating: " +
        movieObj.Ratings[0].Value +
        "\n" +
        "Rotten Tomatoes Rating: " +
        movieObj.Ratings[1].Value +
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
        movieObj.Actors +
        "\n\n";

      logResults(output);
    }
  });
}

//  Do What It Says

function doWhatitSays() {
  fs.readFile("random.txt", function read(err, data) {
    if (err) {
      throw err;
    }

    var lines = data.toString("utf-8").split("\n");

    var randLine = lines[Math.floor(Math.random() * lines.length)];

    var lineArray = randLine.split(",");

    handleInput(lineArray[0], lineArray[1]);
  });
}
