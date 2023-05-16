import {useRef, useState} from 'react';
import axios from 'axios';
import useSlugify from 'client/src/Hooks/useSlugify.js';
import {useNavigate} from 'react-router-dom';
import SubNavigation from '../../Subnavigation';

import {
	Button,
	TextField,
	Typography,
	Box,
	Grid,
	Card,
	CardContent,
	CardActions,
} from '@mui/material';

import styles from '../../../pages/admin.module.css';

export default function CreatePost() {
	const title = useRef();
	const text = useRef();
	const userPass = useRef();
	const {slugify} = useSlugify();
	const navigate = useNavigate();

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
			<Typography variant="h4">Aktuality</Typography>
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
			/>
			<Card
				sx={{
					boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
					backgroundColor: '#f5f5f5',
					borderRadius: '4px',
					marginBottom: 2,
					marginTop: 2,
				}}
			>
				<CardContent>
					<Grid
						container
						direction="column"
						alignItems="center"
						justifyContent="center"
						spacing={2}
					>
						<Grid item xs={12} sm={8} md={6} lg={4}>
							<TextField
								fullWidth
								style={{minWidth: 400}}
								inputRef={userPass}
								label="Autor příspěvku"
								variant="outlined"
								required
							/>
						</Grid>
						<Grid item xs={12} sm={8} md={6} lg={4}>
							<TextField
								fullWidth
								style={{minWidth: 400}}
								inputRef={title}
								label="Nadpis"
								variant="outlined"
								required
							/>
						</Grid>
						<Grid item xs={12} sm={8} md={6} lg={4}>
							<TextField
								fullWidth
								style={{minWidth: 400}}
								inputRef={text}
								label="Příspěvek"
								variant="outlined"
								multiline
								rows={12}
								columns={12}
								required
							/>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions>
					<Grid
						container
						direction="row"
						alignItems="center"
						justifyContent="center"
					>
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							container
							justifyContent={'center'}
						>
							<Button variant="contained" color="primary" onClick={submitPost}>
								Publikovat příspěvek
							</Button>
						</Grid>
					</Grid>
				</CardActions>
			</Card>
		</>
	);
}
