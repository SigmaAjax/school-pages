import {useCallback, useEffect, useRef, useState} from 'react';
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
	const {setIsOpenModal} = useAdminUpdate();
	const {slugify} = useSlugify();
	///States for images
	const [images, setImages] = useState([]);
	const [oneCheck, setOneCheck] = useState(false);
	///// name and description states
	const title = useRef();
	const description = useRef();
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
					path: image.path,
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
		}, 1000);
		return () => {
			console.log('cleanup');
			//console.table(images);
			console.log('Album created with images: ');
			console.table(album);
		};
	}, [images]);

	const submitAlbum = (event) => {
		// axios
		// 	.post('/api/create/album', {
		// 		userPass: userPass,
		// 		title: title,
		// 		text: text,
		// 		slug: slugify(title),
		// 		date: datePosted,
		// 	})
		// 	.then(() => {
		// 		alert('Příspěvek byl přidán...');
		// 	})
		// 	.catch((error) => {
		// 		console.log(error.message);
		// 	});
		event.preventDefault();

		const datePosted = new Date().toISOString().substring(0, 19); // substring for MySql server
		setAlbum((prev) => {
			const newAlbum = {
				...prev,
				title: title.current.value,
				description: description.current.value,
				date_created: datePosted,
				date_updated: datePosted,
				slug: slugify(title.current.value),
				arrayOfImages: images,
			};
			return newAlbum;
		});
		alert('Album bude odesláno na server...');
		console.log('Album created with images: ');
		console.table({album});
		//navigate('/admin/galerie');
	};

	return (
		<div className="item three">
			<form className="form-group" onSubmit={submitAlbum}>
				<AlbumHeader title={title} description={description} />

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
				{/* <button
					type="button"
					onClick={() => {
						const datePosted = new Date().toISOString().substring(0, 19); // substring for MySql server
						setAlbum((prev) => {
							const newAlbum = {
								...prev,
								title: title.current.value,
								description: description.current.value,
								date_created: datePosted,
								date_updated: datePosted,
								slug: slugify(title.current.value),
								arrayOfImages: images,
							};
							return newAlbum;
						});
						alert('Album bude odesláno na server...');
						console.log('Album created with images: ');
						console.table({album});
					}}
				>
					odeslat
				</button> */}
				<SubmitAlbumButton
					oneCheck={oneCheck}
					values={{title, description, images}}
				/>
			</form>
		</div>
	);
}
