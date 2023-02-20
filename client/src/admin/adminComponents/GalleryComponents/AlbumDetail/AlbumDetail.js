import axios from 'axios';
import {useDropzone} from 'react-dropzone';
import {useEffect, useState, useRef, useCallback} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../../../context/AdminContext';
import useSlugify from 'client/src/Hooks/useSlugify.js';

import AddPhotosDropzone from '../AddPhotosDropzone';
import DeleteAlbumButton from '../AlbumDetail/DeleteAlbumButton.js';
import SubmitAlbumButton from '../SubmitAlbumButton';
import AlbumDescription from './AlbumDescription';
import CloudinaryImageCardsList from './CloudinaryImageCardsList';
import ErrorMsg from 'client/src/admin/adminComponents/GalleryComponents/ErrorMsg.js';

export default function AlbumDetail() {
	const {album} = useAdmin();
	const {setIsOpenModal, setButtonName, setAlbum} = useAdminUpdate();
	/// usState and Params
	const [warningMessage, setWarningMessage] = useState('');
	/// Photos state
	const [addNewPhotos, setAddNewPhotos] = useState(false);
	//const [newImages, setNewImages] = useState([]);
	const [photos, setPhotos] = useState([]);
	const {id, albumSlug} = useParams();
	//ref for admin form
	const title = useRef();
	const description = useRef();
	/// custum hooks
	const {slugify} = useSlugify();

	const date = new Date().toISOString().substring(0, 19); // substring for MySql server;

	const datumUpdated = new Date(album?.date_updated);

	////////// These variables are used for user safety ... in order to prevent sending same album
	const albumOriginalTitle = album?.album_title;
	const albumOriginalDescription = album?.description;
	const albumLength = photos?.length;

	const formatDateCzech = new Intl.DateTimeFormat('cs-cz', {
		dateStyle: 'full',
		timeStyle: 'short',
	});

	//// Callback creating images and checking for duplicates
	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		let uniqueImages = [];
		acceptedFiles.forEach((file) => {
			// how to get rid of duplicate from react state

			const uniqueIds = [];
			const arrImages = [...uniqueImages, file];

			uniqueImages = arrImages.filter((file) => {
				const isDuplicate = uniqueIds.includes(file.name);

				if (!isDuplicate) {
					uniqueIds.push(file.name);

					return true;
				}
				return false;
			});
			return uniqueImages;
		});

		uniqueImages.map((image) => {
			const reader = new FileReader();

			reader.onload = () => {
				const imageUrlAsObj = {
					name: image.name,
					lastModified: image.lastModified,
					lastModifiedDate: image.lastModifiedDate,
					size: image.size,
					type: image.type,
					secure_url: reader.result,
					introductionary: false,
				};

				setPhotos((prev) => {
					/// creating key: value pair url: reader.result
					const uniqueNames = [];
					const arrImages = [...prev, imageUrlAsObj];

					const uniqueImagesURL = arrImages.filter((imageURL) => {
						const isDuplicate = uniqueNames.includes(imageURL.name);

						if (!isDuplicate) {
							uniqueNames.push(imageURL.name);
							return true;
						}
						return false;
					});
					return uniqueImagesURL;
				});
			};
			return reader.readAsDataURL(image);
		});
		// console.log('accepted files', acceptedFiles);
		// console.log('rejected files', rejectedFiles);
	}, []);

	const {fileRejections, getRootProps, getInputProps, isDragActive} =
		useDropzone({
			onDrop,
			accept: {'image/*': []},
			maxFiles: 50 - albumLength,
		});

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

		if (
			albumOriginalTitle === title.current.value &&
			albumOriginalDescription === description.current.value
		) {
			console.log('warning');
			setWarningMessage(() => {
				return `Nemůžete odeslat album se stejným názvem a popisem \nVáš název: ${albumOriginalTitle} \nnebo Váš popis musí být jiný než ${
					albumOriginalDescription === ''
						? 'prázdný popis'
						: albumOriginalDescription
				}`;
			});
		} else {
			console.log('not warning');
			setWarningMessage(() => {
				return '';
			});
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
		}
	};

	const handleDelete = (e) => {
		console.log(
			albumOriginalTitle === album.album_title &&
				albumOriginalDescription === album.album_description
		);
		if (
			albumOriginalTitle === album.album_title &&
			albumOriginalDescription === album.album_description
		) {
			alert('You cannot send album with same title and description');
		}
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
				<button
					type="button"
					onClick={(e) => {
						setAddNewPhotos((prev) => !prev);
					}}
				>
					{addNewPhotos ? 'Zrušit přidání nových fotek' : 'Přidat nové fotky'}
				</button>
				{addNewPhotos && (
					<AddPhotosDropzone
						isDragActive={isDragActive}
						photos={photos}
						getRootProps={getRootProps}
						getInputProps={getInputProps}
						fileRejections={fileRejections}
					/>
				)}
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
				{/* Warning in order to prevent send the same title and description as original one */}
				{warningMessage && (
					<div style={{color: 'red'}}>
						<p>{warningMessage}</p>
					</div>
				)}
			</form>
			<Link to="/admin/galerie">Back to the List of Albums</Link>
			<DeleteAlbumButton images={photos} handleDelete={handleDelete} />
		</>
	);
}
