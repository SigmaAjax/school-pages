import {NavLink} from 'react-router-dom';

export default function AlbumNav() {
	return (
		<nav>
			<ul className="navbar ul">
				<li className="nav-item">
					<NavLink
						exact
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						to="/admin/galerie"
					>
						Alba
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						exact
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						to="/admin/galerie/newAlbum"
					>
						Vytvoř Album
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
