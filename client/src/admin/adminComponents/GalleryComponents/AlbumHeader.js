export default function AlbumHeader({title, description}) {
	return (
		<>
			{' '}
			<label htmlFor="albumName">Název Alba</label>
			<em>Maximální počet znaků je 60</em>
			<input
				maxLength={60}
				name="albumName"
				required
				type="text"
				placeholder="např. Výlet do Kamenického Šenova"
				ref={title}
			></input>
			<label htmlFor="albumDescription">Popisek Alba</label>
			<em>Maximální počet znaků je 250</em>
			<textarea
				maxLength={250}
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
