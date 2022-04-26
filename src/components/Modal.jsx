import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const centreSelf =
	'position: fixed; top: 50%; left: 50%;transform: translate(-50%, -50%);';
const centreContent =
	'display: flex; justify-content: center; align-items: center;';
const createRoot = () => {
	const modalRootId = 'modal-root';
	const modalRootDiv = document.createElement('div');
	modalRootDiv.id = modalRootId;
	const styles =
		'height:100vh; width:100vw; background-color: rgba(0,0,0,0.2);';
	modalRootDiv.setAttribute(
		'style',
		`${styles} ${centreSelf} ${centreContent} `
	);
	return modalRootDiv;
};
const handler = (event, callback) => {
	if (
		(event.type === 'keydown' && event.key === 'Escape') ||
		(event.type === 'click' && event.target.id === 'modal-root')
	) {
		event.preventDefault();
		event.stopPropagation();
		callback();
	}
};
export default function ModalPortal({ children, callback }) {
	const rootEl = createRoot();
	useEffect(() => {
		const listener = (e) => handler(e, callback);
		document.body.append(rootEl);
		document.addEventListener('click', listener);
		document.addEventListener('keydown', listener);
		console.log('mounted!');
		return () => {
			document.body.removeChild(rootEl);
			document.removeEventListener('click', listener);
			document.removeEventListener('keydown', listener);
			console.log('unmounted!');
		};
	}, [rootEl, callback]);
	const Content = () => (
		<div
			style={{
				backgroundColor: 'white',
				padding: '1rem',
				borderRadius: '0.5rem',
				width: '30rem',
				height: '20rem',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			{children}
		</div>
	);
	const portal = createPortal(<Content />, rootEl);
	return portal;
}
