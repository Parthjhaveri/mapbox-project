import reducers from './reducers';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

const store = createStore(
	reducers,
	applyMiddleware(thunk)
);

export default store;