import {NavLink} from 'react-router-dom';

import {SidebarData} from '../SidebarData.js';

import styles from '../../pages/admin.module.css';

export default function AdminSidebar() {
	return (
		<div className={`${styles.item} ${styles.one} ${styles.sidebar}`}>
			<ul className={styles.SidebarList}>
				{SidebarData.map((value, key) => {
					return (
						<li className={styles.SidebarItem} key={key}>
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
