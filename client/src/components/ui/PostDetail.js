import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import useCap from '../../Hooks/useCap';

export default function PostDetail() {
	const {titleSlug, id} = useParams();
	const [post, setPost] = useState({});
	const {capitalize} = useCap();

	useEffect(() => {
		const controller = new AbortController();
		axios
			.get(`/api/get/${id}/${titleSlug}`, {signal: controller.signal})
			.then((response) => {
				setPost(...response.data);
			});

		return () => {
			controller.abort();
		};
	}, [id]);

	console.table(post);

	return (
		<>
			<h3>{post.title ? capitalize(post.title) : 'title not found'}</h3>
			<p>{post.post_text}</p>
			<Link to="/aktuality">Go back</Link>
		</>
	);
}
