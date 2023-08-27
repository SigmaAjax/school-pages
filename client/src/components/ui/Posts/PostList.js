import {useState} from 'react';
import {Grid, Button} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Post from './Post';

export default function PostList({listOfPosts}) {
	const [numDisplayedPosts, setNumDisplayedPosts] = useState(2);

	const loadMorePosts = () => {
		setNumDisplayedPosts((prev) => prev + 2);
	};

	const displayedPosts = listOfPosts.slice(0, numDisplayedPosts);

	return (
		<Grid
			container
			spacing={8}
			margin={1}
			marginBottom={4}
			justifyContent={'center'}
		>
			{displayedPosts.map((post) => (
				<Post key={post.id} {...post} />
			))}
			{numDisplayedPosts < listOfPosts.length && (
				<Grid
					container
					justifyContent="center"
					sx={{marginTop: 2, marginBottom: 0, marginLeft: 0}}
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
