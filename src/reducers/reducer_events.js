import { FETCH_MY_EVENTS } from '../actions/index';

const INITIAL_STATE = {all: [], events: null}

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_MY_EVENTS:
			return {...state, all: action.payload.data};
		default:
			return state;
	}
}