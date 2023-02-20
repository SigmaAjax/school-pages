import useCap from '../../../../Hooks/useCap';
import {Loader} from '../../../../Loader';

export default function AlbumDescription({album, heading}) {
	const {title, description} = heading;
	const {capitalize} = useCap();
	const titleLength = album?.album_title?.length || 0;
	const descriptionLength = album?.description?.length || 0;

	const datumCreated = new Date(album?.date_created);

	const formatDateCzech = new Intl.DateTimeFormat('cs-cz', {
		dateStyle: 'full',
		timeStyle: 'short',
	});
	if (titleLength === 0) return <Loader />;
	return (
		<>
			{album ? (
				<div>
					{album?.album_title ? (
						<input
							required={true}
							ref={title}
							type="text"
							defaultValue={capitalize(album?.album_title)}
						/>
					) : (
						<p>Název chybí nebo se nepodařil načíst</p>
					)}
					{album?.date_created ? (
						<p>
							Vytvořeno v:{' '}
							<strong>{formatDateCzech.format(datumCreated)}</strong>
						</p>
					) : (
						<strong>Chybí Datum v databázi</strong>
					)}
					{descriptionLength > 0 ? (
						<textarea
							ref={description}
							rows={5}
							defaultValue={album.description}
						/>
					) : (
						<textarea
							ref={description}
							rows={5}
							placeholder="Popisek zatím nebyl přidán"
						/>
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
