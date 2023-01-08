import axios from 'axios';
import {useEffect} from 'react';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';

import AdminPostList from '../adminComponents/PostComponents/AdminPostList';
import CreatePostNav from '../adminComponents/PostComponents/CreatePostNav';
import SearchInput from '../adminComponents/PostComponents/SearchInput';
import SelectInput from '../adminComponents/PostComponents/SelectInput';
import SelectYearMonth from '../adminComponents/PostComponents/SelectYearMonth';
import {Loader} from 'client/src/Loader.js';

export default function AdminNews() {
	const {setButtonName, setPostList} = useAdminUpdate();
	const {postList} = useAdmin();
	// Filtered Searched posts
	// const [localPostList, setLocalPostList] = useState(() => {
	// 	return postList;
	// });
	// Sorting state

	useEffect(() => {
		setButtonName(() => {
			return 'post-delete';
		});

		const controller = new AbortController();

		async function fetchData() {
			const response = await axios.get('/api/get', {signal: controller.signal});
			const posts = await response.data;
			console.log('Loading posts...');
			setPostList(() => {
				return [...posts];
			});
		}

		fetchData();

		return () => {
			console.log('aborting');
			controller.abort();
		};
	}, []);

	return (
		<div className="item two">
			<>
				<h1>Aktuality</h1>
				<CreatePostNav />{' '}
			</>
			<label htmlFor="search">Vyhledávání příspěvků</label>
			<SearchInput listOfPostsAfterSearch={setPostList} />
			<SelectInput
				orderedPostFunc={setPostList}
				orderedListOfPosts={postList}
			/>
			<SelectYearMonth orderedListFromToFunc={setPostList} />
			{/* <AdminPostList listOfPosts={postList} /> */}
			{postList.length < 0 ? (
				<Loader />
			) : (
				<AdminPostList listOfPosts={postList} />
			)}
		</div>
	);
}
