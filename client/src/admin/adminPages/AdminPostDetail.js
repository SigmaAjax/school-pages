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
	const title = useRef();
	const post_text = useRef();
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

		setPost(() => {
			return {
				...post,
				title: title.current.value,
				post_text: post_text.current.value,
				slug: slugify(title.current.value),
			};
		});
	}

	return (
		<>
			<form className="item one" onSubmit={handleSubmit}>
				{' '}
				{Object.values(post).length > 0 ? (
					<>
						<input ref={title} type="text" defaultValue={post.title} />
						<textarea
							ref={post_text}
							defaultValue={capitalize(post.post_text)}
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
