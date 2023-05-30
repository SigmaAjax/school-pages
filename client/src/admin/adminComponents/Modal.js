import React from 'react';
import ReactDom from 'react-dom';
import {useNavigate} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';
import useDeleteUpdate from '../../Hooks/useDeleteUpdate';

const MODAL_STYLES = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	backgroundColor: '#FFF',
	padding: '50px',
	zIndex: 1000,
	width: '450px',
	height: '250px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
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
	const navigate = useNavigate();
	const {isOpenModal, post, buttonName} = useAdmin();
	const {setIsOpenModal, setButtonName} = useAdminUpdate();
	const {updateOrDelete} = useDeleteUpdate(buttonName);

	if (!isOpenModal) return null;

	return ReactDom.createPortal(
		<div style={OVERLAY_STYLES}>
			<div style={MODAL_STYLES}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '100%',
						height: '28px',
					}}
				>
					<h5>{isOpenModal}</h5>
					<button
						onClick={() => {
							setIsOpenModal((prev) => {
								console.log('You are closing modal from X button');
								return !prev;
							});
							setButtonName((prev) => {
								return (prev = '');
							});
						}}
					>
						X
					</button>
				</div>
				{children}
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<button
						onClick={() => {
							setIsOpenModal((prev) => {
								console.log('You are closing modal from ZRUŠIT button');
								return !prev;
							});
							setButtonName((prev) => {
								return (prev = '');
							});
						}}
					>
						Zrušit
					</button>
					<button
						onClick={() => {
							updateOrDelete(buttonName);
							setIsOpenModal((prev) => {
								return !prev;
							});
							//updatePost(post.id);
						}}
					>
						Pokračovat v akci
					</button>
				</div>
			</div>
		</div>,
		document.getElementById('portal')
	);
}
