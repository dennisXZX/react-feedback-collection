import axios from 'axios';

import { FETCH_USER, FETCH_SURVEYS } from "./types";

/* redux action creator immediately returns an action, which is then dispatched to all reducers. redux-thunk middleware allows us to control when to dispatch an action. When it detects a function is returned from an action creator, it would kick in */
export const fetchUser = () => async (dispatch) => {
	// fetch the user from an API, res.data is the user details we need
	const res = await axios.get('/api/current_user');

	// dispatch the action when the user is successfully fetched
	dispatch({
		type: FETCH_USER,
		payload: res.data
	});
};

export const handleToken = (token) => async (dispatch) => {
	// call the API with the token object returned from StripeCheckout component
	const res = await axios.post('./api/stripe', token);

	dispatch({
		type: FETCH_USER,
		payload: res.data
	});
};

export const submitSurvey = (values, history) => async (dispatch) => {
	const res = await axios.post('/api/surveys', values);

	// direct to another route
	history.push('/surveys');

	dispatch({
		type: FETCH_USER,
		payload: res.data
	});

};

export const fetchSurveys = () => async (dispatch) => {
	const res = await axios.get('/api/surveys');

	dispatch({
		type: FETCH_SURVEYS,
		payload: res.data
	});
};