import React, {useEffect} from 'react';
import {Routes as RouterRoutes, Route} from 'react-router-dom';
import axios from 'axios';

import CreatePost from '../adminComponents/PostComponents/CreatePost';
import AdminNews from '../adminPages/AdminNews.js';
import AdminSidebar from '../adminComponents/AdminSidebar.js';
import AlbumDetail from '../adminComponents/GalleryComponents/AlbumDetail.js';
import AlbumNav from '../adminComponents/GalleryComponents/AlbumNav.js';
import CreateAlbum from '../adminComponents/GalleryComponents/CreateAlbum.js';
import Modal from '../adminComponents/Modal.js';
import AdminPostDetail from '../adminPages/AdminPostDetail.js';
import EmployeeForm from '../EmployeeForm.js';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';

export default function AdminRoutes() {
	return (
		<div className="container">
			<Modal>Fancy Modal</Modal>
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
							<AdminNews />
						</div>
					}
				/>
				<Route
					path="newPost/admin-posts/:id/:titleSlug"
					element={<AdminPostDetail />}
				/>
				<Route
					path="galerie/*"
					element={
						<div className="item three">
							<AlbumNav />
							<h1>Jednotlivá Alba</h1>
						</div>
					}
				/>
				<Route
					path="galerie/newAlbum"
					element={
						<div className="item three">
							<AlbumNav />
							<CreateAlbum />
						</div>
					}
				/>
				<Route
					path="galerie/album/:id/:albumSlug"
					element={
						<div className="item three">
							<h1>detail alba</h1>
							<AlbumDetail />
						</div>
					}
				/>
				<Route path="dokumenty" element={<h1>dokumety</h1>} />
			</RouterRoutes>
		</div>
	);
}
