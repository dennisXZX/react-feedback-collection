// React stuff
import React from 'react';
import ReactDOM from 'react-dom';
// Redux stuff
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
// React-redux stuff
import { Provider } from 'react-redux';

// import css
import 'materialize-css/dist/css/materialize.min.css';

import App from './components/App';

// TODO remove these when the app is complete
// for testing purpose, so we can test API using axios in browser console
import axios from 'axios';
window.axios = axios;

// create a store for application state
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
	// Provider is a component that makes the store accessible to every component in the app
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));