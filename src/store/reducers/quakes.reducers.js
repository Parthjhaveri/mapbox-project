const initial_state = {	
	quakes: []
}

const quakes_reducer = (state = initial_state, action) => {		
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