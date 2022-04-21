const defaultHeaders: HeadersInit = { 'Content-Type': 'application/json' };
const defaultOptions: RequestInit = {
	credentials: 'include',
};

const fetcher = (url: RequestInfo, options: RequestInit): Promise<Response> => {
	const { headers, ...restOptions } = options || {};
	const newOptions = { ...defaultOptions, ...restOptions };
	newOptions.headers = { ...defaultHeaders, ...headers };
	console.log(newOptions);
	return fetch(url, options);
};

export { fetcher };
