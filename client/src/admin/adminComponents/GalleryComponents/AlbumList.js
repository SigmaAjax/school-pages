import axios from 'axios';
import {useEffect, useState} from 'react';
import AlbumCard from './AlbumDetail/AlbumCard';

import styles from './../../../pages/admin.module.css';
import {Grid} from '@mui/material';
import {Loader} from '../../../Loader';
import {useAdmin, useAdminUpdate} from '../../../context/AdminContext';

export default function AlbumList() {
	const {album, albumList} = useAdmin();
	const {setAlbum, setButtonName, setIsOpenModal, setAlbumList} =
		useAdminUpdate();
	const [albums, setAlbums] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleDelete = (event, content) => {
		setButtonName(() => event.target.name);
		setAlbum(() => {
			return {...content, page: 'list-page'};
		});
		setIsOpenModal((prev) => !prev);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading((prev) => !prev);
				// adding delay
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const response = await axios.get('/api/get/albums');
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
				setAlbumList(updatedAlbums);
				setLoading((prev) => !prev);
			} catch (error) {
				console.log(error);
				setError(error);
				setLoading((prev) => !prev);
			} finally {
				console.log('data fetched');
				//console.log(albums);
			}
		};
		fetchData();
		return () => {
			console.log('clean up function');
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
		<div className={`${styles.item} ${styles.albumListContainer}`}>
			<h1>Jednotlivá Alba</h1>

			<Grid container backgroundColor={'#2196f3'}>
				{albumList.map((album) => (
					<AlbumCard
						key={album.album_title}
						content={album}
						onDelete={handleDelete}
					/>
				))}
			</Grid>
		</div>
	);
}
