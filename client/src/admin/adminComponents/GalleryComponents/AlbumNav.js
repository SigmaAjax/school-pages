import {NavLink} from 'react-router-dom';
const isActiveFunc = (match, location) => {
	return match && match.isExact;
};

export default function AlbumNav() {
	return (
		<nav>
			<ul className="navbar ul">
				<li className="nav-item">
					<NavLink
						exact={true}
						isActive={isActiveFunc}
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
						exact={true}
						isActive={isActiveFunc}
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
