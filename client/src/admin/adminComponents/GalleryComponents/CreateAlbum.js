import {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import useFileSize from '../../../Hooks/useFileSize';

export default function CreateAlbum() {
	const {formatBytes} = useFileSize();
	//const [imagesURL, setImagesURL] = useState([]);
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
		console.log('accepted files', acceptedFiles);
		console.log('rejected files', rejectedFiles);
	}, []);
	const {fileRejections, getRootProps, getInputProps, isDragActive} =
		useDropzone({
			onDrop,
			accept: {'image/*': []},
		});

	useEffect(() => {
		console.log('Images hook');
		console.table(images);
		// console.log('Images URL hook');
		// console.table(imagesURL);
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
				onSubmit={() => console.log('Album created with images: ', images)}
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
				<button type="submit">Vytvořit Album</button>
			</form>
		</div>
	);
}
