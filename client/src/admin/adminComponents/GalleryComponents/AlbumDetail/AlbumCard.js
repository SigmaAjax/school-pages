import {Link} from 'react-router-dom';

export default function AlbumCard({content}) {
	const renderPicture = (picture) => {
		return (
			picture.intro && (
				<img
					loading={'lazy'}
					width={100}
					height={100}
					key={picture.public_id}
					// cloudName={process.env.REACT_APP_CLOUD_NAME}
					// publicId={picture.public_id}
					src={picture.secure_url}
					alt="Fotografie z alba"
				/>
			)
		);
	};

	const renderAlbum = (album) => {
		const introPicture = album.arrayOfPictures.find((picture) => picture.intro);
		return introPicture && renderPicture(introPicture);
	};
	return (
		<div key={content.album_id}>
			<Link to={`/admin/galerie/${content.album_id}/${content.slug}`}>
				<h4>{content.album_title}</h4>
				{renderAlbum(content)}
			</Link>
			<button>X</button>
		</div>
	);
}
