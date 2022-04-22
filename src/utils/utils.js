const isProduction = process.env.NODE_ENV === 'production';

const BACKEND = 'https://reallistic-backend.herokuapp.com/';

const FRONTEND = isProduction
	? process.env.REACT_APP_FRONTEND
	: 'http://localhost:3000';

export { BACKEND, FRONTEND };
