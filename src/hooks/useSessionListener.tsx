import { useEffect } from 'react';
import { storageListener } from '../utils/auth';

export function useSessionListener() {
	useEffect(() => {
		window.addEventListener('storage', storageListener);

		return () => {
			window.removeEventListener('storage', storageListener);
		};
	}, []);
}
