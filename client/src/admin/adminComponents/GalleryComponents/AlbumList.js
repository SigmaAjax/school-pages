import axios from 'axios';
import {useEffect, useState} from 'react';
import AlbumCard from './AlbumDetail/AlbumCard';

import styles from './../../../pages/admin.module.css';

export default function AlbumList() {
	const [albums, setAlbums] = useState([]);
	//const [photos, setPhotos] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
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
				setAlbums(updatedAlbums);
			} catch (error) {
				console.log(error);
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

	return (
		<>
			<h1>Jednotlivá Alba</h1>
			<div className={`${styles.item} ${styles.two}`}>
				{albums.map((album) => (
					<AlbumCard key={album.album_title} content={album} />
				))}
			</div>
		</>
	);
}
