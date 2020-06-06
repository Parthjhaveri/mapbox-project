// IMPORT AND INITIALIZE EXPRESS
const fetch = require('node-fetch');
var express = require ('express');
const socketIo = require('socket.io');
var app 	= express();
var port 	= 9000;

// CONNECT TO SOCKET IO
const server = app.listen(port);
const io = socketIo(server);


io.on('connection', function(socket){
  	// GET ALL EARTHQUAKES
	fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')

	.then(resp => resp.json())

	.then((json) => {	
		console.log(json);
		socket.emit('all_quakes_event', json);
	})
	.catch(err => console.log(err));
});

// TELL THE SERVER WHAT PORT TO LISTEN TO
console.log(`Server listening in on port ${port}`);
