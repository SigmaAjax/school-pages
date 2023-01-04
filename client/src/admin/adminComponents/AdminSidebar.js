import axios from 'axios';
import {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext.js';
import {SidebarData} from '../SidebarData.js';

export default function AdminSidebar() {
	const {setPostList} = useAdminUpdate();
	const {postList} = useAdmin();
	useEffect(() => {
		const controller = new AbortController();
		axios
			.get('/api/get', {signal: controller.signal})
			.then((response) => {
				setPostList(() => {
					return [...response.data];
				});
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				console.log(postList);
			});

		return () => {
			console.log('aborting');
			controller.abort();
		};
	}, []);

	return (
		<div className="item one sidebar">
			<ul className="SidebarList">
				{SidebarData.map((value, key) => {
					//console.table(window.location);
					return (
						<li className="SidebarItem" key={key}>
							<NavLink
								style={({isActive}) => {
									return isActive ? {color: 'red'} : {};
								}}
								to={`/admin${value.link}`}
							>
								<div>{value.icon}</div>
								<div>{value.title}</div>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
