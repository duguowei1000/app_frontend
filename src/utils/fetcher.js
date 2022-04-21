const defaultHeaders = { 'Content-Type': 'application/json' };
const defaultOptions = {
	credentials: 'include',
};
const fetcher = (url, options) => {
	const { headers, ...restOptions } = options || {};
	const newOptions = { ...defaultOptions, ...restOptions };
	newOptions.headers = { ...defaultHeaders, ...headers };
	console.log(newOptions);
	return fetch(url, options);
};
export { fetcher };
