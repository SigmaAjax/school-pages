import axios from 'axios';
import {useState, useEffect} from 'react';
import Post from '../components/ui/Post';
import {Grid, Typography, Button} from '@mui/material';
import {Loader} from '../Loader';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function News() {
	const [postList, setPostList] = useState([]);
	const [numDisplayedPosts, setNumDisplayedPosts] = useState(2); // start with 2 posts
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

	const loadMorePosts = () => {
		setNumDisplayedPosts((prev) => prev + 2); // add 2 more posts with every click
	};

	const displayedPosts = postList.slice(0, numDisplayedPosts);

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
		<Grid container marginTop={60} marginBottom={20}>
			<Typography variant="h1" sx={{marginLeft: '64px'}}>
				Aktuality
			</Typography>
			<Grid container spacing={8} margin={1} justifyContent={'center'}>
				{displayedPosts.map((post) => (
					<Post key={post.id} {...post} />
				))}
			</Grid>
			{numDisplayedPosts < postList.length && (
				<Grid
					container
					justifyContent="center"
					sx={{marginTop: 2, marginBottom: 2}}
				>
					<Button
						variant="contained"
						onClick={loadMorePosts}
						endIcon={<ExpandMoreIcon />}
						size="medium"
					>
						Další
					</Button>
				</Grid>
			)}
		</Grid>
	);
}
