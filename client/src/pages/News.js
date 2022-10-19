import axios from 'axios';
import {useState, useEffect} from 'react';
import CreatePostNav from '../admin/adminComponents/PostComponents/CreatePostNav';
import Post from '../components/ui/Post';
import {useAdmin, useAdminUpdate} from '../context/AdminContext';

export default function News({admin}) {
	//const [postList, setPostList] = useState([]);
	const {postList} = useAdmin();
	const {setPostList} = useAdminUpdate();

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
			{admin ? (
				<>
					<h1>Aktuality</h1>
					<CreatePostNav />{' '}
				</>
			) : (
				<h1>Co nového? aka Aktuality</h1>
			)}

			{postList.map((val) => {
				return <Post key={val.id} content={val} admin={admin} />;
			})}
		</div>
	);
}
