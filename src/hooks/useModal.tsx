import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';

const centreSelf =
	'position: fixed; top: 50%; left: 50%;transform: translate(-50%, -50%);';
const centreContent =
	'display: flex; justify-content: center; align-items: center;';
const backgroundfill =
	'height:100vh; width:100vw; background-color: rgba(0,0,0,0.2);';
const contentStyle = css`
	background-color: 'white';
	padding: '1rem';
	border-radius: '0.5rem';
	width: 'minmax(fit-content, 400px)';
	height: 'minmax(fit-content, 400px)';
	display: 'flex';
	flex-direction: 'column';
	justify-content: 'space-between';
	align-items: 'center';
	overflow-y: 'auto';
`;

const rootId = 'portal-root';
const getModalRoot = () => {
	const modalRoot = document.querySelector('div#' + rootId);
	if (modalRoot) return modalRoot as HTMLDialogElement;
	const root = document.createElement('div');
	root.id = rootId;
	return root;
};

export default function useModal() {
	const [content, setContent] = useState(undefined);
	const modal = getModalRoot();

	const handler = (event) => {
		if (
			(event.type === 'keydown' && event.key === 'Escape') ||
			(event.type === 'click' && event.target.id === 'modal-root')
		) {
			event.preventDefault();
			event.stopPropagation();
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			setContent();
		}
	};
	// const modalManager = (content) => {
	// 	setContent(content);
	// };

	useEffect(() => {
		const doc = document;
		const events = ['keydown', 'click'];
		// doc.body.setAttribute('style', 'overflow: hidden;');
		doc.body.append(modal);
		console.log('PortalMounted!');
		for (const type of events) {
			doc.addEventListener(type, handler);
		}
		return () => {
			// doc.body.removeAttribute('style');
			modal.remove();
			for (const type of events) {
				doc.removeEventListener(type, handler);
			}
			console.log('PortalUnmounted!');
		};
	}, [modal]);
	const Content = () => <>{content}</>;
	const Portal = createPortal(<Content />, modal);
	return [Portal, setContent] as const;
}
