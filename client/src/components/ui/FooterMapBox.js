import {Box, IconButton, Typography, Grid} from '@mui/material';
import GoogleMapsIcon from '../../images/GoogleMapsIcon';

const FooterMapBox = () => {
	return (
		<Grid
			item
			xs={5}
			sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
		>
			<Grid item>
				<IconButton
					href="https://www.google.com/maps/place/Z%C3%A1kladn%C3%AD+%C5%A0kola+a+Mate%C5%99sk%C3%A1+%C5%A1kola+Libotenice/@50.4767432,14.2312968,15z/data=!4m2!3m1!1s0x0:0x7e7d0cfb59f0b51b?sa=X&ved=2ahUKEwi08ryo7s__AhX3hP0HHTvwDBoQ_BJ6BAhHEAg"
					target="_blank"
					color="inherit"
					sx={{
						position: 'relative',
						'&:hover': {
							'& div': {
								backgroundColor: '#ffa307',
								transition: 'all 0.25s linear 0s',
							},
						},
					}}
				>
					<Box
						sx={{
							fontSize: '1.111rem',
							fontWeight: 700,
							backgroundColor: '#FFBF53',
							textDecoration: 'underline',
							color: '#000',
							padding: '1.333rem 2.278rem 1.444rem 1.944rem',
							borderRadius: '50px',
							position: 'absolute',
							top: '47px',
							left: '95px',
							whiteSpace: 'nowrap',
						}}
					>
						<Typography
							sx={{
								paddingLeft: '1.333rem',
								transition: 'font-weight 0.25s linear',
								fontFamily: '"Arial", sans-serif', // Change this to your preferred font
								fontWeight: 'Bold',
							}}
						>
							Zobrazit na mapě
						</Typography>
					</Box>
					<GoogleMapsIcon
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 64 64"
						sx={{
							transition: 'transform 0.25s linear',
							right: '10px', // adjust this value as needed
							top: '10px', // adjust this value as needed
							zIndex: 1,
							'&:hover': {
								transform: 'scale(1.05)', // scales the icon on hover
							},
						}}
					/>
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default FooterMapBox;
