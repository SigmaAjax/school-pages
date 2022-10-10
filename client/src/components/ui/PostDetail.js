import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import useCap from '../../Hooks/useCap';

export default function PostDetail() {
	const {titleSlug} = useParams();
	const [post, setPost] = useState({});
	const {capitalize} = useCap();

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
			<h3>{capitalize(post.title)}</h3>
			<p>{post.post_text}</p>
			<Link to="/aktuality">Go back</Link>
		</>
	);
}
