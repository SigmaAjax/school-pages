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
					<Typography variant="h6" gutterBottom>
						<strong>Základní škola a Mateřská škola Libotenice</strong>
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6} style={{textAlign: 'right'}}>
					<Box display="inline" pr={1}>
						<IconButton
							href="tel:+420777777777"
							title="Zavolat"
							color="primary"
						>
							<PhoneIcon />
						</IconButton>
						<Link href="tel:+420777777777" color="primary" underline="hover">
							<Typography display="inline">+420 777 777 777</Typography>
						</Link>
					</Box>
					<Box display="inline" pr={1}>
						<IconButton
							href="mailto:reditel@motlova.cz"
							title="Napsat e-mail"
							color="primary"
						>
							<EmailIcon />
						</IconButton>
						<Link
							href="mailto:reditel@motlova.cz"
							color="primary"
							underline="hover"
						>
							<Typography display="inline">reditel@motlova.cz</Typography>
						</Link>
					</Box>
					<IconButton
						href="https://www.facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						color="primary"
						underline="hover"
					>
						<FacebookIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Container>
	);
}
