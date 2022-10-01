export default function FormStepInput(props) {
	const {values, onChange, pattern = null, required = false} = props;

	return (
		<div className="form-group">
			{' '}
			<label htmlFor={values.name}>
				{values.headline.charAt(0).toUpperCase() + values.headline.slice(1)}
			</label>
			<input
				key={values.name}
				required={required}
				onChange={onChange}
				type={values.type}
				name={values.name}
				pattern={pattern}
				id={values.name}
				placeholder={
					values.placeholder.charAt(0).toUpperCase() +
					values.placeholder.slice(1)
				}
			></input>
		</div>
	);
}
