import axios from 'axios';
import {useEffect, useRef} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../context/AdminContext';
import useCap from '../Hooks/useCap';
import useSlugify from '../Hooks/useSlugify';

export default function PostDetail({admin}) {
	const {setIsOpenModal, setPost, setButtonName} = useAdminUpdate();
	const {post} = useAdmin();
	const {titleSlug, id} = useParams();
	// custom hooks
	const {capitalize} = useCap();
	const {slugify} = useSlugify();
	//ref for admin form
	const title = useRef();
	const post_text = useRef();

	const url =
		process.env.NODE_ENV === 'production'
			? `${process.env.REACT_APP_BACKEND_URL}/api/get`
			: 'api/get';

	useEffect(() => {
		//const source = axios.CancelToken.source();
		const controller = new AbortController();

		const fetchData = async () => {
			try {
				const response = await axios.get(`${url}/${id}/${titleSlug}`, {
					signal: controller.signal,
				});
				setPost(() => {
					return {...response.data};
				});
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
		return () => {
			setPost(() => {
				return {};
			});
			console.log(post);
			controller.abort();
		};
	}, [id, titleSlug]);

	function handleSubmit(e) {
		e.preventDefault();

		setPost({
			...setPost,
			title: title.current.value,
			post_text: post_text.current.value,
			slug: slugify(title.current.value),
		});
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
						name="post-delete"
						type="button"
						onClick={(e) => {
							setIsOpenModal((prev) => {
								return !prev;
							});
							setButtonName((prev) => {
								console.log('event from post detatil...', e.target.name);
								prev = e.target.name;
								return prev;
							});
						}}
					>
						Vymazat
					</button>
					<button
						name="post-update"
						type="submit"
						onClick={(e) => {
							setIsOpenModal((prev) => {
								return !prev;
							});
							setButtonName((prev) => {
								console.log(prev);
								console.log('event from post detatil...', e.target.name);
								prev = e.target.name;
								return prev;
							});
						}}
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
