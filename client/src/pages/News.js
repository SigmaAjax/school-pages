import axios from 'axios';
import {useState, useEffect} from 'react';
import Post from '../components/ui/Post';

export default function News() {
	const [postList, setPostList] = useState([]);

	useEffect(() => {
		axios.get('/api/get').then((data) => {
			setPostList(data.data);
		});
	}, []);

	//console.log(postList);

	return (
		<div className="item two">
			<h1>Co nového? aka Aktuality</h1>
			{postList.map((val, key) => {
				return <Post key={val.id} content={val} />;
			})}
		</div>
	);
}
