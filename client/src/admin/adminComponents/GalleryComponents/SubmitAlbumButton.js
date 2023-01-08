export default function SubmitAlbumButton({oneCheck}) {
	//const {title, description, images} = values;
	return (
		<button type="submit" disabled={!oneCheck}>
			Vytvořit Album
		</button>
	);
}
