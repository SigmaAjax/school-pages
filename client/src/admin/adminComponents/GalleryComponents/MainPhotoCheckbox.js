export default function MainPhotoCheckbox({imgValue, checkboxed}) {
	return (
		<input
			name={imgValue.name + '-checkbox'}
			disabled={false}
			type="checkbox"
			onChange={(e) => {
				checkboxed((current) => {
					current.map((item) => {
						if (item.name + '-checkbox' === e.target.name) {
							console.table({...item, introductionary: !item.introductionary});
							return {...item, introductionary: !item.introductionary};
						}
						return item;
					});
				});
			}}
		/>
	);
}
