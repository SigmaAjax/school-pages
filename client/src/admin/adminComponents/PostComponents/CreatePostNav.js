import {NavLink, useLocation} from 'react-router-dom';

const isActiveFunc = (match, location) => {
	return match && match.isExact;
};

export default function CreatePostNav() {
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
						to="/admin/newPost"
					>
						Vytvoř aktualitu nebo příspěvek
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						exact={false}
						isActive={isActiveFunc}
						style={({isActive}) => {
							return isActive ? {color: 'green'} : {};
						}}
						// activeStyle={{color: 'green'}}
						to="/admin/newPost/admin-posts"
					>
						Uprav aktualitu nebo příspěvek
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
