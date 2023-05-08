import {Button} from '@mui/material';

export default function DeleteAlbumButton({images, handleDelete}) {
	const oneCheck = images.some((image) => {
		if (image.introductionary === true) return true;
		return false;
	});

	return (
		<Button
			color="error"
			variant="contained"
			name="album-delete"
			type="button"
			disabled={!oneCheck}
			sx={{
				'&:hover': {
					backgroundColor: 'darkred',
				},
			}}
			onClick={(e) => {
				handleDelete(e);
			}}
		>
			Vymazat Album
		</Button>
	);
}
