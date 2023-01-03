import axios from 'axios';
import {useEffect, useState} from 'react';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';

import AdminPostList from '../adminComponents/PostComponents/AdminPostList';
import CreatePostNav from '../adminComponents/PostComponents/CreatePostNav';
import SearchInput from '../adminComponents/PostComponents/SearchInput';

export default function AdminNews() {
	//const [postList, setPostList] = useState([]);
	const {postList, buttonName} = useAdmin();
	const {setPostList, setButtonName} = useAdminUpdate();
	// Filtered Searched posts
	const [filterSearch, setFilterSeach] = useState('');
	// Sorting state
	const [sortingType, setSortingType] = useState('');

	let filterredPosts = postList.filter((post) => {
		return post.title.toLowerCase().includes(filterSearch.toLowerCase()); // filter
	});

	console.log(filterredPosts);

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
	}, [buttonName, sortingType]);

	return (
		<div className="item two">
			<>
				<h1>Aktuality</h1>
				<CreatePostNav />{' '}
			</>
			<label htmlFor="search">Vyhledávání příspěvků</label>
			<SearchInput filterSearch={filterSearch} filterFunc={setFilterSeach} />
			<label htmlFor="ordering-option">Seřadit podle</label>
			<select
				name="ordering-options"
				onChange={(e) => {
					switch (e.target.value) {
						case 'alphabet':
							console.log(e.target.value);
							setSortingType((prev) => {
								return e.target.value;
							});
							filterredPosts = filterredPosts.sort((a, b) => {
								if (a.title.toLowerCase() < b.title.toLowerCase()) {
									return -1;
								}
								if (a.title.toLowerCase() > b.title.toLowerCase()) {
									return 1;
								}
								return 0;
							});
							console.log(sortingType);
							console.log(filterredPosts);
							break;

						case 'date-created':
							setSortingType((prev) => {
								return e.target.value;
							});
							console.log(sortingType);
							console.log(e.target.value);
							break;

						case 'date-updated':
							setSortingType((prev) => {
								return e.target.value;
							});
							console.log(sortingType);
							console.log(e.target.value);
							break;

						default:
							break;
					}
				}}
			>
				<option key="empty" value={null}></option>
				<option key={'alphabet'} value="alphabet">
					Názvu v abecedním pořadí
				</option>
				<option key="created" value="date-created">
					Datumu vytvoření
				</option>
				<option key={'change'} value="date-updated">
					Datumu změny
				</option>
			</select>
			<AdminPostList listOfPosts={filterredPosts} />
			{/* {postList.map((val) => {
				return <AdminPost key={val.id} content={val} />;
			})} */}
		</div>
	);
}
