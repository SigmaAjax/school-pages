import {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

export default function CreateAlbum() {
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
		//console.log('accepted files', acceptedFiles);
		//console.log('rejected files', rejectedFiles);
	}, []);
	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		accept: 'image/*',
	});

	useEffect(() => {
		console.log('filter fnc');
		console.table(images);
	}, [images]);

	return (
		<div className="item three">
			<form
				className="form-group"
				onSubmit={() => console.log('Album created')}
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
				<div className="dropzone" {...getRootProps()}>
					<input {...getInputProps()} />
					{isDragActive
						? 'Chystáte se vložit fotografie'
						: 'Můžete vložit fotografie'}
				</div>
				<button type="submit">Vytvořit Album</button>
			</form>
		</div>
	);
}
