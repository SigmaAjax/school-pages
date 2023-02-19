import {useAdminUpdate} from '../../../../context/AdminContext';

export default function DeleteAlbumButton({images, handleDelete}) {
	const oneCheck = images.some((image) => {
		if (image.introductionary === true) return true;
		return false;
	});

	return (
		<button
			name="album-delete"
			type="button"
			disabled={!oneCheck}
			onClick={(e) => {
				handleDelete(e);
			}}
		>
			Vymazat Album
		</button>
	);
}
