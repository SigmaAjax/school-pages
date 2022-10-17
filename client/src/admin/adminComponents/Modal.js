import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	backgroundColor: '#FFF',
	padding: '50px',
	zIndex: 1000,
};

const OVERLAY_STYLES = {
	position: 'fixed',
	top: 0,
	right: 0,
	left: 0,
	bottom: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.7)',
	zIndex: 1000,
};

export default function Modal({open, onClose, children}) {
	if (!open) return null;
	return ReactDom.createPortal(
		<div style={OVERLAY_STYLES}>
			<div style={MODAL_STYLES}>
				<button onClick={onClose}>X</button>
				{children}
				<button onClick={onClose}>Zrušit</button>
				<button onClick={onClose}>Pokračovat v akci</button>
			</div>
		</div>,
		document.getElementById('portal')
	);
}
