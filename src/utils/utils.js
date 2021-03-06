const isProduction = process.env.NODE_ENV === 'production';

const BACKEND = isProduction
	? process.env.REACT_APP_BACKEND
	: 'http://localhost:2000';

const FRONTEND = isProduction
	? process.env.REACT_APP_BACKEND
	: 'http://localhost:3000';

export { BACKEND, FRONTEND };
