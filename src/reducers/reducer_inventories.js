import { FETCH_INVENTORY } from '../actions/index';

const INITIAL_STATE = { all: [], inventories: null };

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_INVENTORY:
			return {...state, all: action.payload.data};
		default:
			return state;
	}
}