import axios from 'axios';
import {useState, useEffect} from 'react';
import Post from '../components/ui/Post';
import {Grid, Typography} from '@mui/material';
import {Loader} from '../Loader';

export default function News() {
	const [postList, setPostList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState(null);

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
				// This will run if the status is not 200, e.g. 404 or 500
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
		return <h1>{errorMsg}</h1>; // You can format this error message as you see fit
	}

	if (postList?.length === 0) {
		return <h1>No posts available</h1>;
	}

	return (
		<Grid container marginTop={60}>
			<Typography variant="h1" sx={{marginLeft: '64px'}}>
				Aktuality
			</Typography>
			<Grid container spacing={8} margin={1} justifyContent={'center'}>
				{postList.map((post) => (
					<Post key={post.id} {...post} />
				))}
			</Grid>
		</Grid>
	);
}
