import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapSection = () => {

	// SET INITIAL STATE
	const [currentZoom, setZoom] = useState(1.5);
	const [currentCenter, setCenter] = useState([0.0015, 31.4779]);

  	useEffect(() => {
	  	mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
	  	const map = new mapboxgl.Map({
	    	container: 'map',
		    style: process.env.REACT_APP_MAPBOX_STYLE,
		    center: currentCenter,
			zoom: currentZoom,
			attributionControl: false
	  	});
	})
	 
  	return (
	    <section id='section-map-wrapper'>
	    	<div id='map'></div>
	    </section>
  	);
  
}

export default MapSection;
