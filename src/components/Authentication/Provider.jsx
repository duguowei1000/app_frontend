const { useEffect, useReducer, createContext, useContext } = React;
const storageListener = (event) => {
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
function useSessionListener() {
	useEffect(() => {
		window.addEventListener('storage', storageListener);
		return () => {
			window.removeEventListener('storage', storageListener);
		};
	}, []);
}
const initialState = {
	// sessionStorage: {},
	// localStorage: {},
	user: undefined,
	isLoggedIn: false,
};
// export const reducer<S,A>: React.Reducer<S,A>/* AuthReducer */ = (state, action) => {
// export const reducer/* AuthReducer */ = (state:AuthState, action) => { switch (action.type) { case "LOGIN": return { ...state, isLoggedIn: true, user: action.payload, }; case "LOGOUT": return { ...state, isLoggedIn: false, user: undefined, }; } };
const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isLoggedIn: true,
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				...state,
				isLoggedIn: false,
				user: undefined,
			};
	}
};
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
export const AuthConsumer = () => {
	const [state] = useContext(AuthContext);
	return <div>{JSON.stringify(state)}</div>;
};
export const AuthToggler = () => {
	const [state, dispatch] = useContext(AuthContext);
	const { isLoggedIn, user } = state;
	const login = () => {
		dispatch({ type: 'LOGIN', payload: { name: 'test' } });
	};
	const logout = () => {
		dispatch({ type: 'LOGOUT' });
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
