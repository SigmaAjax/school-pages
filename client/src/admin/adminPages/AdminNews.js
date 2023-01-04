import {useEffect, useState} from 'react';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';

import AdminPostList from '../adminComponents/PostComponents/AdminPostList';
import CreatePostNav from '../adminComponents/PostComponents/CreatePostNav';
import SearchInput from '../adminComponents/PostComponents/SearchInput';
import SelectInput from '../adminComponents/PostComponents/SelectInput';
import SelectYearMonth from '../adminComponents/PostComponents/SelectYearMonth';

export default function AdminNews() {
	const {postList} = useAdmin();
	const {setButtonName} = useAdminUpdate();
	// Filtered Searched posts
	const [localPostList, setLocalPostList] = useState(() => postList);
	// Sorting state

	useEffect(() => {
		const timeout = setTimeout(() => {
			console.log('Coping data from postList context');
			setButtonName(() => {
				return 'post-delete';
			});
			setLocalPostList(() => {
				return [...postList];
			}, 1000);
			return () => {
				clearTimeout(timeout);
			};
		});
	}, [postList]);

	return (
		<div className="item two">
			<>
				<h1>Aktuality</h1>
				<CreatePostNav />{' '}
			</>
			<label htmlFor="search">Vyhledávání příspěvků</label>
			<SearchInput listOfPostsAfterSearch={setLocalPostList} />
			<SelectInput
				orderedPostFunc={setLocalPostList}
				orderedListOfPosts={localPostList}
			/>
			<SelectYearMonth orderedListFromToFunc={setLocalPostList} />
			<AdminPostList listOfPosts={localPostList} />
			{/* {loading ? (
				<p>... Nahrávání dat</p>
			) : (
				<AdminPostList listOfPosts={localPostList} />
			)} */}
		</div>
	);
}
