import {NavLink} from 'react-router-dom';

export default function CreatePostNav() {
	return (
		<nav>
			<ul className="navbar ul">
				<li className="nav-item">
					<NavLink
						exact
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						to="/admin/newPost"
					>
						Vytvoř aktualitu nebo příspěvek
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						exact
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						to="/admin/newPost/admin-posts"
					>
						Uprav aktualitu nebo příspěvek
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}