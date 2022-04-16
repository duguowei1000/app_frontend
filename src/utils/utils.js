const BACKEND =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_BACKEND
		: 'http://localhost:2000'; // process.env.REACT_APP_BACKEND

export default BACKEND;
