import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {useNavigate} from 'react-router-dom';
import {useAdminUpdate} from '../../../context/AdminContext';
import useSlugify from '../../../Hooks/useSlugify';
import AlbumHeader from './AlbumHeader';
import ErrorMsg from './ErrorMsg';
import ImageCardsList from './ImageCardsList';
import SubmitAlbumButton from './SubmitAlbumButton';

export default function CreateAlbum() {
	const navigate = useNavigate();
	/// kontext for modal
	//const {setIsOpenModal} = useAdminUpdate();
	const {slugify} = useSlugify();
	///States for images
	const [images, setImages] = useState([]);
	const [oneCheck, setOneCheck] = useState(false);
	///// name and description states
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	//// set album object into state
	const [album, setAlbum] = useState({});

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
					url: reader.result,
					introductionary: false,
				};

				setImages((prev) => {
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
			maxFiles: 50,
		});

	useEffect(() => {
		setTimeout(() => {
			console.log('useEffect');
			console.table(images);
			/// Setting which is
			setOneCheck(() => {
				const pravda = images.some((image) => {
					if (image.introductionary === true) return true;
					return false;
				});
				return pravda;
			});
			const datePosted = new Date().toISOString().substring(0, 19); // substring for MySql server
			setAlbum((prev) => {
				const newAlbum = {
					...prev,
					title: title,
					description: description,
					date_created: datePosted,
					date_updated: datePosted,
					slug: slugify(title),
					arrayOfImages: images,
				};
				return newAlbum;
			});
		}, 1000);
		return () => {
			console.log('cleanup');
		};
	}, [images, title]);

	const submitAlbum = async (event) => {
		event.preventDefault();

		console.log(album);
		const imagesCloudinary = await album.arrayOfImages.map((image) => {
			return {url: image.url, name: image.name};
		});

		// console.log(album.title);
		// console.log(imagesCloudinary);

		try {
			alert('Album bude odesláno na server...');
			const firstResponse = await axios.post('/api/upload/album', {
				title: album.slug,
				images: imagesCloudinary,
			});

			console.log('firstResponse is ... ', firstResponse.data);
			/////
			const arrayOfIDs = await firstResponse.data.map((id) => {
				/// get URLs and public id of every image
				return {
					public_id: id.public_id,
					secure_url: id.secure_url,
					url: id.url,
				};
			});

			async function mergeImagesArray() {
				const mutatedImages = await album.arrayOfImages; /// copy array of images
				//console.log('mutatedImages: ', mutatedImages);

				const mergedImages = await mutatedImages.reduce((acc, obj) => {
					let prefix = album.slug + '/'; ///// folder prefix in order to be able to merge the old array of images with the URLs and public_id array from cloudinary
					const match = arrayOfIDs.find(
						(element) => element.public_id.substring(prefix.length) === obj.name
					);
					if (match) acc.push({...obj, ...match});
					return acc;
				}, []);
				return mergedImages;
			}
			let {arrayOfImages, ...albumCredentials} = album;

			const mergedImages = await mergeImagesArray();

			console.log(mergeImagesArray());

			const secondResponse = await axios.post('/api/upload/album/database', {
				album: albumCredentials,
				photos: mergedImages,
			});
			console.log('Second response is... ', secondResponse.data);

			setAlbum((prev) => {
				const mutatedImages = prev.arrayOfImages; /// copy array of images
				//console.log('mutatedImages: ', mutatedImages);
				const mergedImages = mutatedImages.reduce((acc, obj) => {
					let prefix = album.slug + '/'; ///// folder prefix in order to be able to merge the old array of images with the URLs and public_id array from cloudinary
					const match = arrayOfIDs.find(
						(element) => element.public_id.substring(prefix.length) === obj.name
					);
					if (match) acc.push({...obj, ...match});
					return acc;
				}, []);
				const albumCloudinary = {...prev, arrayOfImages: mergedImages};
				return albumCloudinary;
			});
		} catch (error) {
			console.log(error.message);
		}

		//navigate('/admin/galerie');
	};

	return (
		<div className="item three">
			<form className="form-group" onSubmit={submitAlbum}>
				<AlbumHeader title={setTitle} description={setDescription} />

				<label htmlFor="dropzone">
					<p>
						Sem můžete přetáhnou fotografie nebo vybrat fotografie kliknutím sem
						&#128071;
					</p>
				</label>
				<div name="dropzone" className="dropzone" {...getRootProps()}>
					<input {...getInputProps()} />
					{isDragActive ? (
						images.length > 0 ? (
							<div>
								<p>Chystáte se vložit fotografie k ostatním fotografiím</p>
								<em>
									(maximální počet vložených fotografií je 50, Duplikáty budou
									sloučeny)
								</em>
							</div>
						) : (
							<div>
								<p>Chystáte se vložit fotografie</p>
								<em>
									(maximální počet vložených fotografií je 50, Duplikáty budou
									sloučeny)
								</em>
							</div>
						)
					) : (
						<div>
							<p>Můžete vložit fotografie</p>
							<em>
								(maximální počet vložených fotografií je 50, Duplikáty budou
								sloučeny)
							</em>
						</div>
					)}
				</div>
				{/* //////////////////////////////////////////////////////////////// */}
				{/* Error message for admin after file rejection*/}
				<ErrorMsg fileRejections={fileRejections} />

				{/* //////////////////////////////////////////////////////////////////////// */}
				{/* display preview of images */}
				<ImageCardsList
					imagesList={images}
					setImages={setImages}
					checkedBox={oneCheck}
				/>
				{/* //////////////////////////////////////////////////////////////// */}
				<button
					type="button"
					onClick={() => {
						console.log('Album created with images: ');
						console.table({album});
					}}
				>
					odeslat
				</button>
				<SubmitAlbumButton
					oneCheck={oneCheck}
					values={{title, description, images}}
				/>
			</form>
		</div>
	);
}
