import { FETCH_USERS } from '../actions/index';

const INITIAL_STATE = { all: [], users: null };

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_USERS:
			return {...state, all: action.payload.data};
		default:
			return state;
	}
}