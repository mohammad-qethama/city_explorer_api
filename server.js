'use strict';

const express = require( 'express' );
const server = express();
const cors = require( 'cors' );
const superagent = require( 'superagent' );
const states = require( 'us-state-converter' );
const PORT = process.env.PORT || 5000;
require( 'dotenv' ).config();
server.use( cors() );
server.get( '/location',locationHandler );
server.get( '/weather', weatherHandler );
server.get( '/parks', parkHandler );




function locationHandler( req,res ){
  let locationObjects;
  let cityName = req.query.city;
  let key = process.env.LOCATION_KEY;
  let url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${cityName}&format=json`;
  // console.log( url );

  superagent.get( url )
    .then( locationData => {
      // console.error( locationData );
      locationObjects = new Geolocation( cityName,locationData.body[0] );

      res.send( locationObjects );

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
  console.log( req.query );
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




server.listen( PORT ,() => {

  console.log( `I am listing on PORT ${PORT}` );
} );
