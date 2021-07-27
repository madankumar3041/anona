import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import homeReducer from './home/homeReducer';

let middleware = [thunk];

const rootReducer = combineReducers({
	home: homeReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
