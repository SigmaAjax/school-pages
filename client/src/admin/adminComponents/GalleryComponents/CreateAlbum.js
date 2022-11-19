import {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import useFileSize from '../../../Hooks/useFileSize';

export default function CreateAlbum() {
	const {formatBytes} = useFileSize();
	const [imagesURL, setImagesURL] = useState([]);
	const [images, setImages] = useState([]);
	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		acceptedFiles.forEach((file) => {
			// how to get rid of duplicate from react state

			setImages((prev) => {
				/// this Hook accept images and discard images with same name
				const uniqueIds = [];
				const arrImages = [...prev, file];

				const uniqueImages = arrImages.filter((image) => {
					const isDuplicate = uniqueIds.includes(image.name);

					if (!isDuplicate) {
						uniqueIds.push(image.name);

						return true;
					}

					return false;
				});
				return uniqueImages;
			});
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
			console.log('images data url bigger than 0 is', imagesURL.length > 0);
			if (images.length === 0) {
				console.log('No images');
				return;
			} else {
				images.map((image) => {
					const reader = new FileReader();
					reader.onload = () => {
						setImagesURL((prev) => [...prev, reader.result]);
					};
					reader.readAsDataURL(image);
				});
			}
			setTimeout(() => {
				setImagesURL((previous) => [...new Set(previous)]);
			}, 150);
		}, 75);
		return () => {
			console.log('cleanup');
			console.log(images.length > 0 ? images : 'No images');
			console.log('--------------------------------');
			console.log('imagesUrl');
			console.table(imagesURL.length > 0 ? imagesURL : 'No url data');
		};
	}, [images]);

	const fileRejectionItems = fileRejections.map(({file, errors}) => (
		<li key={file.path}>
			<h5>Název souboru a velikost</h5>
			{file.path} - {formatBytes(file.size, 2)}
			<ul>
				{errors.map((e) => (
					<li key={e.code}>{e.message}</li>
				))}
			</ul>
		</li>
	));

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
					Můžete přetáhnou fotografie nebo kliknout a vybrat fotografie
				</label>
				<div name="dropzone" className="dropzone" {...getRootProps()}>
					<input {...getInputProps()} />
					{isDragActive
						? 'Chystáte se vložit fotografie'
						: 'Můžete vložit fotografie'}
				</div>
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
				{/* display preview of images */}
				{imagesURL.length > 0 ? (
					<div className="item two">
						{imagesURL.map((image, index) => {
							return (
								<img className="selected-images" key={index} src={image} />
							);
						})}
					</div>
				) : (
					<h5>No images yet</h5>
				)}
				<button type="submit">Vytvořit Album</button>
				<button
					type="button"
					onClick={() => {
						setTimeout(() => {
							const imgOne = imagesURL.map((image) => {
								return image;
							});
							imagesURL.map((image, index) => {
								//console.log(image);
								console.log(image === imgOne[index]);
							});

							console.log('ImagesUrl');
							console.table(imagesURL);
						}, 150);
					}}
				>
					Konzole
				</button>
			</form>
		</div>
	);
}
