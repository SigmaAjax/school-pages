import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Button,
	Avatar,
	MenuItem,
	Menu,
} from '@mui/material';

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
	const [anchorEl, setAnchorEl] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState(false);

	const handleMenuOpen = (event, dropdownName) => {
		setAnchorEl(event.currentTarget);
		setActiveDropdown(dropdownName);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setActiveDropdown(null);
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
						<div key={item.name}>
							<Button
								color="inherit"
								onClick={
									item.name === 'Kontakty'
										? (e) => handleMenuOpen(e, 'Kontakty')
										: null
								}
								onMouseEnter={
									/// Open menu on hover
									item.name === 'Kontakty'
										? (e) => handleMenuOpen(e, 'Kontakty')
										: null
								}
								sx={{marginRight: 1}}
							>
								<Link
									to={item.link}
									style={{color: 'white', textDecoration: 'none'}}
								>
									{item.name}
								</Link>
							</Button>
							{/* Dropdown for Kontakty */}
							{item.name === 'Kontakty' && (
								<Menu
									anchorEl={anchorEl}
									open={activeDropdown === 'Kontakty'}
									onClose={handleMenuClose}
									onMouseLeave={handleMenuClose}
								>
									<MenuItem
										sx={{borderBottom: '1px solid #e0e0e0'}}
										onClick={handleMenuClose}
									>
										Zaměstnanci
									</MenuItem>
									<Link
										to="/kontakty/formular"
										style={{textDecoration: 'none', color: 'inherit'}}
									>
										<MenuItem onClick={handleMenuClose}>Napište nám</MenuItem>
									</Link>
								</Menu>
							)}
						</div>
					))}
				</Box>
			</Toolbar>
		</AppBar>
	);
}
