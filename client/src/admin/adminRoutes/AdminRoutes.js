import React from 'react';
import {Routes as RouterRoutes, Route} from 'react-router-dom';

import CreatePost from '../adminComponents/PostComponents/CreatePost';
import AdminNews from '../adminPages/AdminNews.js';
import AdminSidebar from '../adminComponents/AdminSidebar.js';
import AlbumDetail from '../adminComponents/GalleryComponents/AlbumDetail/AlbumDetail.js';
import CreateAlbum from '../adminComponents/GalleryComponents/CreateAlbum.js';
import Modal from '../adminComponents/Modal.js';
import AdminPostDetail from '../adminPages/AdminPostDetail.js';
import AlbumList from '../adminComponents/GalleryComponents/AlbumList';
import NewDoc from '../adminComponents/DocumentsComponents/NewDoc';
import ListOfAllDocuments from '../adminComponents/DocumentsComponents/ListOfAllDocuments';
import EmployeeFormNew from '../EmployeeFormNew';
import SubNavigation from '../Subnavigation';

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
							<EmployeeFormNew />
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
							<SubNavigation
								className="album-nav"
								navItems={[
									{
										exact: true,
										to: '/admin/galerie',
										label: 'Alba',
									},
									{
										exact: true,
										to: '/admin/galerie/newAlbum',
										label: 'Vytvoř Album',
									},
								]}
							/>
							<AlbumList />
						</div>
					}
				/>
				<Route
					path="galerie/:id/:albumSlug"
					element={
						<div className="item three">
							<AlbumDetail />
						</div>
					}
				/>
				<Route
					path="galerie/newAlbum"
					element={
						<div className="item three">
							<SubNavigation
								className="album-nav"
								navItems={[
									{
										exact: true,
										to: '/admin/galerie',
										label: 'Alba',
									},
									{
										exact: true,
										to: '/admin/galerie/newAlbum',
										label: 'Vytvoř Album',
									},
								]}
							/>
							<CreateAlbum />
						</div>
					}
				/>
				<Route
					path="dokumenty"
					element={
						<div className="item three">
							<SubNavigation
								navItems={[
									{
										exact: true,
										to: '/admin/dokumenty',
										label: 'Seznam všech dokumentů',
									},
									{
										exact: true,
										to: '/admin/dokumenty/new-doc',
										label: 'Přidat nový dokument',
									},
								]}
							/>
							<ListOfAllDocuments />
						</div>
					}
				/>
				<Route
					path="dokumenty/new-doc"
					element={
						<div className="item three">
							<SubNavigation
								navItems={[
									{
										exact: true,
										to: '/admin/dokumenty',
										label: 'Seznam všech dokumentů',
									},
									{
										exact: true,
										to: '/admin/dokumenty/new-doc',
										label: 'Přidat nový dokument',
									},
								]}
							/>
							<NewDoc />
						</div>
					}
				/>
			</RouterRoutes>
		</div>
	);
}
