import {ListItem, ListItemText, List, Toolbar} from '@mui/material';
import {NavLink} from 'react-router-dom';

export default function SubNavigation({navItems}) {
	return (
		<Toolbar>
			<List
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '0',
				}}
			>
				{navItems.map((item, index) => (
					<ListItem key={index} sx={{minWidth: 'auto'}}>
						<ListItemText>
							<NavLink
								exact={item.exact}
								style={({isActive}) => {
									return isActive ? {color: 'green'} : {};
								}}
								to={item.to}
							>
								{item.label}
							</NavLink>
						</ListItemText>
					</ListItem>
				))}
			</List>
		</Toolbar>
	);
}
