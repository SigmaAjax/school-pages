import {useRef, useState} from 'react';
import axios from 'axios';
import useSlugify from 'client/src/Hooks/useSlugify.js';
import {useNavigate} from 'react-router-dom';
import SubNavigation from '../../Subnavigation';

export default function CreatePost() {
	const title = useRef();
	const text = useRef();
	const userPass = useRef();
	const {slugify} = useSlugify();
	const navigate = useNavigate();
	// Context
	//const {postList, buttonName} = useAdmin();
	//const {setPostList, setButtonName} = useAdminUpdate();

	const submitPost = async () => {
		const datePosted = new Date().toISOString().substring(0, 19);

		// Get the values of userPass, title, and slug
		const userPassValue = userPass.current.value;
		const titleValue = title.current.value;
		const slugValue = slugify(titleValue);

		// Check if userPass, title, or slug is empty
		if (!userPassValue || !titleValue || !slugValue) {
			alert(
				'UserPass and Title must not be empty, and the slug must be properly slugified.'
			);
			return;
		}

		try {
			alert('Příspěvek bude odeslán na server...');

			const response = await axios.post('/api/create', {
				userPass: userPassValue,
				title: titleValue,
				text: text.current.value || '',
				slug: slugValue,
				date: datePosted,
			});
			if (response.status === 200) {
				alert('Příspěvek byl přidán...');
				navigate('/admin/newPost/admin-posts');
			}
		} catch (error) {
			console.log(error.message);

			if (error.response) {
				// The request was made, and the server responded with a status code outside the range of 2xx
				alert('Failed to upload post: ' + error.response.data.message);
			} else if (error.request) {
				// The request was made but no response was received
				alert(
					'Failed to upload post: Server did not respond, possibly due to bad connection'
				);
			} else {
				// Something happened in setting up the request that triggered an Error
				alert('Failed to upload post: ' + error.message);
			}
		}
	};

	return (
		<>
			<h1>Aktuality</h1>
			{/*Navigation for the create post*/}
			{/* <CreatePostNav /> */}
			<SubNavigation
				navItems={[
					{
						exact: true,
						to: '/admin/newPost',
						label: 'Vytvoř aktualitu nebo příspěvek',
					},
					{
						exact: false,
						to: '/admin/newPost/admin-posts',
						label: 'Uprav aktualitu nebo příspěvek',
					},
				]}
			/>{' '}
			<div className="item one">
				<label htmlFor="user">Heslo pro admina</label>
				<input
					ref={userPass}
					name="user"
					type="text"
					placeholder="Kdo to napsal?"
					required
				/>
				<label htmlFor="headline">Nadpis</label>
				<input
					ref={title}
					required
					className="postTitle"
					name="headline"
					type="text"
					placeholder="Nadpis"
				/>
				<label htmlFor="post">Příspěvek</label>
				<textarea
					ref={text}
					required
					name="post"
					rows="12"
					cols="40"
					placeholder="Co máš na mysli?"
				/>
				<button onClick={submitPost}>Odeslat příspěvek na server</button>
			</div>
		</>
	);
}
