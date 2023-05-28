import ImageCard from './ImageCard';

import styles from '../../../pages/admin.module.css';

export default function ImageCardsList({imagesList, setImages, checkedBox}) {
	//const {checkedBox} = rest;
	//console.log(imagesList);
	return (
		<>
			{imagesList.length > 0 ? (
				<div>
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
