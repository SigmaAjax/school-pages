import {AdvancedImage} from '@cloudinary/react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

import MainPhotoCheckbox from '../MainPhotoCheckbox';
import CloudinaryImageCardsList from './CloudinaryImageCardsList';

export default function AlbumDetail() {
	const [album, setAlbum] = useState({});
	const [photos, setPhotos] = useState([]);
	const {id, albumSlug} = useParams();

	const datumCreated = new Date(album.date_created);

	const datumUpdated = new Date(album.date_updated);

	const formatDateCzech = new Intl.DateTimeFormat('cs-cz', {
		dateStyle: 'full',
		timeStyle: 'short',
	});

	useEffect(() => {
		const date = new Date().toISOString().substring(0, 19); // substring for MySql server;

		const fetchOneAlbum = async () => {
			try {
				// adding delay of 1 second
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const response = await axios.get(`/api/get/album/${id}/${albumSlug}`);

				const {arrayOfPictures, ...rawAlbum} = response.data[0];

				// code below is casting data from TINYINT  back into boolean value

				const updatePictures = await arrayOfPictures.map((picture) => {
					const pictureCopy = {...picture};
					//renaming due to convention intro is backend and introductionary is frontend
					pictureCopy.introductionary = !!pictureCopy.intro;
					// deleting old  backend value in oder to avoid conflickt
					delete pictureCopy.intro;
					return pictureCopy;
				});
				setPhotos(updatePictures);
				setAlbum({...rawAlbum, arrayOfPictures: updatePictures});
			} catch (error) {
				console.log(error.message);
			} finally {
				console.log('fetch done...');
			}
		};
		fetchOneAlbum();
	}, []);
	//console.log('one check is ...', oneCheck);
	console.table(photos);
	return (
		<>
			<div>
				<h1>{album.album_title}</h1>
				{album.date_created ? (
					<p>
						Vytvořeno v: <strong>{formatDateCzech.format(datumCreated)}</strong>
					</p>
				) : (
					<strong>Chybí Datum v databázi</strong>
				)}
			</div>
			<CloudinaryImageCardsList photosList={photos} setPhotos={setPhotos} />

			{album.date_created ? (
				<p>
					Naposledy upravováno v:{' '}
					<strong>{formatDateCzech.format(datumUpdated)}</strong>
				</p>
			) : (
				<strong>Chybí Datum poslední úpravy v databázi</strong>
			)}

			<Link to="/admin/galerie">Back to the List of Albums</Link>
		</>
	);
}
