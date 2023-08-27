import React from 'react';
import {
	Container,
	Grid,
	Typography,
	IconButton,
	Box,
	Link,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Header() {
	return (
		<Container style={{marginBottom: '10px', marginTop: '25px'}}>
			<Grid container>
				<Grid item xs={12} sm={6}>
					<Typography
						variant="h6"
						gutterBottom
						style={{textShadow: '2px 2px 4px #000', color: 'white'}}
					>
						<strong>Základní škola a Mateřská škola Libotenice</strong>
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6} md={6} style={{textAlign: 'right'}}>
					<Box
						display="inline-flex"
						alignItems="center"
						pr={1}
						sx={{
							'&:hover': {
								opacity: 0.9, // 10% lighter
								transform: 'scale(1.1)', // 10% larger
							},
							transition:
								'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
						}}
					>
						<IconButton
							href="tel:+420777777777"
							title="Zavolat"
							sx={{
								color: '#d1c4e9',
							}}
						>
							<PhoneIcon />
						</IconButton>
						<Link
							href="tel:+420777777777"
							color="primary"
							underline="hover"
							sx={{color: '#d1c4e9'}}
						>
							<Typography display="inline">+420 777 777 777</Typography>
						</Link>
					</Box>
					<Box
						display="inline-flex"
						alignItems="center"
						pr={1}
						sx={{
							'&:hover': {
								opacity: 0.9, // 10% lighter
								transform: 'scale(1.1)', // 10% larger
							},
							transition:
								'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
						}}
					>
						<IconButton
							href="mailto:reditel@motlova.cz"
							title="Napsat e-mail"
							sx={{color: '#d1c4e9'}}
						>
							<EmailIcon />
						</IconButton>
						<Link
							href="mailto:reditel@motlova.cz"
							underline="hover"
							sx={{color: '#d1c4e9'}}
						>
							<Typography display="inline">reditel@motlova.cz</Typography>
						</Link>
					</Box>
					<Box
						display="inline-flex"
						alignItems="center"
						pr={1}
						sx={{
							'&:hover': {
								opacity: 0.8,
								transform: 'scale(1.2)',
							},
							transition:
								'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
						}}
					>
						<IconButton
							href="https://www.facebook.com"
							target="_blank"
							rel="noopener noreferrer"
							underline="hover"
							sx={{color: '#d1c4e9'}}
						>
							<FacebookIcon />
						</IconButton>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}
