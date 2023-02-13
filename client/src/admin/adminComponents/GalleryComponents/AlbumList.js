import axios from 'axios';
import {useEffect, useState} from 'react';
import {AdvancedImage} from '@cloudinary/react';

export default function AlbumList() {
	const [albums, setAlbums] = useState([]);
	//const [photos, setPhotos] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// adding delay
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const response = await axios.get('/api/get/albums');
				const rawAlbums = response.data;

				// code below is casting data from TINYINT  back into boolean value
				const updatedAlbums = await rawAlbums.map((album) => {
					const updatedAlbum = {...album};

					updatedAlbum.arrayOfPictures = updatedAlbum.arrayOfPictures.map(
						(picture) => {
							const updatedPicture = {...picture};
							updatedPicture.intro = !!updatedPicture.intro;
							return updatedPicture;
						}
					);
					return updatedAlbum;
				});
				setAlbums(updatedAlbums);
			} catch (error) {
				console.log(error);
			} finally {
				console.log('data fetched');
				//console.log(albums);
			}
		};
		fetchData();
		return () => {
			console.log('clean up function');
		};
	}, []);

	console.log(process.env.CLOUD_NAME);
	// albums.map((album) => {
	// 	album.arrayOfPictures.map((picture) => {
	// 		console.log('this is a picture ... ', picture);
	// 		console.log('this is whether it is an introductionary...', picture.intro);
	// 		console.log('introductionary is type of ... ', typeof picture.intro);
	// 	});
	// });
	return (
		<>
			<h1>Jednotlivá Alba</h1>
			<div>
				{albums.map((album) => {
					album.arrayOfPictures.map((picture) => {
						return (
							picture.intro && (
								<AdvancedImage
									key={album.id}
									cloudName={process.env.CLOUD_NAME}
									publicId={picture.public_id}
								/>
							)
						);
					});
				})}
			</div>
		</>
	);
}
