import { BACKEND } from '../../utils/utils';

function setTokens(tokens) {
	tokens.jwt && sessionStorage.setItem('jwt', tokens.jwt);
	tokens.refreshToken &&
		sessionStorage.setItem('refreshToken', tokens.refreshToken);
}

function clearTokens() {
	sessionStorage.removeItem('jwt');
	sessionStorage.removeItem('refreshToken');
}

export async function updateData() {
	try {
		const res = await fetch(urlcat(BACKEND, 'auth/update'), {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
			},
		});
		const data = await res.json();
		if (data.error) {
			throw new Error(data.error);
		}
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const reducer = (state, action) => {
	console.log('action', action);
	console.log('state', state);
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			setTokens(action.payload);
			const { accountType, username, userId, listings } = action.payload;
			return {
				...state,
				isLoggedIn: true,
				name: username,
				accountType,
				userId,
				listings,
			};
		case 'LOGIN_FAILURE':
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		case 'LOGOUT_REQUEST':
			clearTokens();
			return {
				isLoggedIn: false,
			};
		case 'UPDATE':
			let res;
			updateData().then((data) => {
				res = data;
			});
			return {
				...state,
				listings: res.listings,
			};

		case 'DELETE_LISTING':
			return {
				...state,
				listings: state.listings.filter(
					(listing) => listing._id !== action.payload
				),
			};
	}
};
