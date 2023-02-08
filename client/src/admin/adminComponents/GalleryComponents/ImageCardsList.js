import ImageCard from './ImageCard';

export default function ImageCardsList({imagesList, setImages, checkedBox}) {
	//const {checkedBox} = rest;
	//console.log(imagesList);
	return (
		<>
			{imagesList.length > 0 ? (
				<div className="item two">
					{checkedBox
						? imagesList.map((image) => {
								return (
									<ImageCard
										image={image}
										setImages={setImages}
										intro={!image.introductionary}
									/>
								);
						  })
						: imagesList.map((image) => {
								return <ImageCard image={image} setImages={setImages} />;
						  })}
				</div>
			) : (
				<h5>No images yet</h5>
			)}
		</>
	);
}
