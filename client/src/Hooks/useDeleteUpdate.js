import axios from 'axios';
import {useAdmin, useAdminUpdate} from '../context/AdminContext';

export default function useDeleteUpdate(buttonName, item) {
	var arrOfButtonName = buttonName.split('-');
	//context states for updating state after deleting
	const {postList} = useAdmin();
	const {setPostList} = useAdminUpdate();

	const deleteAnyItem = (item) => {
		console.log('Deleting with button', buttonName);
		console.log('Deleting item with id: ' + item.id);
		console.table(item);
	};

	const updateAnyItem = (item) => {
		console.log('Updating post with button', buttonName);
		console.log('Updating item with id: ' + item.id);
		console.table(item);
	};

	const deletePostItem = (item) => {
		console.log(item.id);
		axios
			.delete(`/api/deletePost/${item.id}`)
			.then(() => {
				setPostList((prev) => {
					prev = postList.filter((post) => {
						return post.id !== item.id;
					});
					return prev;
				});
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const updatePostItem = (item) => {
		console.log('Updating post with button', buttonName);
		console.log('Updating item with id: ' + item.id);
		console.table(item);
		axios
			.put('/api/updatePost', {
				id: item.id,
				userPass: item.user_name,
				title: item.title,
				text: item.post_text,
				slug: item.slug,
			})
			.then((response) => {
				alert('Updating this data...', response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	function updateOrDelete(id) {
		switch (arrOfButtonName[0]) {
			case 'post':
				return arrOfButtonName[1] === 'delete'
					? deletePostItem(item)
					: updatePostItem(item);

				break;

			case 'employee':
				return arrOfButtonName[1] === 'delete'
					? deleteAnyItem(item)
					: updateAnyItem(item);

				break;
			// case image and document
			default:
				console.log(buttonName);
		}
	}

	return {updateOrDelete};
}
