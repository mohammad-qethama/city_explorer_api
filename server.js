'use strict';

const express = require( 'express' );
const server = express();
const cors = require( 'cors' );
const superagent = require( 'superagent' );
const pg = require( 'pg' );
let cityArray = [];
require( 'dotenv' ).config();
// console.log( process.env.DATABASE_URL );
const client = new pg.Client( { connectionString: process.env.DATABASE_URL} );


const PORT = process.env.PORT || 5000;
server.use( cors() );
server.get( '/location',locationHandler );
server.get( '/weather', weatherHandler );
server.get( '/parks', parkHandler );
server.get( '/movies' ,movieHandler );
server.get( '/yelp' ,yelpHandler );

// /yelp?search_query=texas&formatted_query=Texas%2C%20USA&latitude=31.81603810000000&longitude=-99.51209860000000&page=1


function locationHandler( req,res ){
  // if( checkDataBase( req,res )){res.send( checkDataBase( req,res )[0] );}
  let cityName = req.query.city;
  let SQL = `SELECT * FROM locations WHERE search_query = '${cityName}' ;`;
  client.query( SQL )
    .then( dataBaseArray =>{
      cityArray = dataBaseArray.rows.filter( a=> {
        if ( a.search_query === cityName ){ return 1;}
      } );

      if ( cityArray.length ){
        res.send( cityArray[0] );}else{


        let locationObjects;

        let key = process.env.LOCATION_KEY;
        let url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${cityName}&format=json`;
        // console.log( url );

        superagent.get( url )
          .then( locationData => {
          // console.error( locationData );
            locationObjects = new Geolocation( cityName,locationData.body[0] );

            let SQL = 'INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES ($1,$2,$3,$4) RETURNING *;';
            let safeValues = [locationObjects.search_query,locationObjects.formatted_query,locationObjects.latitude,locationObjects.longitude];
            client.query( SQL ,safeValues ).then( result=>{
              res.send( result.rows[0] );

            } );



          } );
      }
    } );

}


// let weatherData = require( './data/weather.json' );

function weatherHandler ( req,res ) {
  let key = process.env.WEATHER_KEY ;
  let latWeather = req.query.latitude ;
  let lonWeather = req.query.longitude;
  let urlWeather = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latWeather}&lon=${lonWeather}&key=${key}`;
  // console.log(urlWeather);
  let weatherObjectArray = [];
  superagent.get( urlWeather )
    .then( weather =>{
      // console.log(  weather.body.data );

      weatherObjectArray = weather.body.data.map( element => {return new Weather( element );} );
      // console.log( weatherObjectArray );
      res.send( weatherObjectArray );

    } );
  // weatherObjectArray = weatherData.data.map( element => {return new Weather( element );})



  // res.send( weatherObjectArray );


}


function parkHandler( req,res ){
  let key = process.env.PARK_KEY;
  let cityName = req.query.search_query;
  // console.log( req.query );
  // let cityName = 'seattle';
  let parkHandler = [];
  let filterdList = [];
  let urlPark = `https://developer.nps.gov/api/v1/parks?q=${cityName}&api_key=${key}`;
  // console.log( urlPark );
  superagent.get( urlPark )
    .then( parkData=>{

      let counter = 0;

      parkHandler = parkData.body.data.map( element => {
        counter = counter + 1 ;
        if ( element.entranceFees[0] !== undefined ){
          return new Park ( element );

          // console.log( element.entranceFees[0].cost,  );
        }

        //   return new Park ( element );
        // }



      } );
      // parkHandler.indexOFn( null );

      filterdList = parkHandler.filter( park => park );
      // console.log( filterdList );

      res.send( filterdList );
    } );


}

// Request URL: https://city-explorer-maq.herokuapp.com/movies?search_query=texas&formatted_query=Texas%2C%20USA&latitude=31.81603810000000&longitude=-99.51209860000000&page=1

function movieHandler( req,res ){

  let moviesObjArray = [];
  let cityName = req.query.search_query;

  let key = process.env.MOVIE_KEY;

  let URLMovies = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}`;

  superagent.get( URLMovies )
    .then( data =>{

      let dataFiltered = data.body.results;
      // console.log( dataFiltered );
      moviesObjArray = dataFiltered.map( element =>{
        return new Movie( element );
      } );
      res.send( moviesObjArray );

    } );

}

function yelpHandler( req,res ) {
  let cityName = req.query.search_query;
  let page = req.query.page;
  const dataPerPage = 5;
  const start = ( ( page - 1 ) * dataPerPage + 1 ) ;
  const apiKey = process.env.YELP_KEY;

  let url = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${cityName}&limit=${dataPerPage}&offset=${start}`;
  // const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=47.6062&longitude=122.3321`;

  // superagent.get( url ).set( 'Authorization',`Bearer ${apiKey}` )
  superagent.get( url ).set( 'Authorization', `Bearer ${apiKey}` )
    .then( dataYelp =>{
      let businessesObject = dataYelp.body.businesses.map( element =>{
        return new Yelp( element );
      } );
      res.send( businessesObject );

    } ).catch( error=>{
      console.error( error );}
    );






}




function Weather( retrievedData ){
  this.forecast = retrievedData.weather.description;
  this.time = new Date ( retrievedData.datetime ).toString().slice( 0,15 );
}

function Geolocation( cityQuery,retrievedData ){
  this.search_query = cityQuery ;
  this.formatted_query = retrievedData.display_name;
  this.latitude = retrievedData.lat;
  this.longitude = retrievedData.lon;

}

// "name": "Klondike Gold Rush - Seattle Unit National Historical Park",
// "address": "319 Second Ave S., Seattle, WA 98104",
// "fee": "0.00",
// "description": "Seattle flourished during and after the Klondike Gold Rush. Merchants supplied people from around the world passing through this port city on their way to a remarkable adventure in Alaska. Today, the park is your gateway to learn about the Klondike Gold Rush, explore the area's public lands, and engage with the local community.",
// "url": "https://www.nps.gov/klse/index.htm"
// },
// {
// "name": "Mount Rainier National Park",
// "address": "55210 238th Avenue East, Ashford, WA 98304",
// "fee": "0.00",
// "description": "Ascending to 14,410 feet above sea level, Mount Rainier stands as an icon in the Washington landscape. An active volcano, Mount Rainier is the most glaciated peak in the contiguous U.S.A., spawning five major rivers. Subalpine wildflower meadows ring the icy volcano while ancient forest cloaks Mount Rainier’s lower slopes. Wildlife abounds in the park’s ecosystems. A lifetime of discovery awaits.",
// "url": "https://www.nps.gov/mora/index.htm"
// },
function Park( parkData ){
  this.name = parkData.fullName;
  this.address = `${parkData.addresses[0].line1} ${parkData.addresses[0].line2} ${parkData.addresses[0].line3},${parkData.addresses[0].city},${parkData.addresses[0].stateCode } ${parkData.addresses[0].postalCode }`;
  this.fee = parkData.entranceFees[0].cost ;
  this.description = parkData.description;
  this.url = parkData.url;


}

function Movie( data ){
  this.title = data.original_title ;
  this.overview = data.overview;
  this.average_votes = data.vote_average;
  this.total_votes = data.vote_count;
  this.popularity = data.popularity;
  this.released_on = data.release_date;

}

function Yelp( data ){
  this.name = data.name;
  this.image_url = data.image_url;
  this.price = data.price;
  this.rating = data.rating;
  this.url = data.url;
}

server.get( '/',( req,res )=>{
  res.send( 'you server is working' );
} );


server.get( '*',( req,res ) =>{

  let errObj = {
    status: 500,
    responseText: 'Sorry, something went wrong'
  };
  res.status( 500 ).send( errObj );

} );



client.connect()
  .then( () => {
    server.listen( PORT ,() => {

      console.log( `I am listing on PORT ${PORT}` );
    } );
  } );
