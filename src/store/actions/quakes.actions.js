// REDUCERS
import { QuakeReducerActions } from '../reducers/quakes.reducers.js';

// LIBRARIES
import moment from 'moment';

export const get_quakes = () => {
	return (dispatch, getState) => {
		// GET ALL EARTHQUAKES
		fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')

		.then(resp => resp.json())

		.then((json) => {
			dispatch({
				data: json,
				type: 'GET_ALL_QUAKES'
			});
		})
	}
}