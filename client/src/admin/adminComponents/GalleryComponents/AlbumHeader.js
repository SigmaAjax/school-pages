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
				onChange={(e) => {
					title(() => {
						return e.target.value;
					});
				}}
			></input>
			<label htmlFor="albumDescription">Popisek Alba</label>
			<em>Maximální počet znaků je 250</em>
			<textarea
				maxLength={250}
				onChange={(e) => {
					description(() => {
						return e.target.value;
					});
				}}
				rows="12"
				cols="40"
				name="albumDescription"
				type="text"
				placeholder="Byli jsme na výletě...."
			></textarea>
		</>
	);
}
