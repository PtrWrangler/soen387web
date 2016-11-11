import { combineReducers } from 'redux';
import RoomsReducer from './reducer_rooms';
import UsersReducer from './reducer_users';
import InventoriesReducer from './reducer_inventories';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	form: formReducer,
	rooms: RoomsReducer,
	users: UsersReducer,
	inventories: InventoriesReducer
});

export default rootReducer;
