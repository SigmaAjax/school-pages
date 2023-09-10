//import AlbumList from '../components/ui/Gallery/AlbumList';

import {
	Box,
	Container,
	Grid,
	ImageList,
	ImageListItem,
	Stack,
	Typography,
} from '@mui/material';
import {useEffect, useState} from 'react';
import {Loader} from '../Loader';
import axios from 'axios';
import AlbumCardUser from '../components/ui/Gallery/AlbumCardUser';

export default function AlbumPage() {
	const [albums, setAlbums] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const url =
		process.env.NODE_ENV === 'production'
			? `${process.env.REACT_APP_BACKEND_URL}/api/get/albums`
			: '/api/get/albums';

	useEffect(() => {
		const source = axios.CancelToken.source();

		const fetchAlbums = async () => {
			try {
				setLoading((prev) => !prev);
				// adding delay
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const response = await axios.get(url);
				console.log({response: response});
				const rawAlbums = response.data;

				// code below is casting data from TINYINT  back into boolean value
				const updatedAlbums = await rawAlbums.map((album) => {
					const updatedAlbum = {...album};

					updatedAlbum.arrayOfPictures = updatedAlbum.arrayOfPictures.map(
						(picture) => {
							const updatedPicture = {...picture};
							updatedPicture.intro = !!updatedPicture.intro;
							return updatedPicture;
						}
					);
					return updatedAlbum;
				});
				setAlbums(updatedAlbums);
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setLoading((prev) => !prev);
				console.log('data fetched');
				console.table(albums);
			}
		};
		fetchAlbums();
		return () => {
			source.cancel('Operation canceled by user.');
		};
	}, []);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return (
			<div>
				<p>Nepodařilo se načíst žádné album</p>
				<p>
					Error code: {error.code} - {error.message}
				</p>
			</div>
		);
	}

	return (
		<>
			<Box
				sx={{
					marginTop: 10,
					bgcolor: 'background.paper',
					pt: 8,
					pb: 6,
					borderRadius: '16px',
				}}
			>
				<Container maxWidth="lg">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="text.primary"
						gutterBottom
					>
						Alba
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="text.secondary"
						paragraph
					>
						Něco krátkého a stručného o níže uvedené kolekci—jejím obsahu atd.
						Buďte struční, ale ne tak struční, aby to lidé úplně přeskočili.
					</Typography>
				</Container>
			</Box>
			<Container sx={{py: 8}} maxWidth="lg">
				<Grid container spacing={4}>
					{albums.map((album) => {
						return (
							<Grid item key={album.id} xs={12} sm={6} md={4}>
								<AlbumCardUser {...album} />
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</>
	);
}
