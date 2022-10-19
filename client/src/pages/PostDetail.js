import axios from 'axios';
import {useEffect, useRef} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../context/AdminContext';
import useCap from '../Hooks/useCap';
import useSlugify from '../Hooks/useSlugify';

export default function PostDetail({admin}) {
	const {setIsOpenModal, setPost} = useAdminUpdate();
	const {post} = useAdmin();
	const {titleSlug, id} = useParams();
	// custom hooks
	const {capitalize} = useCap();
	const {slugify} = useSlugify();
	//ref for admin form
	const title = useRef();
	const post_text = useRef();

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

	function handleSubmit(e) {
		e.preventDefault();
		console.log('ref');
		console.table({
			title: title.current.value,
			post_text: post_text.current.value,
		});
		setPost({
			...post,
			title: title.current.value,
			post_text: post_text.current.value,
			slug: slugify(title.current.value),
		});
		console.log('The post is..');
		console.table(post);
	}

	return (
		<>
			{admin ? (
				<form className="item one" onSubmit={handleSubmit}>
					{' '}
					{Object.keys(post).length > 0 ? (
						<>
							{/* <p>něco tu je</p> */}
							<input
								ref={title}
								type="text"
								defaultValue={capitalize(post.title)}
							/>
							<textarea ref={post_text} defaultValue={post.post_text} />
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
								console.log(
									'open modal got clicked from Post Deatil and your post is...'
								);

								return !prev;
							})
						}
					>
						Vymazat
					</button>
					<button
						type="submit"
						onClick={() =>
							setIsOpenModal((prev) => {
								console.log(
									'open modal got clicked UPRAVIT from Post Detail and your post is...'
								);

								return !prev;
							})
						}
					>
						Upravit
					</button>
					<Link to="/admin/newPost/admin-posts">Go back</Link>
				</form>
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
