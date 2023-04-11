import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
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
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		const controller = new AbortController();
		const fetchData = async () => {
			try {
				const response = await axios.get(`/api/get/${id}/${titleSlug}`, {
					signal: controller.signal,
				});

				if (response.status === 200) {
					setPost(() => {
						return response.data[0];
					});
				} else {
					setErrorMessage(`Error: ${response.status} - ${response.statusText}`);
				}
			} catch (error) {
				console.log(error);
				if (error.response) {
					setErrorMessage(
						`Error: ${error.response.status} - ${error.response.statusText}`
					);
				} else {
					setErrorMessage('Error: Failed to fetch data.');
				}
			}
		};

		fetchData();

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
						<label htmlFor="post-title">Nadpis</label>
						<input
							id="post-title"
							ref={title}
							type="text"
							defaultValue={post.title}
							onChange={(e) => {
								e.target.value === post.title
									? setEnableUpdate((previous) => true)
									: setEnableUpdate((previous) => false);
							}}
						/>
						<label htmlFor="post-text">Text příspěvku</label>
						<textarea
							id="post-text"
							rows="20"
							cols={'60'}
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
						<p>
							{errorMessage
								? `Nepodařilo se nic načíst: ${errorMessage}`
								: 'Nepodařilo se nic načíst'}
						</p>
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
				<RouterLink to="/admin/newPost/admin-posts">Go back</RouterLink>
			</form>
		</>
	);
}
