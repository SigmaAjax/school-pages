import {useAdmin} from '../../../context/AdminContext';

export default function SearchInput({listOfPostsAfterSearch}) {
	const {postList} = useAdmin();
	return (
		<input
			type={'text'}
			placeholder="Vyhledat příspěvek podle názvu"
			onChange={(event) => {
				//filterFunc(() => event.target.value);

				listOfPostsAfterSearch(() => {
					const filterredPosts = postList.filter((post) => {
						return post.title
							.toLowerCase()
							.includes(event.target.value.toLowerCase()); // filter
					});
					return filterredPosts;
				});
			}}
		/>
	);
}
