import MainPhotoCheckbox from './MainPhotoCheckbox';

export default function ImageCard({image, setImages, intro = false}) {
	return (
		<>
			{' '}
			<img
				className="selected-images"
				key={image.name}
				src={image.url}
				alt="Vybraná fotografie"
			/>
			<button
				key={image.name + '-button'}
				name={image.name}
				type="button"
				onClick={(e) => {
					setImages((prev) => {
						const imagesAfterDelete = prev.filter((picture) => {
							return picture.name !== e.target.name;
						});
						return imagesAfterDelete;
					});
				}}
			>
				X
			</button>
			<MainPhotoCheckbox
				imgValue={image}
				checkboxed={setImages}
				intro={intro}
			/>
		</>
	);
}
