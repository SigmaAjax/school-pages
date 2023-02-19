import {useAdminUpdate} from '../../../context/AdminContext';

export default function SubmitAlbumButton({images}) {
	const oneCheck = images.some((image) => {
		if (image.introductionary === true) return true;
		return false;
	});

	return (
		<button type="submit" disabled={!oneCheck}>
			Vytvořit Album
		</button>
	);
}
