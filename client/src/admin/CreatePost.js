import {useEffect, useState} from 'react';
import axios from 'axios';
import useSlugify from '../Hooks/useSlugify';
import CreatePostNav from './adminComponents/CreatePostNav';

export default function CreatePost() {
	const [backendData, setBackendData] = useState([{}]);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [userPass, setUserPass] = useState('');
	const {slugify} = useSlugify();

	const submitPost = () => {
		axios.post('/api/create', {
			userPass: userPass,
			title: title,
			text: text,
			slug: slugify(title),
		});
	};

	useEffect(() => {
		return;
	}, [userPass, text, title]);

	return (
		<>
			<h1>Aktuality</h1>
			{/*Navigation for the create post*/}
			<CreatePostNav />
			<div className="item one">
				<label htmlFor="user">Heslo pro admina</label>
				<input
					name="user"
					type="text"
					placeholder="Kdo to napsal?"
					required
					onChange={(e) => {
						setUserPass(e.target.value);
					}}
				/>
				<label htmlFor="headline">Nadpis</label>
				<input
					className="postTitle"
					name="headline"
					type="text"
					placeholder="Nadpis"
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<label htmlFor="post">Příspěvek</label>
				<textarea
					onChange={(e) => {
						setText(e.target.value);
					}}
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
