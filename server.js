'use strict';


/******** dependencies *****/
require('dotenv').config();

const express = require('express');

const cors = require('cors');

const superagent = require('superagent');

const PORT = process.env.PORT || 3000;

const server = express();

server.use( cors() );

/********* Function *********/
server.get('/location', locationHandler);
server.get('/weather', weatherHandler);

/*
Object should look like this:
{
  "search_query": "seattle",
  "formatted_query": "Seattle, WA, USA",
  "latitude": "47.606210",
  "longitude": "-122.332071"
}
 */

function locationHandler(request,response) {
  getLocation(request.query.data)             // Get city input from user
    .then( locationData => response.status(200).json(locationData) );            // To show up the generated data 
} // End of location handler function 

function getLocation(city) {
 
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`

  return superagent.get(url)
    .then( data => {
      // console.log('\n\n\n\n\n\n\n\n data : ', data.header);
      // console.log('data.body : ', data.body);
      return new Location(city, data.body);
    })

} // End of get location function 


function Location(city, data) {
  this.search_query = city;
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;

} // End of location constructor function 

/************** WEATHER **********/ 


function weatherHandler(request,response) {
  getWeather(request.query.data)
    .then( weatherData => response.status(200).json(weatherData) );

} // End of weather handler function 

function getWeather(query) {
  const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${query.latitude},${query.longitude}`;
  console.log('url  : ', url );
  
  return superagent.get(url)
    .then( data => {
      let weather = data.body;
      return weather.daily.data.map( (day) => {
        return new Weather(day);
      });
    });
}// End of get weather function 

function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1022.1).toDateString();
} // End of weather constructor function 

// When an error happens ...
let errorobject = {status : 500 ,  responseText : 'Sorry, something went wrong'};
server.use('*', (request, response) =>{
  response.status(404).send(Object.entries(errorobject));
});


server.listen( PORT, () => console.log('hello world, from port', PORT));