import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	Box,
} from '@mui/material';
import AlbumModal from './AlbumModal';
import {useState} from 'react';

export default function AlbumCardUser(album) {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = () => {
		setModalOpen((prev) => !prev);
	};

	const introPicture = album.arrayOfPictures.find((picture) => picture.intro);
	const imageUrl = introPicture
		? introPicture.secure_url
		: 'https://via.placeholder.com/150';

	const datum = new Date(album.date_created);
	const formatDateCzech = new Intl.DateTimeFormat('cs-cz', {dateStyle: 'long'});

	return (
		<Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
			<CardMedia
				component="div"
				sx={{height: 0, paddingTop: '56.25%'}} // 16:9 ratio
				image={imageUrl}
				alt={album.album_title}
			/>
			<CardContent sx={{flexGrow: 1}}>
				<Typography gutterBottom variant="h5" component="h2">
					{album.album_title}
				</Typography>
				{album.description ? (
					<Typography>{album.description}</Typography>
				) : (
					<Typography>Bez popisku</Typography>
				)}
			</CardContent>
			<CardActions sx={{justifyContent: 'space-between'}}>
				<Button size="small" onClick={handleModal}>
					Náhled
				</Button>
				<Box>
					<Typography variant="caption" color="text.secondary">
						{formatDateCzech.format(datum)}
					</Typography>
				</Box>
			</CardActions>
			<AlbumModal open={modalOpen} onClose={handleModal} album={album} />
		</Card>
	);
}
