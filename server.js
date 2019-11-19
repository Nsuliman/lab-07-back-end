'use strict';

// DOTENV (Read our Environment Variables) -- UpperCase
require('dotenv').config();

// Express Server
// Express does all the headers (envelope stuff)
const express = require('express');

// CORS = Cross Origin Resource Sharing
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const server = express();

server.use( cors() );

// Home Route (http://localhost:3000/)
server.get('/', (request, response) => {
  console.log(request);
  response.status(200).send('You did a great job');
});

/*
Object should look like this:
{
  "search_query": "seattle",
  "formatted_query": "Seattle, WA, USA",
  "latitude": "47.606210",
  "longitude": "-122.332071"
}
//  */
// server.get('/location', (request, response) => {
//   const locationData = require('./data/geo.json');
//   const location = new Location(locationData);
//   response.status(200).json(location);
// });

// function Location( data ) {
//   this.search_query = 'lynnwood';
//   this.formatted_query = data.results[0].formatted_address;
//   this.latitude = data.results[0].geometry.location.lat;
//   this.longitude = data.results[0].geometry.location.lng;
// }

// // /weather route
// server.get('/weather', (request, response) => {
//   const weatherData = require('./data/darksky.json');
//   // const weather = new Weather(weatherData);
//   // console.log(weatherData.timezone);
//   response.status(200).json(locWeather(weatherData.daily.data));
// });


// // Weather()
// let weatherArray = [];
// function Weather( data ) {

//   console.log('data : ', data);

//   this.forcast = data.summary;
//   this.time = new Date(data.time*1022.1).toDateString();
// }

// function locWeather(array)
// {

//   /*  First Way */
//   // for (let i=0;i<array.length;i++)
//   // {
//   //   console.log('arr[i] : ', array[i]);
//   //   // console.log('  Hellllllllllllllllllllo \n\n\n\n\n\n\n\n' ,data.daily.data[0].summary);
    
//   //     // this.forcast = this.data.daily.data[i].summary;
//   //     // console.log('  Forcattttttttttttttttttttttttttttttttttttttttt' ,array[i].summary);

//   //     // this.time = this.data.daily.data[i].time;
//   //     // console.log('  timmmmmmmmmmmmmmmmmmmmmmmmmmmmmmme ' ,array[i].time);

//   //     weatherArray.push(new Weather(array[i]));
//   //     // console.log('  arraaaaaaaaaaaaaaaaaaaaaaaay ' ,weatherArray);
//   // }

//     /*  second Way */

//     array.forEach(element => {
//     // this.forcast = element.summary;
//     // this.time = element.time;
//     weatherArray.push(new Weather(element))
//   });

// return weatherArray;
// };

// // Force an Error to Happen (http://localhost:3000/boo)
// server.get('/boo', (request,response) => {
//   throw new Error('Whoops');
// });

// // When an error happens ...

// let errorobject = {status : 500 ,  responseText : 'Sorry, something went wrong'};
// server.use('*', (request, response) =>{
//   response.status(404).send(Object.entries(errorobject));
// });
// // server.use( '/error', (request, response) => {
// //   response.status(500).send('saihkksfksns');
// // });


server.listen( PORT, () => console.log(`App listening on ${PORT}`));