import {NavLink} from 'react-router-dom';

export default function DocNav() {
	return (
		<nav>
			<ul className="navbar ul">
				<li className="nav-item">
					<NavLink
						exact={'true'}
						strict
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {color: 'blue'};
						}}
						to="/admin/dokumenty"
					>
						Seznam všech dokumentů
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						exact={'true'}
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {color: 'blue'};
						}}
						to="/admin/dokumenty/new-doc"
					>
						Přidat nový dokument
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
