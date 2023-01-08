export default function AlbumHeader({title, description}) {
	return (
		<>
			{' '}
			<label htmlFor="albumName">Název Alba</label>
			<input
				name="albumName"
				required
				type="text"
				placeholder="např. Výlet do Kamenického Šenova"
				// onChange={(event) => {
				// 	setTitle(() => {
				// 		return event.target.value;
				// 	});
				ref={title}
			></input>
			<label htmlFor="albumDescription">Popisek Alba</label>
			<textarea
				ref={description}
				rows="12"
				cols="40"
				name="albumDescription"
				type="text"
				placeholder="Byli jsme na výletě...."
			></textarea>
		</>
	);
}
