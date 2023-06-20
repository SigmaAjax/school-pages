import React from 'react';
import {Box, Typography, Grid, IconButton} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer() {
	return (
		<Box sx={{bgcolor: 'primary.main', color: 'white', padding: '3rem'}}>
			<Grid container spacing={3}>
				<Grid item xs={8}>
					<Typography variant="h6">
						Základní škola a Mateřská škola Libo
					</Typography>
					<Typography variant="body1">
						<strong>Adresa</strong> <br />
						Chbany 20 <br />
						431 57, Chbany
					</Typography>

					<IconButton href="tel:+4207777777" title="Zavolat" color="inherit">
						<PhoneIcon /> <Typography>+420 777 777 777</Typography>
					</IconButton>
					<IconButton
						href="mailto:reditel@motlova.cz"
						title="Napsat e-mail"
						color="inherit"
					>
						<EmailIcon /> <Typography>reditel@Motlova.cz</Typography>
					</IconButton>
					<IconButton
						href="https://www.facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						color="inherit"
					>
						<FacebookIcon /> <Typography>najdete nás na Facebooku</Typography>
					</IconButton>
				</Grid>
				<Grid item xs={4}>
					<IconButton
						href="https://www.google.com/maps/place/Z%C3%A1kladn%C3%AD+%C5%A0kola+a+Mate%C5%99sk%C3%A1+%C5%A1kola+Libotenice/@50.4767432,14.2312968,15z/data=!4m2!3m1!1s0x0:0x7e7d0cfb59f0b51b?sa=X&ved=2ahUKEwi08ryo7s__AhX3hP0HHTvwDBoQ_BJ6BAhHEAg"
						target="_blank"
						color="inherit"
					>
						<img src="client/public/icons8-google-maps-old.svg" alt="Mapa" />
						<Typography>Zobrazit na mapě</Typography>
					</IconButton>
				</Grid>
			</Grid>
			<Typography variant="body2" align="center" style={{marginTop: '3rem'}}>
				<hr />
				&copy; {new Date().getFullYear()} &middot; Sigma Ajax.
			</Typography>
		</Box>
	);
}
