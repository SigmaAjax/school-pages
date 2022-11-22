import {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import useFileSize from '../../../Hooks/useFileSize';
import MainPhotoCheckbox from './MainPhotoCheckbox';

export default function CreateAlbum() {
	const {formatBytes} = useFileSize();
	const [images, setImages] = useState([]);
	/////
	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		let uniqueImages = [];
		acceptedFiles.forEach((file) => {
			// how to get rid of duplicate from react state
			//console.table(file);

			//console.table({name, path, lastModified, lastModifiedDate, type});

			const newFile = {file: file, introductionary: false};

			console.log(newFile.file.path);

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
				const imagePlusUrl = image;
				imagePlusUrl.url = reader.result;
				imagePlusUrl.introductionary = false;
				setImages((prev) => {
					/// creating key: value pair url: reader.result
					const uniqueNames = [];
					const arrImages = [...prev, imagePlusUrl];

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
		});

	useEffect(() => {
		setTimeout(() => {
			console.log('useEffect');
			console.log(fileRejectionItems);
			console.table(images);
		}, 75);
		return () => {
			console.log('cleanup');
			console.log(fileRejectionItems);
			console.table(images);
		};
	}, [images]);

	const fileRejectionItems =
		fileRejections.map(({file, errors}) => (
			<li key={file.path}>
				<h5>Název souboru a velikost</h5>
				{file.path} - {formatBytes(file.size, 2)}
				<ul>
					{errors.map((e) => (
						<li key={e.code}>{e.message}</li>
					))}
				</ul>
			</li>
		)) || [];

	const arr = images;
	let newArr = [];

	return (
		<div className="item three">
			<form
				className="form-group"
				onSubmit={() => console.log('Album created with images: ')}
			>
				<label htmlFor="albumName">Název Alba</label>
				<input
					name="albumName"
					required
					type="text"
					placeholder="např. Výlet do Kamenického Šenova"
				></input>
				<label htmlFor="albumDescription">Popisek Alba</label>
				<textarea
					rows="12"
					cols="40"
					name="albumDescription"
					type="text"
					placeholder="Byli jsme na výletě...."
				></textarea>
				<label htmlFor="dropzone">
					<p>
						Sem můžete přetáhnou fotografie nebo vybrat fotografie kliknutím sem
						&#128071;
					</p>
				</label>
				<div name="dropzone" className="dropzone" {...getRootProps()}>
					<input {...getInputProps()} />
					{isDragActive
						? images.length > 0
							? 'Chystáte se vložit fotografie k ostatním fotografiím'
							: 'Chystáte se vložit fotografie'
						: 'Můžete vložit fotografie'}
				</div>
				{/* //////////////////////////////////////////////////////////////// */}
				{/* Error message for admin after file rejection*/}
				{fileRejections.length === 1 && (
					<p style={{color: 'red'}}>
						Váš soubor není v povoleném formátu pro fotografie!!
					</p>
				)}
				{fileRejections.length > 1 && (
					<p style={{color: 'red'}}>
						Váše soubory nejsou v povoleném formátu pro fotografie!!
					</p>
				)}
				{fileRejections.length > 0 && (
					<div className="error-message">
						{' '}
						<p style={{color: 'purple'}}>
							Prosíme paní ředitelku, aby upravila výběr souborů natažením
							souborů do pole určeného pro soubory.
						</p>
						<p style={{color: 'purple'}}>
							Změnu soubourů se správným formátem můžete učit kliknutím na pole
							pro soubory nebo natažením nových souborů
						</p>
						<p style={{color: 'green'}}>
							{' '}
							Počet odmítnutých souborů je: {fileRejections.length}
						</p>
					</div>
				)}
				{fileRejections.length > 0 && (
					<ul style={{width: 'auto', height: '200px', overflow: 'auto'}}>
						{fileRejectionItems}
					</ul>
				)}
				{/* //////////////////////////////////////////////////////////////////////// */}
				{/* display preview of images */}
				{images.length > 0 ? (
					<div className="item two">
						{images.map((image) => {
							return (
								<>
									<img
										className="selected-images"
										key={image.name}
										src={image.url}
										alt="Vybraná fotografie"
									/>
									<button
										key={image.name + '-button'}
										name={image.name}
										type="button"
										onClick={(e) => {
											setImages((prev) => {
												const imagesAfterDelete = prev.filter((picture) => {
													return picture.name !== e.target.name;
												});
												return imagesAfterDelete;
											});
										}}
									>
										X
									</button>
									<input
										name={image.name + '-checkbox'}
										key={image.name + '-checkbox'}
										disabled={false}
										type="checkbox"
										onChange={(e) => {
											console.log(e.target.name === image.name + '-checkbox');

											newArr = arr.map((item) => {
												if (item.path + '-checkbox' === e.target.name) {
													const newItem = item;
													return {
														...item,
														introductionary: !item.introductionary,
													};
												}
												return item;
											});
											setTimeout(() => {
												console.table(newArr);
											}, 100);
											// setImages((current) => {
											// 	current.map((item) => {
											// 		if (item.name + '-checkbox' === e.target.name) {
											// 			console.table({
											// 				...item,
											// 				introductionary: !item.introductionary,
											// 			});
											// 			return {
											// 				...item,
											// 				introductionary: !item.introductionary,
											// 			};
											// 		}
											// 		return item;
											// 	});
											// });
										}}
									/>
									{/* <MainPhotoCheckbox
										imgValue={image}
										checkboxed={setImages}
										supportArr={images}
									/> */}
								</>
							);
						})}
					</div>
				) : (
					<h5>No images yet</h5>
				)}
				{/* //////////////////////////////////////////////////////////////// */}
				<button type="submit">Vytvořit Album</button>
				<button
					type="button"
					onClick={() => {
						console.table(newArr);
					}}
				>
					Konzole
				</button>
			</form>
		</div>
	);
}
