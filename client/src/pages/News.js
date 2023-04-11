import axios from 'axios';
import {useEffect} from 'react';
import Post from '../components/ui/Post';
import {useAdmin, useAdminUpdate} from '../context/AdminContext';
import SubNavigation from '../admin/Subnavigation';

export default function News({admin}) {
	//const [postList, setPostList] = useState([]);
	const {postList, buttonName} = useAdmin();
	const {setPostList, setButtonName} = useAdminUpdate();

	useEffect(() => {
		setButtonName((prev) => {
			return (prev = 'post-delete');
		});
		const controller = new AbortController();
		axios.get('/api/get', {signal: controller.signal}).then((response) => {
			setPostList((prev) => {
				return [...response.data];
			});
		});
		return () => {
			controller.abort();
		};
	}, [postList]);

	return (
		<div className="item two">
			{admin ? (
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
			)}

			{postList.map((val) => {
				return <Post key={val.id} content={val} admin={admin} />;
			})}
		</div>
	);
}
