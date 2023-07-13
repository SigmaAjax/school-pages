import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Box, Button, Avatar} from '@mui/material';

const navItems = [
	{name: 'Aktuality', link: '/aktuality'},
	{name: 'Školka', link: '/skolka'},
	{name: 'Jídelna', link: '/jidelna'},
	{name: 'Základka', link: '/zakladka'},
	{name: 'Kontakty', link: '/kontakty'},
	{name: 'Fotogalerie', link: '/fotogalerie'},
	{name: 'Admin Page', link: '/admin'},
];

export default function Navigation() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<AppBar position="static">
			<Toolbar>
				{/* Logo */}
				<Typography variant="h6" sx={{flexGrow: 1, marginLeft: 10}}>
					<Avatar
						src="https://via.placeholder.com/50"
						alt="Logo"
						sx={{marginRight: 2}}
					/>
				</Typography>

				{/* Navigation */}
				<Box display="flex" sx={{marginRight: 10}}>
					<Button color="inherit" sx={{marginRight: 1}}>
						<Link to="/" style={{color: 'white', textDecoration: 'none'}}>
							Home
						</Link>
					</Button>
					{navItems.map((item) => (
						<Button
							color="inherit"
							onMouseEnter={handlePopoverOpen}
							onMouseLeave={handlePopoverClose}
							sx={{marginRight: 1}} // Add marginRight to each button
						>
							<Link
								to={item.link}
								style={{color: 'white', textDecoration: 'none'}}
							>
								{item.name}
							</Link>
						</Button>
					))}
				</Box>
			</Toolbar>
		</AppBar>
	);
}
