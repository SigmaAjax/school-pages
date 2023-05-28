import {Button} from '@mui/material';

export default function SubmitAlbumButton({images}) {
	const oneCheck = images?.some((image) => {
		if (image.introductionary === true) return true;
		return false;
	});

	return (
		<Button
			color="primary"
			variant="contained"
			type="submit"
			disabled={!oneCheck}
			sx={{maxWidth: '200px'}}
		>
			Vytvořit Album
		</Button>
	);
}
