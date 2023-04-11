import {NavLink} from 'react-router-dom';

import {SidebarData} from '../SidebarData.js';

export default function AdminSidebar() {
	return (
		<div className="item one sidebar">
			<ul className="SidebarList">
				{SidebarData.map((value, key) => {
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
