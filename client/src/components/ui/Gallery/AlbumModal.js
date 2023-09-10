import React, {useState} from 'react';
import {
	Modal,
	Box,
	Button,
	Typography,
	IconButton,
	Fade,
	ImageList,
	ImageListItem,
	Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

export default function AlbumModal({open, onClose, album}) {
	const [zoomView, setZoomView] = useState({open: false, index: 0});
	const [transition, setTransition] = useState(false);

	const handleClose = () => {
		onClose();
	};

	const handleImageClick = (index) => {
		setZoomView({open: true, index});
	};

	const handleZoomClose = () => {
		setZoomView({open: false, index: 0});
	};

	const nextImage = () => {
		setTransition(true);
		setTimeout(() => setTransition(false), 400);
		setZoomView((prev) => {
			const nextIndex = (prev.index + 1) % album.arrayOfPictures.length;
			return {open: true, index: nextIndex};
		});
	};

	const prevImage = () => {
		setTransition(true);
		setTimeout(() => setTransition(false), 400);
		setZoomView((prev) => {
			const prevIndex =
				(prev.index - 1 + album.arrayOfPictures.length) %
				album.arrayOfPictures.length;
			return {open: true, index: prevIndex};
		});
	};

	const currentImageUrl = album.arrayOfPictures[zoomView.index]?.secure_url;

	console.log({currentImage: currentImageUrl});

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
								onClick={() =>
									handleImageClick(album.arrayOfPictures.indexOf(photo))
								}
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

					<IconButton
						onClick={prevImage}
						sx={{position: 'absolute', left: 8, top: '50%'}}
					>
						<ArrowBackIcon />
					</IconButton>

					<TransitionGroup>
						<CSSTransition key={zoomView.index} timeout={500} classNames="fade">
							<Slide direction="left" in={zoomView}>
								<img
									src={currentImageUrl}
									alt="Zoom view"
									style={{width: '100%'}}
								/>
							</Slide>
						</CSSTransition>
					</TransitionGroup>

					<IconButton
						onClick={nextImage}
						sx={{position: 'absolute', right: 8, top: '50%'}}
					>
						<ArrowForwardIcon />
					</IconButton>
				</Box>
			</Modal>
		</>
	);
}
