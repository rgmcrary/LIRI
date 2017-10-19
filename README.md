# Liri

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will is a command line node app that takes in parameters and gives you back data.

## LIRI Functions

### node liri.js my-tweets

* LIRI will display the last 20 tweets and when they were created at in your terminal/bash window.


### node liri.js spotify-this-song "song name here"

* This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

* If no song is provided then your program will default to "The Sign" by Ace of Base.


## node liri.js movie-this "movie name here"

* This will output the following information to your terminal/bash window:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.



## Built With

* Express.js
* JavaScript
* Moment.js
* Node.js
* Twitter API
* Spotify API
* OMDB API
