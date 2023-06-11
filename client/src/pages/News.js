import axios from 'axios';
import {useEffect, useState} from 'react';
import Post from '../components/ui/Post';

export default function News() {
	const [postList, setPostList] = useState([]);
	// const {postList, buttonName} = useAdmin();
	// const {setPostList, setButtonName} = useAdminUpdate();

	const url =
		process.env.NODE_ENV === 'production'
			? `${process.env.REACT_APP_BACKEND_URL}/api/get`
			: '/api/get';

	useEffect(() => {
		const controller = new AbortController();
		axios.get(url, {signal: controller.signal}).then((response) => {
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
			{/* {admin ? (
				<>
					<h1>Aktuality</h1>
					<SubNavigation
						navItems={[
							{
								exact: true,
								to: '/admin/newPost',
								label: 'Vytvoř aktualitu nebo příspěvek',
							},
							{
								exact: false,
								to: '/admin/newPost/admin-posts',
								label: 'Uprav aktualitu nebo příspěvek',
							},
						]}
					/>{' '}
				</>
			) : (
				<h1>Co nového? aka Aktuality</h1>
			)} */}

			{/* {postList.map((val) => {
				return <Post key={val.id} content={val} admin={admin} />;
			})} */}
		</div>
	);
}
