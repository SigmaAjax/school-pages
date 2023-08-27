import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Button,
	Avatar,
	Menu,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';

import * as muiColors from '@mui/material/colors';

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

	///// colour logic

	const colors = [
		'red',
		'pink',
		'purple',
		'deepPurple',
		'indigo',
		'blue',
		'lightBlue',
		'cyan',
		'teal',
		'green',
		'lightGreen',
		'lime',
		'yellow',
		'amber',
		'orange',
		'deepOrange',
		'brown',
		'grey',
		'blueGrey',
	];
	const shades = [
		'50',
		'100',
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
		'800',
		'900',
		'A100',
		'A200',
		'A400',
		'A700',
	];

	const [selectedColor, setSelectedColor] = useState('blue');
	const [selectedShade, setSelectedShade] = useState('500');

	return (
		<>
			<AppBar
				position="sticky"
				sx={{backgroundColor: muiColors[selectedColor][selectedShade]}}
			>
				<Toolbar
					component={'nav'}
					variant="dense"
					sx={{justifyContent: 'space-between', overflowX: 'hidden'}}
				>
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
							<Link
								to="/"
								sx={{
									p: 1,
									flexShrink: 0,
									color: 'white',
									textDecoration: 'none',
								}}
							>
								O škole
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
										sx={{
											p: 1,
											flexShrink: 0,
											color: 'white',
											textDecoration: 'none',
										}}
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
											<MenuItem
												sx={{borderBottom: '1px solid #e0e0e0'}}
												onClick={handleMenuClose}
											>
												Napište nám
											</MenuItem>
										</Link>
										<MenuItem>Dokumenty</MenuItem>
									</Menu>
								)}
							</div>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box sx={{p: 4, backgroundColor: 'white'}}>
				<FormControl variant="outlined">
					<InputLabel id="color-label">Color</InputLabel>
					<Select
						labelId="color-label"
						value={selectedColor}
						onChange={(e) => setSelectedColor(e.target.value)}
						label="Color"
					>
						{colors.map((color) => (
							<MenuItem key={color} value={color}>
								{color}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl variant="outlined">
					<InputLabel id="shade-label">Shade</InputLabel>
					<Select
						labelId="shade-label"
						value={selectedShade}
						onChange={(e) => setSelectedShade(e.target.value)}
						label="Shade"
					>
						{shades.map((shade) => (
							<MenuItem key={shade} value={shade}>
								{shade}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		</>
	);
}
