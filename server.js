'use strict';

const express = require( 'express' );
const server = express();
const cors = require( 'cors' );
const PORT = process.env.PORT || 5000;


require( 'dotenv' ).config();
server.use( cors() );

server.get( '/location',( req,res ) => {
  let locationObjects;
  let locationData = require( './data/location.json' );
  locationData.forEach( element => {
    locationObjects = new Geolocation( element );

  } );

  res.send( locationObjects );

  //   {
  //     "search_query": "seattle",
  //     "formatted_query": "Seattle, WA, USA",
  //     "latitude": "47.606210",
  //     "longitude": "-122.332071"
  //   }



} );

function Geolocation( retrievedData ){
  this.search_query = retrievedData.display_name.split( ',' )[0] ;
  this.formatted_query = retrievedData.display_name;
  this.latitude = retrievedData.lat;
  this.longitude = retrievedData.lon;

}

server.get( '/weather',( req,res )=> {
  let weatherObjectArray = [];
  let weatherData = require( './data/weather.json' );
  weatherData.data.forEach( element => {
    let elmentObject = new Weather( element );
    weatherObjectArray.push( elmentObject );


  } );
  res.send( weatherObjectArray );


} );


function Weather( retrievedData ){
  this.forecast = retrievedData.weather.description;
  this.time = retrievedData.valid_date;
}


// [
//     {
//       "forecast": "Partly cloudy until afternoon.",
//       "time": "Mon Jan 01 2001"
//     },
//     {
//       "forecast": "Mostly cloudy in the morning.",
//       "time": "Tue Jan 02 2001"
//     },
//     ...
//   ]
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
