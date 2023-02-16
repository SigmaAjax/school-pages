import CloudinaryImageCard from './CloudinaryImageCard';

export default function CloudinaryImageCardsList({photosList, setPhotos}) {
	const checkedBox = photosList.some((image) => {
		if (image.introductionary === true) return true;
		return false;
	});

	console.log('checkedBox in CloudinaryImageCardsList...', checkedBox);
	//console.log(imagesList);
	return (
		<>
			{photosList.length > 0 ? (
				<div className="item two">
					{checkedBox
						? photosList.map((image) => {
								return (
									<CloudinaryImageCard
										image={image}
										setPhotos={setPhotos}
										intro={!image.introductionary}
									/>
								);
						  })
						: photosList.map((image) => {
								return (
									<CloudinaryImageCard image={image} setPhotos={setPhotos} />
								);
						  })}
				</div>
			) : (
				<h5>No images yet</h5>
			)}
		</>
	);
}
