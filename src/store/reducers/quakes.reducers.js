const initial_state = {
	geojson: {},
	quakes: []
}

const quakes_reducer = (state = initial_state, action) => {
	console.log(action);
	switch(action.type) {
		case 'GET_ALL_QUAKES':
			return {
				...state,
				quakes: action.data
			}
		default:
			return state;
	}
}

export default quakes_reducer;