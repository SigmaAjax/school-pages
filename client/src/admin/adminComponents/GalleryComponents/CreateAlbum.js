import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

export default function CreateAlbum() {
	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		console.log('accepted files', acceptedFiles);
		console.log('rejected files', rejectedFiles);
	}, []);
	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		accept: 'image/*',
	});

	//console.log(getRootProps(), getInputProps());

	return (
		<div className="item three">
			<form className="form-group" onSubmit={console.log('Album created')}>
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
