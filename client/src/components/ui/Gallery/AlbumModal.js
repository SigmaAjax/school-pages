import {
	Modal,
	Box,
	ImageList,
	ImageListItem,
	Button,
	Typography,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react';

export default function AlbumModal({open, onClose, album}) {
	const [zoomView, setZoomView] = useState({open: false, imageUrl: ''});
	const handleClose = () => {
		onClose();
	};

	const handleImageClick = (newImageUrl) => {
		setZoomView((prev) => {
			const open = !prev.open;
			return {open: open, imageUrl: newImageUrl};
		});
	};

	const handleZoomClose = () => {
		setZoomView((prev) => {
			const open = !prev.open;
			return {open: open, imageUrl: ''};
		});
	};

	return (
		<>
			<Modal
				open={open}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box
					sx={{
						width: '80%',
						height: '80%',
						bgcolor: 'white',
						borderRadius: 2,
						boxShadow: 24,
						p: 4,
						position: 'relative',
						overflow: 'auto',
					}}
				>
					<Button
						variant="contained" // a button with a background color
						color="error"
						onClick={handleClose}
						sx={{
							position: 'absolute',
							top: 20,
							right: 20,
							textTransform: 'none', // remove uppercase transform
						}}
					>
						Zavřít
					</Button>
					<Typography
						variant="h4"
						align="center"
						paddingBottom={20}
						paddingTop={10}
					>
						{album.album_title}
					</Typography>
					<ImageList
						variant="woven"
						sx={{width: '100%', height: 450}}
						cols={3}
						gap={15}
					>
						{album.arrayOfPictures.map((photo) => (
							<ImageListItem
								key={photo.secure_url}
								onClick={() => handleImageClick(photo.secure_url)}
								sx={{cursor: 'pointer'}}
							>
								<img
									src={`${photo.secure_url}?w=248&fit=crop&auto=format`}
									srcSet={`${photo.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
									alt={photo.name}
									loading="lazy"
								/>
							</ImageListItem>
						))}
					</ImageList>
				</Box>
			</Modal>
			<Modal
				open={zoomView.open}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box
					sx={{
						width: '80%',
						height: '80%',
						bgcolor: 'white',
						borderRadius: 2,
						boxShadow: 24,
						p: 4,
						position: 'relative',
						overflow: 'auto',
					}}
				>
					<IconButton
						onClick={handleZoomClose}
						sx={{
							position: 'absolute',
							top: 8,
							right: 8,
							color: 'error',
							'&:hover': {
								transform: 'scale(1.2)',
							},
						}}
					>
						<CloseIcon />
					</IconButton>

					<img
						src={zoomView.imageUrl}
						alt="Zoom view"
						style={{width: '100%', paddingTop: '10px'}}
					/>
				</Box>
			</Modal>
		</>
	);
}
