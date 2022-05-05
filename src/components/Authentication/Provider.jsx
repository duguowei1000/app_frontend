import { useReducer, createContext, useContext } from 'react';
// import urlcat from 'urlcat';
// import { LISTERUSERID, TENANTUSERID } from '../../utils/loginDetails';
import { reducer } from './authreducer';
import useSessionListener from '../../hooks/useSessionListener';
// import  from '../utils/loginDetails';
const colorReset = 'color: inherit; font-weight: normal';
/* const storageListener = (event) => {
	if (event.key == 'getSessionStorage') {
		// Some tab asked for the sessionStorage -> send it
		// TODO :remove this console.log
		console.log(
			'%cattaching%c ' + 'sessionStorage to localStorage!',
			'background-color: thistle; font-weight: bold',
			colorReset
		);
		localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
		// TODO :remove this console.log
		console.log(
			'%cremoving%c ' + 'sessionStorage from localStorage!',
			'background-color: thistle; font-weight: bold',
			colorReset
		);
		localStorage.removeItem('sessionStorage');
	} else if (event.key == 'sessionStorage' && sessionStorage.length === 0) {
		// sessionStorage is empty -> fill it
		// TODO :remove this console.log
		console.log(
			'%cgetting%c ' + 'sessionStorage from localStorage!',
			'background-color: chartreuse; font-weight: bold',
			colorReset
		);
		const data = JSON.parse(event.newValue);
		for (const key in data) {
			sessionStorage.setItem(key, data[key]);
		}
	}
};
function useSessionListener() {
	if (sessionStorage.length === 0) {
		// Ask other tabs for session storage
		// TODO :remove this console.log
		console.log(
			'sessionStorage length is 0,' +
				'%c asking other tabs for sessionStorage!%c',
			'background-color: aqua',
			colorReset
		);
		localStorage.setItem('getSessionStorage', String(Date.now()));
	}
	useEffect(() => {
		window.addEventListener('storage', storageListener);
		return () => {
			window.removeEventListener('storage', storageListener);
		};
	}, []);
}

// const token = sessionStorage.getItem('jwt');
// if (token) {
// 	const decoded = window.btoa(token);
// 	console.log('decoded', decoded);
// }
*/
const initialState = {
	// sessionStorage: {},
	// localStorage: {},
	user: undefined,
	isLoggedIn: false,
};
// export const reducer<S,A>: React.Reducer<S,A>/* AuthReducer */
// = (state, action) => {
// export const reducer/* AuthReducer */ = (state:AuthState, action) => { switch (action.type) { case "LOGIN": return { ...state, isLoggedIn: true, user: action.payload, }; case "LOGOUT": return { ...state, isLoggedIn: false, user: undefined, }; } };

export const AuthContext = createContext([]);

const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	useSessionListener();
	return (
		<AuthContext.Provider value={[state, dispatch]}>
			{children}
		</AuthContext.Provider>
	);
};

// const token = sessionStorage.getItem('jwt');
// if (token) {
// 	fetch(urlcat(BACKEND, 'auth/verify'), {
// 		credentials: 'include',
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `jwt ${token}`,
// 		},
// 	})
// 		.then((res) => res.json())
// 		.then((data) => {
// 			if (data.success) {
// 				initialState.user = data.user;
// 				initialState.isLoggedIn = true;
// 			} else {
// 				initialState.user = undefined;
// 				initialState.isLoggedIn = false;
// 			}
// 		});

export const AuthConsumer = () => {
	const [state] = useContext(AuthContext);
	return <div>{JSON.stringify(state)}</div>;
};
export const AuthToggler = () => {
	const [state, dispatch] = useContext(AuthContext);
	const { isLoggedIn, user } = state;
	const login = (e) => {
		e.preventDefault();
		dispatch({
			type: 'TEST-LOGIN',
			// payload: {
			// 	listerLogin: {
			// 		name: 'LISTER',
			// 		accountType: 'lister',
			// 		userId: LISTERUSERID,
			// 	},
			// 	tenantLogin: {
			// 		name: 'TENANT',
			// 		accountType: 'renter',
			// 		userId: TENANTUSERID,
			// 	},
			// },
		});
	};
	const logout = () => {
		e.preventDefault();
		dispatch({ type: 'TEST-LOGOUT' });
	};
	return (
		<div>
			<button onClick={login}>Login</button>
			<button onClick={logout}>Logout</button>
			{isLoggedIn && <div>Logged in as {user.name}</div>}
		</div>
	);
};
export default Provider;
// export default function App() {
//   return (
//     <Provider>
//       <AuthConsumer />
//       <AuthToggler />
//     </Provider>
//   );
// }
