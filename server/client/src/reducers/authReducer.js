import { FETCH_USER } from "../actions/types";

/*
AuthReducer state

null - the app does not know what's up right now, such as user data is being fetched
user model - user has already logged in
false - user isn't logged in
*/
export default function (state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			// if action.payload is an empty string, return false
			// using Javascript short circuit feature
			return action.payload || false;
		default:
			return state;
	}
}