import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAdminUpdate} from '../context/AdminContext';
import useCap from '../Hooks/useCap';

export default function PostDetail({admin, onOpen}) {
	const setIsOpenModal = useAdminUpdate();
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
	}, [id, titleSlug]);

	return (
		<>
			{admin ? (
				<div className="item one">
					{' '}
					{Object.keys(post).length > 0 ? (
						<>
							{/* <p>něco tu je</p> */}
							<input type="text" defaultValue={capitalize(post.title)} />
							<textarea defaultValue={post.post_text} />
						</>
					) : (
						<>
							<p>nic tu není</p>
						</>
					)}
					<button
						type="button"
						onClick={() =>
							setIsOpenModal((prev) => {
								console.log('open modal got clicked from post');
								return !prev;
							})
						}
					>
						Vymazat
					</button>
					<button
						type="button"
						onClick={() =>
							setIsOpenModal((prev) => {
								console.log('open modal got clicked from post');
								return !prev;
							})
						}
					>
						Upravit
					</button>
					<Link to="/admin/newPost/admin-posts">Go back</Link>
				</div>
			) : (
				<div className="item one">
					<h3>{post.title ? capitalize(post.title) : 'title not found'}</h3>
					<p>{post.post_text ? post.post_text : 'post text was not found'}</p>
					<Link to="/aktuality">Go back</Link>
				</div>
			)}
		</>
	);
}