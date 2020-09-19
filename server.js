require('./config');
const MongoClient = require('mongodb').MongoClient;

// IMPORT AND INITIALIZE EXPRESS
const fetch = require('node-fetch');
var express = require ('express');
const socketIo = require('socket.io');
var app 	= express();
var port 	= 9000;

// CONNECT TO SOCKET IO
const server = app.listen(port);
const io = socketIo(server);

// MONGO CONNECTION STRING
const mongoUrl = process.env.MONGO_URL;

// CONNECT TO MONGO DB USING MONGO CLIENT
MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  
  	// DATABASE AND COLLECTION
  	const db = client.db('earthquake_alert');

	/* 
		ALL QUAKES PAST HOUR: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson
		MAG 4.5+ PAST HOUR: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.geojson
		MAG 2.5+ PAST HOUR: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson
		MAG 1.0+ PAST HOUR: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson
	*/

	io.on('connection', function(socket){

		setInterval(() => {			
			// GET ALL EARTHQUAKES
			fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')

			.then(resp => resp.json())

			.then((json) => {
				// console.log(json);

				// PUSH UNIQUE QUAKES TO DATABASE
				const eq_collection = db.collection('quake_collection');

				json.features.forEach((el, idx) => {

					// SET AN INDEX FOR THE 'ID' FIELD SO THAT IT CAN BE UNIQUE
					eq_collection.createIndex({id: 1}, {unique: true})		
					try {
						eq_collection.insertMany(json.features); // INSERT ONLY UNIQUE QUAKES
					} catch(e) {
						console.log(e);
					}
				});

			})
			.catch(err => console.log(err));		

		}, 5000);

		setInterval(() => {
			// GET UNIQUE QUAKES FROM DATABASE AND SEND TO FRONTEND VIA SOCKET		
			const eq_collection = db.collection('quake_collection');

			// eq_collection.find().forEach((indv_quake) => {
			// 	console.log(indv_quake);
			// });

			const latest_earthquakes = eq_collection.distinct('id');
			socket.emit('latest_quakes', latest_earthquakes);	
		}, 6000);
	}); // END SOCKET IO FUNCTION
});

// TELL THE SERVER WHAT PORT TO LISTEN TO
console.log(`Server listening in on port ${port}`);
