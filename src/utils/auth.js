const tokenName = 'jwtToken';

const sampleToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const decodeJwtToken = (token) => {
	const base64payload = token.split('.')[1];
	return JSON.parse(window.atob(base64payload));
};

// const

// decodeJwtToken(sampleToken); //?

const getJwtToken = () => sessionStorage.getItem(tokenName);
const setJwtToken = (token) => sessionStorage.setItem(tokenName, token);

const auth = {
	getToken: () => {
		return sessionStorage.getItem('jwt');
	},
	setToken: (token) => {
		sessionStorage.setItem('jwt', token);
	},
	isAuthenticated: () => {
		const token = auth.getToken();
		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	},
	getUser: () => {
		if (auth.isAuthenticated()) {
			const token = auth.getToken();
			const payload = JSON.parse(atob(token.split('.')[1]));
			return payload.user;
		}
	},
	/*
	// getUserId: () => {
	// 	if (auth.isAuthenticated()) {
	// 		const token = auth.getToken();
	// 		const payload = JSON.parse(atob(token.split('.')[1]));
	// 		return payload.user._id;
	// 	}
	// },
	// getUserName: () => {
	// 	if (auth.isAuthenticated()) {
	// 		const token = auth.getToken();
	// 		const payload = JSON.parse(atob(token.split('.')[1]));
	// 		return payload.user.name;
	// 	}
	// },
	// getUserEmail: () => {
	// 	if (auth.isAuthenticated()) {
	// 		const token = auth.getToken();
	// 		const payload = JSON.parse(atob(token.split('.')[1]));
	// 		return payload.user.email;
	// 	}
	// },
	// getUserRole: () => {
	// 	if (auth.isAuthenticated()) {
	// 		const token = auth.getToken();
	// 		const payload = JSON.parse(atob(token.split('.')[1]));
	// 		return payload.user.role;
	// 	}
	// },
	// getUserImage: () => {
	// 	if (auth.isAuthenticated()) {
	// 		const token = auth.getToken();
	// 		const payload = JSON.parse(atob(token.split('.')[1]));
	// 		return payload.user.image;
	// 	}
	// },

    */
};
