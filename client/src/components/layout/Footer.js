import React from 'react';
import {Box, Typography, Grid, IconButton, Link} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import FooterMapBox from '../ui/FooterMapBox';

export default function Footer() {
	return (
		<Box sx={{bgcolor: '#333', color: 'white', padding: '3rem'}}>
			<Grid container spacing={3}>
				<Grid item xs={7}>
					<Grid item xs={12} paddingBottom={5}>
						<Typography variant="h6" paddingBottom={2}>
							Základní škola a Mateřská škola Libotenice
						</Typography>
						<Typography variant="body1" marginLeft={2}>
							<strong>Adresa</strong> <br />
							Libotenice 58 <br />
							412 01, Libotenice
						</Typography>
					</Grid>

					<Grid item xs={12} paddingBottom={3}>
						{' '}
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
					</Grid>
					<Box display="inline" pr={1}>
						<IconButton
							href="https://www.facebook.com"
							target="_blank"
							rel="noopener noreferrer"
							color="primary"
						>
							<FacebookIcon />
						</IconButton>
						<Link
							href="https://www.facebook.com"
							target="_blank"
							rel="noopener noreferrer"
							color="primary"
							underline="hover"
						>
							<Typography display={'inline'}>
								najdete nás na Facebooku
							</Typography>
						</Link>
					</Box>
				</Grid>
				{/* FooterMapBox xs= 4 */}
				<FooterMapBox />
			</Grid>

			<Typography variant="body2" align="center" style={{marginTop: '3rem'}}>
				<hr />
				&copy; {new Date().getFullYear()} &middot; Sigma Ajax.
			</Typography>
		</Box>
	);
}
