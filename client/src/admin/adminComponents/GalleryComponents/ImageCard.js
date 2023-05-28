import MainPhotoCheckbox from './MainPhotoCheckbox';
import styles from '../../../pages/admin.module.css';
import gallery from './gallery.module.css';

export default function ImageCard({image, setImages, intro = false}) {
	return (
		<div className={gallery['image-card-container']}>
			<button
				className={gallery['delete-button']}
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

			<img
				className={styles['selected-images']}
				key={image.name}
				src={image.url}
				alt="Vybraná fotografie"
			/>

			<div className={gallery['checkbox-container']}>
				<MainPhotoCheckbox
					imgValue={image}
					checkboxed={setImages}
					intro={intro}
				/>
				<label
					className={gallery['label-small']}
					htmlFor={image.name + '-checkbox'}
				>
					Úvodní fotografie
				</label>
			</div>
		</div>
	);
}
