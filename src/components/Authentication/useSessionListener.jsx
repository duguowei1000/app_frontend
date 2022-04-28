import { useEffect } from 'react';
const storageListener = (event) => {
	switch (event.key) {
		case 'getSessionStorage':
			localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
			localStorage.removeItem('sessionStorage');
			break;
		case 'sessionStorage':
			if (sessionStorage.length === 0) {
				const data = JSON.parse(event.newValue);
				for (const key in data) {
					sessionStorage.setItem(key, data[key]);
				}
			}
			break;
		case 'logout':
			sessionStorage.clear();
			localStorage.clear();
			break;
		default:
			console.log(
				"%c storageListener shouldn't have reached here.",
				'background-color: #222; color: #bada55'
			);
			break;
	}
};
export default function useSessionListener() {
	if (sessionStorage.length === 0) {
		localStorage.setItem('getSessionStorage', String(Date.now()));
	}
	useEffect(() => {
		window.addEventListener('storage', storageListener);
		return () => {
			window.removeEventListener('storage', storageListener);
		};
	}, []);
}
