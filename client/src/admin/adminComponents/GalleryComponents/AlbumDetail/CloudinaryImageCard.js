import {AdvancedImage} from '@cloudinary/react';
import MainPhotoCheckbox from '../MainPhotoCheckbox';

export default function CloudinaryImageCard({image, setPhotos, intro = false}) {
	return (
		<>
			{' '}
			<img
				loading={'lazy'}
				width={100}
				height={100}
				key={image.public_id}
				// cloudname={process.env.REACT_APP_CLOUD_NAME}
				// publicid={image.public_id}
				src={image.data_url}
			/>
			<button
				key={image.name + '-button'}
				name={image.name}
				type="button"
				onClick={(e) => {
					setPhotos((prev) => {
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
				checkboxed={setPhotos}
				intro={intro}
			/>
		</>
	);
}
