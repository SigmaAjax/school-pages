import axios from 'axios';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {AdvancedImage, placeholder} from '@cloudinary/react';

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

	albums.map((album) => {
		console.log(album.album_id);
		album.arrayOfPictures.map((picture) => {
			console.log('this is a picture ... ', picture);
		});
	});

	const renderPicture = (picture) => {
		return (
			picture.intro && (
				<AdvancedImage
					loading={'lazy'}
					width={100}
					height={100}
					key={picture.public_id}
					cloudName={process.env.REACT_APP_CLOUD_NAME}
					publicId={picture.public_id}
					src={picture.secure_url}
				></AdvancedImage>
			)
		);
	};

	const renderAlbum = (album) => {
		const introPicture = album.arrayOfPictures.find((picture) => picture.intro);
		return introPicture && renderPicture(introPicture);
	};

	return (
		<>
			<h1>Jednotlivá Alba</h1>
			<div className="item two">
				{albums.map((album) => (
					<div key={album.album_id}>
						<Link to={`/admin/galerie/${album.album_id}/${album.slug}`}>
							<h4>{album.album_title}</h4>
							{renderAlbum(album)}
						</Link>
						<button>X</button>
					</div>
				))}
			</div>
		</>
	);
}
