import {NavLink} from 'react-router-dom';

import {SidebarData} from '../SidebarData.js';

import styles from '../../pages/admin.module.css';
import {Box} from '@mui/material';

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
								<Box
									display="flex"
									flexDirection="column"
									alignItems="center"
									justifyContent="center"
								>
									<div>{value.icon}</div>
									<div>{value.title}</div>
								</Box>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
