import {NavLink} from 'react-router-dom';

export default function MainNavigation() {
	return (
		<nav className="navbar">
			<ul className="navbar ul">
				<li className="nav-item">
					<NavLink
						exact
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						to="/"
					>
						Home
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						exact
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						to="/aktuality"
					>
						Aktuality
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						exact
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						to="/skolka"
					>
						Školka
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						exact
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						to="/jidelna"
					>
						Jídelna
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						exact
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						to="/zakladka"
					>
						Základní škola
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						exact
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						to="/kontakty"
					>
						Kontakty
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						exact
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						to="/admin"
					>
						TrainingBodyPage
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
