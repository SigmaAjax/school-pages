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
	const {isOpenModal, post} = useAdmin();
	const {setIsOpenModal} = useAdminUpdate();

	if (!isOpenModal) return null;

	console.table(post);

	const deletePost = (e) => {
		console.log('You are going to carry on deleting data');
	};

	return ReactDom.createPortal(
		<div style={OVERLAY_STYLES}>
			<div style={MODAL_STYLES}>
				<h5>{isOpenModal}</h5>
				<button
					onClick={() =>
						setIsOpenModal((prev) => {
							console.log('You are closing modal from X button');
							return !prev;
						})
					}
				>
					X
				</button>
				{children}
				<button
					onClick={() =>
						setIsOpenModal((prev) => {
							console.log('You are closing modal from ZRUŠIT button');
							return !prev;
						})
					}
				>
					Zrušit
				</button>
				<button
					onClick={() => {
						deletePost();
						setIsOpenModal((prev) => {
							return !prev;
						});
					}}
				>
					Pokračovat v akci
				</button>
			</div>
		</div>,
		document.getElementById('portal')
	);
}
