import axios from 'axios';

export const LOGIN = "LOGIN";
export const CREATE_RESOURCES = "CREATE_RESOURCES";
export const FETCH_ROOMS = "FETCH_ROOMS";
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_INVENTORY = "FETCH_INVENTORY";
export const FETCH_MY_EVENTS = "FETCH_MY_EVENTS";

const ROOT_URL = "http://localhost:8000"

export function login(props) {
	const request = axios.post(`${ROOT_URL}/login`, props);

	return {
		type: LOGIN,
		payload: request
	};
}

export function createEvent(props) {
	const request = axios.post(`${ROOT_URL}/${props.resourceName}/${props.resourceId}`, props);

	return {
		type: CREATE_RESOURCES,
		payload: request
	}
}

export function fetchRooms() {
	const request = axios.get(`${ROOT_URL}/rooms`);

	return {
		type: FETCH_ROOMS,
		payload: request
	}
}

export function fetchUsers() {
	const request = axios.get(`${ROOT_URL}/users`);

	return {
		type: FETCH_USERS,
		payload: request
	}
}

export function fetchInventory() {
	const request = axios.get(`${ROOT_URL}/inventory`);

	return {
		type: FETCH_INVENTORY,
		payload: request
	}
}

export function fetchMyEvents() {
	const request = axios.get(`${ROOT_URL}/myEvents/${id}`);

	return {
		type: FETCH_MY_EVENTS,
		payload: request
	}
}