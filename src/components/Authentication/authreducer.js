function setTokens(tokens) {
	tokens.jwt && sessionStorage.setItem('jwt', tokens.jwt);
	tokens.refreshToken &&
		sessionStorage.setItem('refreshToken', tokens.refreshToken);
}

function clearTokens() {
	sessionStorage.removeItem('jwt');
	sessionStorage.removeItem('refreshToken');
}

export const reducer = (state, action) => {
	console.log('action', action);
	console.log('state', state);
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			setTokens(action.payload);
			const { accountType, username, userId } = action.payload;
			return {
				...state,
				isLoggedIn: true,
				name: username,
				accountType,
				userId,
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
	}
};
