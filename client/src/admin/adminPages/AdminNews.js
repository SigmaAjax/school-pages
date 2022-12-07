import axios from 'axios';
import {useEffect} from 'react';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';

import AdminPost from '../adminComponents/PostComponents/AdminPost';
import CreatePostNav from '../adminComponents/PostComponents/CreatePostNav';

export default function AdminNews() {
	//const [postList, setPostList] = useState([]);
	const {postList, buttonName} = useAdmin();
	const {setPostList, setButtonName} = useAdminUpdate();

	useEffect(() => {
		setButtonName((prev) => {
			return (prev = 'post-delete');
		});
		const controller = new AbortController();
		axios
			.get('/api/get', {signal: controller.signal})
			.then((response) => {
				setPostList((prev) => {
					return [...response.data];
				});
			})
			.catch((error) => {
				console.error(error);
			});
		return () => {
			controller.abort();
		};
	}, [buttonName]);

	return (
		<div className="item two">
			<>
				<h1>Aktuality</h1>
				<CreatePostNav />{' '}
			</>

			{postList.map((val) => {
				return <AdminPost key={val.id} content={val} />;
			})}
		</div>
	);
}
