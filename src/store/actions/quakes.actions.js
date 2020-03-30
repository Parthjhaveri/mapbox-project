// REDUCERS
import { QuakeReducerActions } from '../reducers/quakes.reducers.js';

export const get_quakes = () => {
	return (dispatch, getState) => {
		// GET ALL EARTHQUAKES
		setTimeout(() => {

			// EVERY 1 MINUTE, EMIT A SOCKET EVENT
			fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')

			.then(resp => resp.json())

			.then((json) => {
				dispatch({
					data: json,
					type: 'GET_ALL_QUAKES'
				});
			})
		}, 1000)
	}
}