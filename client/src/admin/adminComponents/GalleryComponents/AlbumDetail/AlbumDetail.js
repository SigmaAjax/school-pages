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

import styles from '../../../../pages/admin.module.css';
import {Loader} from '../../../../Loader';

export default function AlbumDetail() {
	const {album} = useAdmin();
	const {setIsOpenModal, setButtonName, setAlbum} = useAdminUpdate();
	/// usState and Params
	const [warningMessage, setWarningMessage] = useState('');
	/// Photos state
	const [addNewPhotos, setAddNewPhotos] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
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
	const originalSlug = album?.slug + '/';
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
					name: slugify(image?.name),
					last_modified: image.lastModified,
					last_modified_date: date,
					size: image.size,
					type: image.type,
					data_url: reader.result,
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
				setLoading((prev) => !prev); //true
				// adding delay of 1 second
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const response = await axios.get(
					`/api/get/album/${encodeURIComponent(id)}/${encodeURIComponent(
						albumSlug
					)}`
				);

				const {arrayOfPictures, ...rawAlbum} = response.data[0];

				const newArrayOfPictures = await Promise.all(
					arrayOfPictures.map(async (image) => {
						const response = await fetch(image.secure_url);
						const blob = await response.blob();
						const reader = new FileReader();
						reader.readAsDataURL(blob);
						return new Promise((resolve, reject) => {
							reader.onloadend = () => {
								const dataUrl = reader.result;
								const newImage = {...image, data_url: dataUrl};
								resolve(newImage);
							};
							reader.onerror = reject;
						});
					})
				);

				// code below is casting data from TINYINT  back into boolean value

				const updatePictures = await newArrayOfPictures.map((picture) => {
					const pictureCopy = {...picture};
					//renaming due to convention intro is backend and introductionary is frontend
					pictureCopy.introductionary = !!pictureCopy.intro;
					// deleting old  backend value in oder to avoid conflickt
					delete pictureCopy.intro;
					return pictureCopy;
				});

				console.table({...rawAlbum, arrayOfPictures: updatePictures});
				setPhotos(updatePictures);
				setAlbum({...rawAlbum, arrayOfPictures: updatePictures});
				setLoading((prev) => !prev); //false
			} catch (error) {
				console.log(error);
				setLoading((prev) => !prev); //false
				setError(error);
			} finally {
				console.log('fetch done...', photos);
			}
		};
		fetchOneAlbum();
	}, []);

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
					originalSlug: originalSlug,
					arrayOfPictures: photos,
				};
				return updatedAlbum;
			});

			setIsOpenModal((prev) => !prev);
		}
	};

	const handleDelete = (e) => {
		e.preventDefault();
		setAlbum((prev) => {
			const updatedAlbum = {
				...prev,
				date_updated: date,
				album_title: title?.current.value,
				description: description?.current.value,
				slug: slugify(title?.current.value),
				originalSlug: originalSlug,
				arrayOfPictures: photos,
			};
			return updatedAlbum;
		});
		console.log('delete done...', e.target.name);

		setButtonName(() => {
			return e.target.name;
		});

		setIsOpenModal((prev) => !prev);
	};

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return (
			<div>
				<p>Nepodařilo se načíst Album</p>
				<p>
					Error code: {error.code} - {error.message}
				</p>
			</div>
		);
	}

	return (
		<>
			<form className={`${styles.item} ${styles.one}`} onSubmit={handleSubmit}>
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
