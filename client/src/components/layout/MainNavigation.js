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

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import * as muiColors from '@mui/material/colors';

import logo from '../../images/logo.png';

const navItems = [
	{name: 'O škole', link: '/'},
	{name: 'Aktuality', link: '/aktuality'},
	{name: 'Školka', link: '/skolka'},
	{name: 'Jídelna', link: '/jidelna'},
	{name: 'Základka', link: '/zakladka'},
	{name: 'Kontakty', link: '/kontakty'},
	{name: 'Fotogalerie', link: '/fotogalerie'},
	// {name: 'Admin Page', link: '/admin'},
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
				sx={{
					backgroundColor: muiColors[selectedColor][selectedShade],
					borderRadius: '20px 20px 20px 20px',
				}}
			>
				<Toolbar
					component={'nav'}
					variant="dense"
					sx={{justifyContent: 'space-between', overflowX: 'hidden'}}
				>
					{/* Logo */}
					<Typography
						variant="h6"
						sx={{flexGrow: 1, marginLeft: 10, paddingTop: 1, paddingBottom: 1}}
					>
						<Avatar
							src={logo}
							alt="Logo"
							sx={{marginRight: 2, minWidth: 60, minHeight: 60}}
						/>
					</Typography>

					{/* Navigation */}
					<Box display="flex" sx={{marginRight: 10}}>
						{navItems.map((item, index) => (
							<React.Fragment key={index}>
								{item.name !== 'Kontakty' ? (
									<Button
										color="inherit"
										component={Link}
										to={item.link}
										sx={{marginRight: 1}}
									>
										{item.name}
									</Button>
								) : (
									<Box sx={{marginRight: 1}}>
										<Button
											color="inherit"
											onClick={(e) => handleMenuOpen(e, 'Kontakty')}
											onMouseEnter={(e) => handleMenuOpen(e, 'Kontakty')}
										>
											{item.name}
											<ArrowDropDownIcon />
										</Button>
										<Menu
											anchorEl={anchorEl}
											open={activeDropdown === 'Kontakty'}
											onClose={handleMenuClose}
											onMouseLeave={handleMenuClose}
										>
											<Link
												to="/kontakty"
												style={{textDecoration: 'none', color: 'inherit'}}
											>
												<MenuItem
													sx={{borderBottom: '1px solid #e0e0e0'}}
													onClick={handleMenuClose}
												>
													Zaměstnanci
												</MenuItem>
											</Link>
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
											<MenuItem onClick={handleMenuClose}>Dokumenty</MenuItem>
										</Menu>
									</Box>
								)}
							</React.Fragment>
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
