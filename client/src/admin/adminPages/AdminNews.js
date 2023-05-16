import axios from 'axios';
import {useEffect, useState} from 'react';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';

import AdminPostList from '../adminComponents/PostComponents/AdminPostList';
import SearchInput from '../adminComponents/PostComponents/SearchInput';
import SelectInput from '../adminComponents/PostComponents/SelectInput';
import SelectYearMonth from '../adminComponents/PostComponents/SelectYearMonth';
import {Loader} from 'client/src/Loader.js';
import SubNavigation from '../Subnavigation';

import styles from '../../pages/admin.module.css';

export default function AdminNews() {
	const {setButtonName, setPostList, setPost} = useAdminUpdate();
	const {postList, post} = useAdmin();
	// Filtered Searched posts
	const [searchPhrase, setSearchPhrase] = useState('');
	// Sorting state

	const filterredPosts = postList.filter((post) => {
		return post.title.toLowerCase().includes(searchPhrase);
	});

	//console.table(process.env);

	useEffect(() => {
		setButtonName(() => {
			return 'post-delete';
		});

		const controller = new AbortController();

		async function fetchData() {
			const response = await axios.get('/api/get', {signal: controller.signal});
			setPost(() => {
				return {};
			});
			console.log(post);
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
		<div className={`${styles.item} ${styles.two}`}>
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

			<SearchInput searchWord={setSearchPhrase} />
			<SelectInput
				orderedPostFunc={setPostList}
				orderedListOfPosts={postList}
			/>
			<SelectYearMonth orderedListFromToFunc={setPostList} />
			{postList.length < 0 ? (
				<Loader />
			) : (
				<AdminPostList listOfPosts={filterredPosts} />
			)}
		</div>
	);
}
