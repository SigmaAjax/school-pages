import axios from 'axios';
import {useEffect, useState} from 'react';

export default function AlbumList() {
	const [albums, setAlbums] = useState([]);
	const [photos, setPhotos] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				// adding delay
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const response = await axios.get('/api/get/albums');
				console.log(response.data);
				console.log(response.data.length);
			} catch (error) {
				console.log(error);
			} finally {
				console.log('data fetched');
			}
		};
		fetchData();
		return () => {
			console.log('clean up function');
		};
	}, []);
	return (
		<>
			<h1>Jednotlivá Alba</h1>
		</>
	);
}
