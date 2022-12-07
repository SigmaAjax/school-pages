import React from 'react';
import {Routes as RouterRoutes, Route} from 'react-router-dom';

import AdminSidebar from '../admin/adminComponents/AdminSidebar.js';
import AlbumDetail from '../admin/adminComponents/GalleryComponents/AlbumDetail.js';
import AlbumNav from '../admin/adminComponents/GalleryComponents/AlbumNav.js';
import CreateAlbum from '../admin/adminComponents/GalleryComponents/CreateAlbum.js';
import Modal from '../admin/adminComponents/Modal.js';
import CreatePost from '../admin/adminComponents/PostComponents/CreatePost.js';
import AdminNews from '../admin/adminPages/AdminNews.js';
import AdminPostDetail from '../admin/adminPages/AdminPostDetail.js';
import EmployeeForm from '../admin/EmployeeForm.js';
import {AdminProvider} from '../context/AdminContext.js';

export default function AdminPage() {
	//const [isOpenModal, setIsOpenModal] = useState(false);

	return (
		<AdminProvider>
			<div className="container">
				<Modal>Fancy modal</Modal>
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
		</AdminProvider>
	);
}
