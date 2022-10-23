export default function useDeleteUpdate(buttonName, item) {
	var arrOfButtonName = buttonName.split('-');

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

	function updateOrDelete(id) {
		switch (arrOfButtonName[0]) {
			case 'post':
				return arrOfButtonName[1] === 'delete'
					? deleteAnyItem(item)
					: updateAnyItem(item);

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
