import {
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Stack,
	Link,
} from '@mui/material';
import AlbumModal from './AlbumModal';
import {useState} from 'react';

export default function AlbumCardUser(album) {
	const [modalOpen, setModalOpen] = useState(false);

	const renderPicture = (picture) =>
		picture.intro && (
			<img
				src={`${picture.secure_url}?w=164&h=164&fit=crop&auto=format&dpr=2`}
				srcSet={`${picture.secure_url}?w=161&fit=crop&auto=format&dpr=2 2x`}
				alt={picture.name}
				loading="lazy"
			/>
		);

	const renderAlbum = (album) => {
		const introPicture = album.arrayOfPictures.find((picture) => picture.intro);
		return introPicture && renderPicture(introPicture);
	};

	const handleOpen = (event) => {
		event.preventDefault(); // to prevent the browser from navigating to the new page
		setModalOpen((prev) => !prev);
	};

	return (
		<>
			<Link
				underline="none"
				sx={{'&:hover': {opacity: 0.8}, cursor: 'pointer'}} // hover effect
				onClick={handleOpen}
			>
				<ImageListItem>
					{renderAlbum(album)}
					<ImageListItemBar title={album.album_title} position="bottom" />
				</ImageListItem>
				<AlbumModal open={modalOpen} onClose={handleOpen} album={album} />
			</Link>
		</>
	);
}
