import { FETCH_ROOMS } from '../actions/index';

const INITIAL_STATE = {all: [], roomType: null}

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_ROOMS:
			return {...state, all: action.payload.data};
		default:
			return state;
	}
}