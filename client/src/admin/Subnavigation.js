import {ListItem, ListItemText, List, Toolbar} from '@mui/material';
import {NavLink} from 'react-router-dom';

export default function SubNavigation({navItems}) {
	return (
		<Toolbar
			sx={{
				backgroundColor: 'grey.200',
				boxShadow: 3,
				justifyContent: 'center',
			}}
			xs={12}
			sm={6}
			md={4}
			lg={3}
		>
			<List
				sx={{
					display: 'flex',
					justifyContent: 'space-around',
				}}
			>
				{navItems.map((item, index) => (
					<ListItem
						key={index}
						sx={{
							borderRadius: 1,
							minWidth: 'auto',
							boxShadow: 2,
							ml: 1,
							mr: 1,
							alignItems: 'center',
						}}
					>
						<ListItemText primaryTypographyProps={{align: 'center'}}>
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
