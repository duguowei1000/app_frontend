import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { css } from 'styled-components/macro';

const modalStyles = css`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	align-items: center;

	/* background-color: rgb(213 220 226 / 80%); */
	background-color: var(--background-color);
	color: var(--color);
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
	width: calc(80% - 6em);
	height: calc(100% - 6em);

	overflow: auto;
`;

const createRoot = () => {
	const modalRootId = 'modal-root';
	const modalRootDiv = document.createElement('div');
	modalRootDiv.id = modalRootId;
	modalRootDiv.setAttribute('style', modalStyles);
	return modalRootDiv;
};
const handler = (event, callback) => {
	if (
		(event.type === 'keydown' && event.key === 'Escape') ||
		(event.type === 'click' && event.target.closest('#modal-root'))
	) {
		event.preventDefault();
		event.stopPropagation();
		callback();
	}
};

const events = ['keydown', 'click'] as const;

export default function ModalPortal({ children, callback }) {
	const rootEl = createRoot();
	useEffect(() => {
		document.body.setAttribute('style', 'overflow: hidden;');
		const listener = (e: MouseEvent | KeyboardEvent) => handler(e, callback);
		document.body.append(rootEl);
		for (const type of events) {
			document.addEventListener(type, listener);
		}
		console.log('%cmounted!', 'color: lime');
		return () => {
			document.body.removeAttribute('style');
			rootEl.remove();
			for (const type of events) {
				document.removeEventListener(type, listener);
			}
			console.log('%cunmounted!', 'color: red');
		};
	}, [rootEl, callback]);
	const Content = () => <>{children}</>;
	return createPortal(<Content />, rootEl);
}
