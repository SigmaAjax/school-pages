//import AlbumList from '../components/ui/Gallery/AlbumList';

import {ImageList, ImageListItem, Stack} from '@mui/material';
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
		<Stack spacing={4} sx={{margin: 2}}>
			<ImageList
				sx={{width: 700, height: 450}}
				cols={3}
				rowHeight={164}
				gap={25}
				variant="masonry"
			>
				{albums.map((album) => {
					return <AlbumCardUser key={album.id} {...album} />;
				})}
			</ImageList>
		</Stack>
	);
}
