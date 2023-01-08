import {useRef, useState} from 'react';
import axios from 'axios';
import CreatePostNav from './CreatePostNav';
import useSlugify from 'client/src/Hooks/useSlugify.js';
import {useNavigate} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../../context/AdminContext';

export default function CreatePost() {
	const title = useRef();
	const text = useRef();
	const userPass = useRef();
	const {slugify} = useSlugify();
	const navigate = useNavigate();
	// Context
	//const {postList, buttonName} = useAdmin();
	//const {setPostList, setButtonName} = useAdminUpdate();

	const submitPost = () => {
		const datePosted = new Date().toISOString().substring(0, 19);
		axios
			.post('/api/create', {
				userPass: userPass.current.value,
				title: title.current.value,
				text: text.current.value,
				slug: slugify(title.current.value),
				date: datePosted,
			})
			.then(() => {
				alert('Příspěvek byl přidán...');
			})
			.catch((error) => {
				console.log(error.message);
			});
		alert('Příspěvek bude odeslán na server...');
		navigate('/admin/newPost/admin-posts');
	};

	return (
		<>
			<h1>Aktuality</h1>
			{/*Navigation for the create post*/}
			<CreatePostNav />
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
