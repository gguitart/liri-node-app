require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var command = process.argv[2];
var target = process.argv[3];



function song() {
spotify.search({ 
    type: 'track', 
    query: target
},
    function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);

        
    });
}

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + target + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.city);
      console.log(response.data[0].datetime)

    })
    .catch(function (error) {
      console.log(error);
    });

}

switch(command){
    case "spotify-this-song": 
    song()
    break;
    case "concert-this": 
    concert()
    break;
    case "movie-this": 
    movie()
    break;
    case "do-what-it-says": 
    doIt()
    break;

    default: console.log("Please enter a valid command!")
  
}


//need make a switch statment 
//and do the other functions