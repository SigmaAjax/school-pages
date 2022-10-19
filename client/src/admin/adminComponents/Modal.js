import axios from 'axios';
import React from 'react';
import ReactDom from 'react-dom';
import {useNavigate} from 'react-router-dom';
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
	const navigate = useNavigate();
	const {isOpenModal, post} = useAdmin();
	const {setIsOpenModal} = useAdminUpdate();

	if (!isOpenModal) return null;

	console.log(typeof post.id);

	const updatePost = (id) => {
		console.log('You are going to carry on deleting data');
		console.table(post);

		axios
			.put('/api/updatePost', {
				id: post.id,
				userPass: post.user_name,
				title: post.title,
				text: post.post_text,
				slug: post.slug,
			})
			.then((response) => {
				alert('Updating this data...', response.data);
			})
			.catch((error) => {
				console.error(error);
			});
		console.log('After slugifing the post title...');
		console.table(post);

		setIsOpenModal((prev) => {
			return !prev;
		});
		navigate('/admin/newPost/admin-posts');
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
						updatePost(post.id);
					}}
				>
					Pokračovat v akci
				</button>
			</div>
		</div>,
		document.getElementById('portal')
	);
}
