import ImageCard from './ImageCard';

const parentStyle = {
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'space-between', // If you want to have some space between the images
};

export default function ImageCardsList({imagesList, setImages, checkedBox}) {
	return (
		<>
			{imagesList.length > 0 ? (
				<div style={parentStyle}>
					{checkedBox
						? imagesList.map((image) => {
								return (
									<ImageCard
										key={image.name}
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
