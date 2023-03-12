export default function SubmitAlbumButton({images}) {
	const oneCheck = images?.some((image) => {
		if (image.introductionary === true) return true;
		return false;
	});
	console.log(oneCheck);

	return (
		<button type="submit" disabled={!oneCheck}>
			Vytvořit Album
		</button>
	);
}
