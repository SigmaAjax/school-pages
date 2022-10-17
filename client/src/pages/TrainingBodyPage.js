import React, {useState} from 'react';
import {Routes as RouterRoutes, Route} from 'react-router-dom';

import AdminSidebar from '../admin/adminComponents/AdminSidebar.js';
import Modal from '../admin/adminComponents/Modal.js';
import CreatePost from '../admin/CreatePost.js';
import EmployeeForm from '../admin/EmployeeForm.js';
import News from './News.js';
import PostDetail from './PostDetail.js';

export default function TrainingBodyPage() {
	const [isOpenModal, setIsOpenModal] = useState(false);

	return (
		<div className="container">
			<Modal
				open={isOpenModal}
				onClose={() =>
					setIsOpenModal((prev) => {
						return !prev;
					})
				}
			>
				Fancy modal
			</Modal>
			<div className="item one">
				<AdminSidebar />
			</div>
			{/* <div className="item two">flex item 2</div> */}
			<RouterRoutes>
				<Route
					path="zamestnanci"
					element={
						<div className="item three">
							<EmployeeForm />
						</div>
					}
				/>
				<Route
					path="newPost/*"
					element={
						<div className="item three">
							<CreatePost />
						</div>
					}
				/>
				<Route
					path="newPost/admin-posts"
					element={
						<div className="item three">
							<News
								admin={true}
								onOpen={() => setIsOpenModal((prev) => !prev)}
							/>
						</div>
					}
				/>
				<Route
					path="newPost/admin-posts/:id/:titleSlug"
					element={
						<PostDetail
							admin={true}
							onOpen={() => setIsOpenModal((prev) => !prev)}
						/>
					}
				/>
				<Route path="galerie" element={<h1>Galerie</h1>} />
				<Route path="dokumenty" element={<h1>dokumety</h1>} />
			</RouterRoutes>
		</div>
	);
}
