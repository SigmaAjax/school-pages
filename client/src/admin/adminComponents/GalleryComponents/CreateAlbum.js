import {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import ErrorMsg from './ErrorMsg';
import ImageCard from './ImageCard';

export default function CreateAlbum() {
	const [images, setImages] = useState([]);
	const [oneCheck, setOneCheck] = useState(false);
	/////
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
			maxFiles: 100,
		});

	useEffect(() => {
		setTimeout(() => {
			console.log('useEffect');
			//console.table(images);
			setOneCheck((prev) => {
				const pravda = images.some((image) => {
					if (image.introductionary === true) return true;
					return false;
				});
				return pravda;
			});
		}, 75);
		return () => {
			console.log('cleanup');
			//console.table(images);
		};
	}, [images]);

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
					{isDragActive ? (
						images.length > 0 ? (
							<div>
								<p>Chystáte se vložit fotografie k ostatním fotografiím</p>
								<em>
									(maximální počet vložených fotografií je 100, Duplikáty budou
									sloučeny)
								</em>
							</div>
						) : (
							<div>
								<p>Chystáte se vložit fotografie</p>
								<em>
									(maximální počet vložených fotografií je 100, Duplikáty budou
									sloučeny)
								</em>
							</div>
						)
					) : (
						<div>
							<p>Můžete vložit fotografie</p>
							<em>
								(maximální počet vložených fotografií je 100, Duplikáty budou
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
				{images.length > 0 ? (
					<div className="item two">
						{oneCheck
							? images.map((image) => {
									return (
										<ImageCard
											image={image}
											setImages={setImages}
											intro={!image.introductionary}
										/>
									);
							  })
							: images.map((image) => {
									return <ImageCard image={image} setImages={setImages} />;
							  })}
					</div>
				) : (
					<h5>No images yet</h5>
				)}
				{/* //////////////////////////////////////////////////////////////// */}
				<button type="submit">Vytvořit Album</button>
			</form>
		</div>
	);
}
