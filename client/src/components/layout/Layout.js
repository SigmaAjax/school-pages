import {useState} from 'react';
import MainNavigation from './MainNavigation';
import Footer from './Footer';
import Header from './Header';
import {
	Grid,
	Box,
	Container,
	ThemeProvider,
	CssBaseline,
	createTheme,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import * as muiColors from '@mui/material/colors';

import school_img from '../../images/DJI_0214.JPG';

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

export default function Layout({children}) {
	const [selectedColor, setSelectedColor] = useState('grey');
	const [selectedShade, setSelectedShade] = useState('500');

	const theme = createTheme({
		typography: {
			fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
			fontWeight: 400,
			fontSize: 16,
			lineHeight: 1.5,
			letterSpacing: '0.00938em',
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						backgroundColor: muiColors[selectedColor][selectedShade], // Your background color
					},
				},
			},
		},

		// ... other theme settings
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<Box
				component="div"
				sx={{
					position: 'absolute',
					width: '100%',
					// height: '100vh',
					// backgroundImage: `url(${school_img}), url(${school_img})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'repeat repeat',
					backgroundColor: 'rgba(0, 0, 0, 0.4)',
					backgroundBlendMode: 'overlay', // This is how you blend it
					margin: 0,
				}}
			>
				<Container maxWidth="lg">
					<Header />
					<MainNavigation />
					<Grid container>{children}</Grid>
				</Container>
				<Box sx={{p: 4}}>
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

					{/* <Button variant="contained" color="primary" onClick={changeColor}>
						Apply
					</Button> */}
				</Box>
				<Footer />
			</Box>
		</ThemeProvider>
	);
}
