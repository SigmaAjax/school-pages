import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

export default function PostDetail() {
	const {titleSlug} = useParams();
	const [post, setPost] = useState({});
	// setPost((values) => {
	// 	const {[key]: value, lastLayer, ...rest} = values;
	// 	return rest;
	// });

	useEffect(() => {
		axios.get('/api/get').then((response) => {
			const detail = response.data.filter((key) => {
				return key.slug === titleSlug;
			});
			setPost(...detail);
		});
	}, []);

	return (
		<>
			<h3>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h3>
			<p>{post.post_text}</p>
			<Link to="/aktuality">Go back</Link>
		</>
	);
}
