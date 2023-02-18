import useCap from '../../../../Hooks/useCap';
import {Loader} from '../../../../Loader';

export default function AlbumDescription({album}) {
	const {capitalize} = useCap();
	const descriptionLength = album?.description?.length || 0;

	const datumCreated = new Date(album?.date_created);

	const formatDateCzech = new Intl.DateTimeFormat('cs-cz', {
		dateStyle: 'full',
		timeStyle: 'short',
	});
	console.log(descriptionLength);
	if (descriptionLength !== 0) return <Loader />;
	return (
		<>
			{album ? (
				<div>
					{album.album_title ? (
						<input type="text" defaultValue={capitalize(album?.album_title)} />
					) : (
						<p>Název chybí nebo se nepodařil načíst</p>
					)}
					{album.date_created ? (
						<p>
							Vytvořeno v:{' '}
							<strong>{formatDateCzech.format(datumCreated)}</strong>
						</p>
					) : (
						<strong>Chybí Datum v databázi</strong>
					)}
					{descriptionLength > 0 ? (
						<textarea rows={5} defaultValue={album.description} />
					) : (
						<textarea rows={5} placeholder="Popisek zatím nebyl přidán" />
					)}
				</div>
			) : (
				<>
					<p>Nepořilo se načíst Album...</p>
				</>
			)}
		</>
	);
}
