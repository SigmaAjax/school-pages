import {
	Typography,
	Button,
	Grid,
	CardActionArea,
	Card,
	CardContent,
	Box,
} from '@mui/material';
import {useState} from 'react';

export default function Post(props) {
	const {
		title,
		post_text: description,
		date_updated: date_created,
		user_name: author,
	} = props;

	const formatDateCzech = new Intl.DateTimeFormat('cs-cz', {
		dateStyle: 'long',
	});

	const [readMore, setReadMore] = useState(false);

	const handleClick = () => {
		setReadMore((prev) => !prev);
	};

	return (
		<Grid item xs={12} sm={6} md={6} padding={'32px'}>
			<CardActionArea>
				<Card sx={{display: 'flex', boxShadow: '0px 5px 15px rgba(0,0,0,0.3)'}}>
					<CardContent sx={{flex: 1}}>
						<Typography component="h2" variant="h5">
							{title}
						</Typography>

						<Typography
							variant="subtitle1"
							paragraph
							paddingLeft={2}
							paddingTop={2}
							minHeight={'72px'}
						>
							{readMore
								? description
								: `${description.substring(0, 40)}${
										description.length > 40 ? '...' : ''
								  }`}
						</Typography>
						<Button
							sx={{
								visibility: description.length > 40 ? 'visible' : 'hidden',
								paddingBottom: 1,
							}}
							color="primary"
							size="small"
							onClick={handleClick}
						>
							{readMore ? 'Méně ...' : 'Více ...'}
						</Button>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
							}}
						>
							<Typography variant="body2" component="p" fontWeight="bold">
								Vytvořeno: {formatDateCzech.format(new Date(date_created))}
							</Typography>
							<Typography variant="subtitle1"> {author}</Typography>
						</Box>
					</CardContent>
				</Card>
			</CardActionArea>
		</Grid>
	);
}
