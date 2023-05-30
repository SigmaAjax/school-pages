import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Box,
} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';

export default function AlbumCard({content, onDelete}) {
	const renderPicture = (picture) =>
		picture.intro && (
			<CardMedia
				component="img"
				sx={{
					height: '100%',
					width: '100%',
					objectFit: 'contain',
				}}
				loading="lazy"
				image={picture.secure_url}
				alt="Fotografie z alba"
			/>
		);

	const renderAlbum = (album) => {
		const introPicture = album.arrayOfPictures.find((picture) => picture.intro);
		return introPicture && renderPicture(introPicture);
	};

	return (
		<Grid item xs={12} sm={6} md={4} lg={3} sx={{marginBottom: 2, padding: 1}}>
			<Card
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minWidth: 200,
					height: '100%',
				}}
			>
				<CardActionArea
					component={RouterLink}
					to={`/admin/galerie/${content.album_id}/${content.slug}`}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flexGrow: 1,
						justifyContent: 'space-between',
					}}
				>
					<Box
						sx={{
							flexGrow: 2,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{renderAlbum(content)}
					</Box>
					<CardContent sx={{flexGrow: 1}}>
						<Typography variant="h6" component="div" align="center">
							{content.album_title}
						</Typography>
					</CardContent>
				</CardActionArea>
				<Box
					sx={{
						flexGrow: 1,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: 2,
					}}
				>
					<Button
						variant="contained"
						color="error"
						name="delete-album"
						onClick={(event) => onDelete(event, content)}
					>
						Vymazat album
					</Button>
				</Box>
			</Card>
		</Grid>
	);
}
