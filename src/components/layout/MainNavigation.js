import {Link, NavLink} from 'react-router-dom';

export default function MainNavigation() {
	return (
		<nav className="navbar">
			<ul className="navbar ul">
				<li className="nav-item">
					<NavLink exact activeClassName="active" to="/">
						Home
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink exact activeClassName="active" to="/skolka">
						Školka
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink exact activeClassName="active" to="/jidelna">
						Jídelna
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink exact activeClassName="active" to="/zakladka">
						Základní škola
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink exact activeClassName="active" to="/kontakty">
						Kontakty
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink exact activeClassName="active" to="/training">
						TrainingBodyPage
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
