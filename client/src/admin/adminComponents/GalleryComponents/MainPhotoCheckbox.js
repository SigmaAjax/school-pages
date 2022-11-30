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
			checked={imgValue.introductionary}
			type="checkbox"
			onChange={(e) => {
				console.log(true === imgValue.introductionary);
				checkboxed((current) => {
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
