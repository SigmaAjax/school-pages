import axios from 'axios';
import {useEffect, useState, useRef} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../../../context/AdminContext';
import useSlugify from 'client/src/Hooks/useSlugify.js';

import DeleteAlbumButton from '../AlbumDetail/DeleteAlbumButton.js';
import SubmitAlbumButton from '../SubmitAlbumButton';
import AlbumDescription from './AlbumDescription';
import CloudinaryImageCardsList from './CloudinaryImageCardsList';

export default function AlbumDetail() {
	const {album} = useAdmin();
	const {setIsOpenModal, setButtonName, setAlbum} = useAdminUpdate();
	/// usState and Params
	const [photos, setPhotos] = useState([]);
	const {id, albumSlug} = useParams();
	//ref for admin form
	const title = useRef();
	const description = useRef();
	/// custum hooks
	const {slugify} = useSlugify();

	const date = new Date().toISOString().substring(0, 19); // substring for MySql server;

	const datumUpdated = new Date(album?.date_updated);

	const formatDateCzech = new Intl.DateTimeFormat('cs-cz', {
		dateStyle: 'full',
		timeStyle: 'short',
	});
	console.log(
		`/api/get/album/${encodeURIComponent(id)}/${encodeURIComponent(albumSlug)}`
	);

	useEffect(() => {
		const fetchOneAlbum = async () => {
			try {
				// adding delay of 1 second
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const response = await axios.get(
					`/api/get/album/${encodeURIComponent(id)}/${encodeURIComponent(
						albumSlug
					)}`
				);

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

	const handleSubmit = (e) => {
		e.preventDefault();

		setButtonName(() => {
			return 'album-update';
		});

		setAlbum((prev) => {
			const updatedAlbum = {
				...prev,
				date_updated: date,
				album_title: title?.current.value,
				description: description?.current.value,
				slug: slugify(title?.current.value),
				arrayOfPictures: photos,
			};
			return updatedAlbum;
		});

		setIsOpenModal((prev) => !prev);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		console.log('delete done...', e.target.name);

		setButtonName(() => {
			return e.target.name;
		});
	};
	return (
		<>
			<form className="item one" onSubmit={handleSubmit}>
				{/* Album headers part */}
				<AlbumDescription album={album} heading={{title, description}} />
				{/* Album's list of photos */}
				<CloudinaryImageCardsList photosList={photos} setPhotos={setPhotos} />

				{album && album.date_created ? (
					<p>
						Naposledy upravováno v:{' '}
						<strong>{formatDateCzech.format(datumUpdated)}</strong>
					</p>
				) : (
					<strong>Chybí Datum poslední úpravy v databázi</strong>
				)}
				<button
					type="button"
					onClick={() => {
						const {arrayOfPictures, ...rest} = album;
						const adjustedAlbum = {...rest, arrayOfPictures: photos};
						console.log('Album created with images: ');

						console.table(adjustedAlbum);
					}}
				>
					odeslat
				</button>
				<SubmitAlbumButton images={photos} />
			</form>
			<Link to="/admin/galerie">Back to the List of Albums</Link>
			<DeleteAlbumButton images={photos} handleDelete={handleDelete} />
		</>
	);
}
