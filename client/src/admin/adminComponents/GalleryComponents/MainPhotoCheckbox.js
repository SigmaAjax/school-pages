export default function MainPhotoCheckbox({
	imgValue,
	checkboxed,
	intro = false,
}) {
	console.log(intro);
	return (
		<input
			name={imgValue.name + '-checkbox'}
			disabled={false === !intro}
			type="checkbox"
			onChange={(e) => {
				console.log(true === imgValue.introductionary);
				checkboxed((current) => {
					// current.map((image) => {
					// 	if (Object.keys(image).some((key) => key === true)) {
					// 		console.log(image.name + ' is already checked');
					// 		return;
					// 	} else {
					// 		console.log('there is not any checked boxes');
					// 		return;
					// 	}
					// });

					const checkedItem = current.map((item) => {
						if (item.name + '-checkbox' === e.target.name) {
							return {...item, introductionary: !item.introductionary};
						}
						return item;
					});

					return checkedItem;
				});
			}}
		/>
	);
}
