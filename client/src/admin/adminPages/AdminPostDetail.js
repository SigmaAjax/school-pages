import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';
import useCap from '../../Hooks/useCap';
import useSlugify from '../../Hooks/useSlugify';

import styles from './../../pages/admin.module.css';
import {Box, Button, Grid} from '@mui/material';
import {Loader} from '../../Loader';

const customStyles = {
	customLabel: {
		color: '#444',
		fontSize: '1.2em',
	},
	customInput: {
		marginBottom: '1em',
		padding: '0.5em',
		border: '1px solid #444',
		borderRadius: '5px',
		width: '100%',
	},
	customTextArea: {
		marginBottom: '1em',
		padding: '0.5em',
		border: '1px solid #444',
		borderRadius: '5px',
		width: '100%',
		resize: 'none',
	},
};

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
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		const controller = new AbortController();
		const fetchData = async () => {
			try {
				setLoading((prev) => !prev); // false
				const response = await axios.get(`/api/get/${id}/${titleSlug}`, {
					signal: controller.signal,
				});

				if (response.status === 200) {
					setPost(() => {
						return response.data[0];
					});
					setLoading((prev) => !prev); // false
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
				setLoading((prev) => !prev); //false
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

	if (loading) {
		return <Loader />;
	}

	if (errorMessage) {
		return (
			<div>
				<p>Nepodařilo se načíst Album</p>
				<p>Error: {errorMessage}</p>
			</div>
		);
	}

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			m={1}
			p={1}
			style={{minWidth: '300px', maxWidth: '900px', margin: '0 auto'}}
		>
			<form className={`${styles.item} ${styles.one}`} onSubmit={handleSubmit}>
				{' '}
				{Object.values(post).length > 0 ? (
					<>
						<label style={customStyles.customLabel} htmlFor="post-title">
							Nadpis
						</label>
						<input
							style={customStyles.customInput}
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
							style={customStyles.customTextArea}
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
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					spacing={1}
					paddingBottom={3}
				>
					<Grid item>
						<Button
							color="error"
							variant="contained"
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
							sx={{
								'&:hover': {
									backgroundColor: 'darkred',
								},
							}}
						>
							Vymazat
						</Button>
					</Grid>
					<Grid item>
						<Button
							color="primary"
							variant="contained"
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
							sx={{
								'&:hover': {
									backgroundColor: 'darkblue',
								},
							}}
						>
							Upravit
						</Button>
					</Grid>
				</Grid>
				<RouterLink
					style={{
						color: 'green',
					}}
					to="/admin/newPost/admin-posts"
				>
					Zpět na seznamu příspěvků
				</RouterLink>
			</form>
		</Box>
	);
}
