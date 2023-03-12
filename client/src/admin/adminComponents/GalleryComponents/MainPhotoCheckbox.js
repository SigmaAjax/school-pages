export default function MainPhotoCheckbox({
	imgValue,
	checkboxed,
	intro = false,
}) {
	return (
		<input
			key={imgValue.name}
			name={imgValue.name + '-checkbox'}
			disabled={false === !intro}
			checked={imgValue.introductionary}
			type="checkbox"
			onChange={(e) => {
				checkboxed((current) => {
					console.log(current);
					const checkedItem = current.map((item) => {
						if (item.name + '-checkbox' === e.target.name) {
							console.log(item.name + '-checkbox');
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
