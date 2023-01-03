import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';
import useCap from '../../Hooks/useCap';
import useSlugify from '../../Hooks/useSlugify';

export default function AdminPostDetail() {
	const {setIsOpenModal, setPost, setButtonName} = useAdminUpdate();
	const {post} = useAdmin();
	const {titleSlug, id} = useParams();
	// custom hooks
	const {capitalize} = useCap();
	const {slugify} = useSlugify();
	//ref for admin form
	const title = useRef(post.title);
	const post_text = useRef(post.post_text);
	// Enable update button logic hook
	const [enableUpdate, setEnableUpdate] = useState(true);
	// loading hook

	useEffect(() => {
		const controller = new AbortController();
		axios
			.get(`/api/get/${id}/${titleSlug}`, {signal: controller.signal})
			.then((response) => {
				setPost(() => {
					return response.data[0];
				});
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			controller.abort();
		};
	}, []);

	function handleSubmit(e) {
		e.preventDefault();

		const date = new Date().toISOString().substring(0, 19);

		console.log(date);

		setPost(() => {
			return {
				...post,
				title: title.current.value,
				post_text: post_text.current.value,
				slug: slugify(title.current.value),
				post_updated: date,
			};
		});
	}

	// console.log(title === post.title ? "It's same" : "It's different");
	// console.log(
	// 	post_text.current.value === post.post_text ? "It's same" : "It's different"
	// );

	return (
		<>
			<form className="item one" onSubmit={handleSubmit}>
				{' '}
				{Object.values(post).length > 0 ? (
					<>
						<input
							ref={title}
							type="text"
							defaultValue={post.title}
							onChange={(e) => {
								e.target.value === post.title
									? setEnableUpdate((previous) => true)
									: setEnableUpdate((previous) => false);
							}}
						/>
						<textarea
							ref={post_text}
							defaultValue={capitalize(post.post_text)}
							onChange={(e) => {
								e.target.value === post.post_text
									? setEnableUpdate((previous) => true)
									: setEnableUpdate((previous) => false);
							}}
						/>
					</>
				) : (
					<>
						<p>Nepodařilo se nic načíst</p>
					</>
				)}
				<button
					name="post-delete"
					type="button"
					onClick={(e) => {
						setButtonName((prev) => {
							console.log('event from post detatil...', e.target.name);
							prev = e.target.name;
							return prev;
						});
						setIsOpenModal((prev) => {
							return !prev;
						});
					}}
				>
					Vymazat
				</button>
				<button
					name="post-update"
					type="submit"
					disabled={enableUpdate}
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
		</>
	);
}
