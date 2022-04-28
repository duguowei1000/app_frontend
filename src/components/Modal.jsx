import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { root } from 'postcss';

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
		document.body.setAttribute('style', 'overflow: hidden;');
		const listener = (e) => handler(e, callback);
		document.body.append(rootEl);
		document.addEventListener('click', listener);
		document.addEventListener('keydown', listener);
		console.log('mounted!');
		return () => {
			document.body.removeAttribute('style');
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
				width: '80vw',
				height: '95vw',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				overflowY: 'auto',
			}}
		>
			{children}
		</div>
	);
	const portal = createPortal(<Content />, rootEl);
	return portal;
}
