import {AdvancedImage} from '@cloudinary/react';
import MainPhotoCheckbox from '../MainPhotoCheckbox';

export default function CloudinaryImageCard({image, setPhotos, intro = false}) {
	return (
		<>
			{' '}
			<AdvancedImage
				loading={'lazy'}
				width={100}
				height={100}
				key={image.public_id}
				cloudName={process.env.REACT_APP_CLOUD_NAME}
				publicId={image.public_id}
				src={image.secure_url}
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
