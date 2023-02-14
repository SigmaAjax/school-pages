import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

export default function AlbumDetail() {
	const {id, albumSlug} = useParams();

	// useEffect(() =>{

	// })
	return (
		<div>
			<h1>This album detail</h1>
			<Link to="/admin/galerie">Back to the List of Albums</Link>
		</div>
	);
}
