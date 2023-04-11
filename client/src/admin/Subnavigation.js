import {NavLink} from 'react-router-dom';

export default function SubNavigation({navItems}) {
	return (
		<nav>
			<ul className="navbar ul">
				{navItems.map((item, index) => (
					<li key={index} className="nav-item">
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
