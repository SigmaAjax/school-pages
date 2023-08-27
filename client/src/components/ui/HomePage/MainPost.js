import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SentimentVerySatisfiedSharpIcon from '@mui/icons-material/SentimentVerySatisfiedSharp';
import {yellow} from '@mui/material/colors';

export default function MainFeaturedPost() {
	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
				backgroundColor: 'rgba(0, 0, 0, 0.4)',
				color: '#fff',
				mb: 4,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				padding: '17px 20px 22px 20px',
				borderRadius: '12px',
				marginTop: '15px',
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					right: 0,
					left: 0,
				}}
			/>
			<Grid container>
				<Grid item md={6}>
					<Box
						sx={{
							position: 'relative',
							p: {xs: 3, md: 6},
							pr: {md: 0},
						}}
					>
						<Typography
							component="h1"
							variant="h3"
							color="inherit"
							gutterBottom
							sx={{textShadow: '2px 2px 4px #000'}}
						>
							O škole
						</Typography>
						<Typography
							variant="h4"
							color="inherit"
							paragraph
							sx={{textShadow: '2px 2px 4px #000'}}
						>
							<Typography variant="body1" color="inherit" paragraph>
								Jsme malotřídní školou a školkou rodinného typu, ve kterém dbáme
								na přátelské a bezpečné klima. Využíváme výhod venkovského
								prostředí a zároveň držíme krok s dnešní moderní dobou. Naší
								snahou je nenásilnou a hravou formou připravit děti do jejich
								dalších škol života{' '}
								<SentimentVerySatisfiedSharpIcon
									sx={{
										color: yellow[500],
										fontSize: 'inherit', // This will make it the same size as surrounding text
										verticalAlign: 'middle', // This will vertically align the icon with the text
									}}
								/>
							</Typography>
							<Typography variant="body1" color="inherit" paragraph>
								Základní škola a mateřská škola sdružuje 4 součásti: základní
								školu, mateřskou školu, školní družinu a školní jídelnu –
								výdejnu.
							</Typography>
							<Typography variant="body1" color="inherit" paragraph>
								V letošním školním roce je ve škole 5 ročníků se 45 žáky, kteří
								jsou rozděleni do třech tříd. Žáky vedeme dle ŠVP pro ZV "Cesta
								k dětem". Škola nabízí logopedickou poradnu a zájmové kroužky.
							</Typography>
							<Typography variant="body1" color="inherit" paragraph>
								Mateřská škola je jednotřídní přímo v prostorách školy – je zde
								velkou výhodou přirozený přestup na základní školu. V tento rok
								máme ve školce 8 dětiček.
							</Typography>
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
}
