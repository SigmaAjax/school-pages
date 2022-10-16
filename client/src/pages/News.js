import axios from 'axios';
import {useState, useEffect} from 'react';
import Post from '../components/ui/Post';

export default function News({admin, deletingFnc}) {
	const [postList, setPostList] = useState([]);

	useEffect(() => {
		const controller = new AbortController();
		axios.get('/api/get', {signal: controller.signal}).then((response) => {
			setPostList((prev) => {
				return [...response.data];
			});
		});
		return () => {
			controller.abort();
		};
	}, []);

	return (
		<div className="item two">
			<h1>Co nového? aka Aktuality</h1>
			{postList.map((val) => {
				return (
					<Post
						key={val.id}
						content={val}
						admin={admin}
						deletingFnc={deletingFnc}
					/>
				);
			})}
		</div>
	);
}
