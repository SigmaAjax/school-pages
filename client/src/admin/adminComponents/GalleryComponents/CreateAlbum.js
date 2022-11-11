export default function CreateAlbum() {
	return (
		<div className="item three">
			<form className="form-group" onSubmit={console.log('Album created')}>
				<label htmlFor="albumName">Název Alba</label>
				<input
					name="albumName"
					required
					type="text"
					placeholder="např. Výlet do Kamenického Šenova"
				></input>
				<label htmlFor="albumDescription">Popisek Alba</label>
				<textarea
					rows="12"
					cols="40"
					name="albumDescription"
					type="text"
					placeholder="Byli jsme na výletě...."
				></textarea>
				<button type="submit">Vytvořit Album</button>
			</form>
		</div>
	);
}
