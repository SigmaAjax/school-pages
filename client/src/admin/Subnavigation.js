import {NavLink} from 'react-router-dom';

import styles from '../pages/admin.module.css';

export default function SubNavigation({navItems}) {
	return (
		<nav>
			<ul className={styles.navbar}>
				{navItems.map((item, index) => (
					<li key={index} className={styles.navItem}>
						<NavLink
							exact={item.exact}
							style={({isActive}) => {
								return isActive ? {color: 'green'} : {};
							}}
							to={item.to}
						>
							{item.label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
}
