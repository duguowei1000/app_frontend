const isProduction = import.meta.env.NODE_ENV === 'production';

const BACKEND = isProduction
	? import.meta.env.VITE_BACKEND
	: import.meta.env.VITE_isStaging
	? import.meta.env.VITE_STAGING_BACKEND
	: 'http://localhost:2000';

const FRONTEND = isProduction
	? import.meta.env.VITE_BACKEND
	: 'http://localhost:3000';

export { BACKEND, FRONTEND };
