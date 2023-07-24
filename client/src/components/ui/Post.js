import {Box, Typography, Button, Grid} from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
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
		<Grid item xs={12} sm={6} md={6} paddingRight={'32px'}>
			<Box
				sx={{
					p: 6,
					border: 1,
					borderColor: 'grey.200',
					borderRadius: 1,
					boxShadow: 1,
					backgroundColor: 'grey.200',
				}}
			>
				<Typography
					variant="h4"
					component="h2"
					mb={2}
					sx={{fontWeight: 'bold'}}
				>
					{title}
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					mb={5}
					sx={{
						position: 'relative',
						maxHeight: readMore ? '100%' : '100px',
						overflow: 'hidden',
						transition: '1s',
						'&:after': {
							content: description.length > 150 ? '""' : 'none',
							textAlign: 'right',
							position: 'absolute',
							bottom: 0,
							right: 0,
							width: '50%',
							height: '50%',
							// backgroundImage: readMore
							// 	? 'none'
							// 	: 'linear-gradient(to bottom, rgba(118, 118, 118, 0), rgba(118, 118, 118, 1) 100%)',
							pointerEvents: 'none',
						},
					}}
				>
					{readMore
						? description
						: `${description.substring(0, 150)}${
								description.length > 150 ? '...' : ''
						  }`}
				</Typography>
				<Typography variant="body2" component="p" fontWeight="bold" mb={5}>
					{formatDateCzech.format(new Date(date_created))}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Box sx={{display: 'flex', alignItems: 'center'}}>
						<Typography variant="subtitle1">{author}</Typography>
					</Box>
					{description.length > 150 ? (
						<Button
							endIcon={<ArrowForward />}
							color="primary"
							size="small"
							onClick={handleClick}
						>
							{readMore ? 'Méně ...' : 'Více ...'}
						</Button>
					) : (
						<></>
					)}
				</Box>
			</Box>
		</Grid>
	);
}
