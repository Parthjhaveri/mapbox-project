import {combineReducers} from 'redux';
import quakes_reducer from './quakes.reducers.js';

const reducers = combineReducers({
	earthquakes: quakes_reducer
});

export default reducers;