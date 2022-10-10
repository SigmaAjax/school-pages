import axios from 'axios';
import {useState, useEffect} from 'react';

export default function News() {
	const [postList, setPostList] = useState([]);

	useEffect(() => {
		axios.get('/api/get').then((data) => {
			setPostList(data.data);
		});
	}, []);

	return (
		<div className="item two">
			<h1>Co nového?</h1>
			{postList.map((val, key) => {
				return (
					<div className="postContainer item two">
						<h2>{val.title}</h2>
						<p>
							{val.post_text.length > 200
								? val.post_text.substring(0, 200) + '...'
								: val.post_text}
						</p>
						<strong>{val.user_name}</strong>
					</div>
				);
			})}
		</div>
	);
}
