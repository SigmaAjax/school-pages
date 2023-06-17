import useCap from '../../../../Hooks/useCap';
import {Loader} from '../../../../Loader';

import gallery from '../gallery.module.css';

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
				<div className={gallery.inputContainer}>
					<label htmlFor="title" className={gallery.label}>
						Název alba
					</label>
					<input
						name="title"
						id="title"
						className={gallery.input}
						required={true}
						ref={title}
						type="text"
						defaultValue={capitalize(album?.album_title)}
					/>
					{album?.date_created ? (
						<p className={gallery.dateSmall}>
							Vytvořeno v:{' '}
							<strong>{formatDateCzech.format(datumCreated)}</strong>
						</p>
					) : (
						<strong>Chybí Datum v databázi</strong>
					)}
					<label htmlFor="description" className={gallery.label}>
						Popis alba
					</label>
					{descriptionLength > 0 ? (
						<textarea
							className={gallery.textarea}
							ref={description}
							rows={5}
							defaultValue={album.description}
							id="description"
						/>
					) : (
						<textarea
							className={gallery.textarea}
							ref={description}
							rows={5}
							placeholder="Popisek zatím nebyl přidán"
							id="description"
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
