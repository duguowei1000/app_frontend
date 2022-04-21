import { fetcher } from '../fetcher';
import { BACKEND } from '../utils';
const getHeaders = () => {
	const jwt = getJwt();
	const authHeader = { Authorization: `Bearer ${jwt}` };
	const defaults = {
		'Content-Type': 'application/json',
	};
	return { ...defaults, ...authHeader };
};
function getToken(token) {
	return sessionStorage.getItem(token);
}
function setToken(token, value) {
	sessionStorage.setItem(token, value);
}
function jwtDecode(token) {
	return JSON.parse(atob(token.split('.')[1]));
}
const getJwt = () => getToken('jwt');
const setJwt = (token) => setToken('jwt', token);
const getRefreshToken = () => getToken('refreshToken');
const setRefreshToken = (token) => setToken('refreshToken', token);
export const saveTokens = (tokens) => {
	setJwt(tokens.token);
	setRefreshToken(tokens.refreshToken);
};
export const storageListener = (event) => {
	if (event.key == 'getSessionStorage') {
		// Some tab asked for the sessionStorage -> send it
		localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
		localStorage.removeItem('sessionStorage');
	} else if (event.key == 'sessionStorage' && sessionStorage.length === 0) {
		// sessionStorage is empty -> fill it
		const data = JSON.parse(event.newValue);
		for (const key in data) {
			sessionStorage.setItem(key, data[key]);
		}
	}
};
export async function login({ username, password }) {
	const response = await fetcher(`${BACKEND}/auth/login`, {
		method: 'POST',
		body: JSON.stringify({ username, password }),
	});
	console.log(response);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const { token, refreshToken } = await response.json();
	setJwt(token);
	setRefreshToken(refreshToken);
	return response;
}
export const isAuthenticated = () => !!getJwt();
