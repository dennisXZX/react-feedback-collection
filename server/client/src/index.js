// React stuff
import React from 'react';
import ReactDOM from 'react-dom';
// Redux stuff
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
// React-redux stuff
import { Provider } from 'react-redux';

import App from './components/App';

const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
	// Provider is a component that makes the store accessible to every component in the app
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));