import axios from 'axios';
import {useState, useEffect} from 'react';
import {Grid, Typography, Button, TextField, Box} from '@mui/material';
import {Loader} from '../Loader';
import PostList from '../components/ui/Posts/PostList';

export default function News() {
	const [postList, setPostList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState(null);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [tempSearchPhrase, setTempSearchPhrase] = useState(''); // New state variable

	const filteredPosts = postList.filter((post) => {
		return post.title.toLowerCase().includes(searchPhrase.toLowerCase());
	});

	const handleSearchButtonClick = () => {
		setSearchPhrase(tempSearchPhrase); // Update from tempSearchPhrase
	};

	const fetchPosts = async () => {
		try {
			const url =
				process.env.NODE_ENV === 'production'
					? `${process.env.REACT_APP_BACKEND_URL}/api/get`
					: '/api/get';
			const response = await axios.get(url);

			if (response.status === 200) {
				setPostList(response.data);
			} else {
				throw new Error(`Error ${response.status}: ${response.statusText}`);
			}

			setIsLoading(false);
		} catch (error) {
			console.error('Error:', error);
			setErrorMsg(`${error.message} \n ${error.stack} \n ${error.status}`);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	if (errorMsg) {
		return <h1>{errorMsg}</h1>;
	}

	if (postList?.length === 0) {
		return <h1>No posts available</h1>;
	}

	return (
		<Grid
			container
			sx={{marginBottom: 10, marginTop: 10}}
			justifyContent="center"
		>
			<Grid
				item
				xs={12}
				sm={6}
				md={6}
				lg={6}
				display="flex"
				justifyContent={'center'}
				alignItems={'flex-end'}
			>
				<Typography
					variant="h1"
					style={{textShadow: '2px 2px 4px #000', color: 'white'}}
				>
					Aktuality
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={6} lg={6}>
				<Box
					display={'flex'}
					flexDirection={'row'}
					justifyContent="space-evenly"
					alignItems={'flex-end'}
					marginBottom={2}
				>
					<TextField
						sx={{
							marginTop: 10,
							backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
							boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.2)', // Soft box shadow
							borderRadius: '8px',
						}}
						placeholder="např. Prázdniny"
						label="Vyhledat podle názvu"
						autoComplete="off"
						variant="filled"
						value={tempSearchPhrase} // Use tempSearchPhrase
						onChange={(e) => setTempSearchPhrase(e.target.value)} // Update tempSearchPhrase
						size="small"
					/>
					<Button
						variant="contained"
						sx={{
							boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.2)',
						}}
						onClick={handleSearchButtonClick}
					>
						Vyhledat
					</Button>
				</Box>
			</Grid>
			{postList?.length === 0 ? (
				<Loader />
			) : (
				<PostList listOfPosts={filteredPosts} />
			)}
		</Grid>
	);
}
