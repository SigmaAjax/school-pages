import {useState} from 'react';
import AdminPost from './AdminPost';
import {Button} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AdminPostList({listOfPosts}) {
	const [numDisplayedPosts, setNumDisplayedPosts] = useState(5);

	function loadMorePosts() {
		setNumDisplayedPosts((prev) => prev + 5);
	}

	const displayedPosts = listOfPosts.slice(0, numDisplayedPosts);

	return (
		<div
			style={{
				paddingTop: 20,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{displayedPosts.map((val) => {
				return <AdminPost key={val.id} content={val} />;
			})}
			{numDisplayedPosts < listOfPosts.length && (
				<Button
					variant="contained"
					onClick={loadMorePosts}
					style={{marginTop: 20, marginBottom: 20}}
					endIcon={<ExpandMoreIcon />}
					size="medium"
				>
					Další
				</Button>
			)}
		</div>
	);
}
