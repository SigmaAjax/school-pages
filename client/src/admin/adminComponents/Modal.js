import React from 'react';
import ReactDom from 'react-dom';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';

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

export default function Modal({children}) {
	const isOpenModal = useAdmin();
	const setIsOpenModal = useAdminUpdate();

	if (!isOpenModal) return null;
	return ReactDom.createPortal(
		<div style={OVERLAY_STYLES}>
			<div style={MODAL_STYLES}>
				<h5>{isOpenModal}</h5>
				<button onClick={() => setIsOpenModal()}>X</button>
				{children}
				<button onClick={() => setIsOpenModal()}>Zrušit</button>
				<button onClick={() => setIsOpenModal()}>Pokračovat v akci</button>
			</div>
		</div>,
		document.getElementById('portal')
	);
}