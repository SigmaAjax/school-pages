import CloudinaryImageCard from './CloudinaryImageCard';

export default function CloudinaryImageCardsList({photosList, setPhotos}) {
	const checkedBox = photosList.some((image) => {
		if (image.introductionary === true) return true;
		return false;
	});

	return (
		<>
			{photosList ? (
				<div className="item two">
					{checkedBox
						? photosList.map((image) => {
								return (
									<CloudinaryImageCard
										key={image.name}
										image={image}
										setPhotos={setPhotos}
										intro={!image.introductionary}
									/>
								);
						  })
						: photosList.map((image) => {
								return (
									<CloudinaryImageCard
										key={image.name}
										image={image}
										setPhotos={setPhotos}
									/>
								);
						  })}
				</div>
			) : (
				<h5>No images yet</h5>
			)}
		</>
	);
}
