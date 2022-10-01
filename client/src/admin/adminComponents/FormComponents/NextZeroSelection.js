export default function NextZeroSelection(props) {
	const {onChange, choices, layer, headLine} = props;
	//console.log(layer);
	//console.log('your choices going to be..', choices);
	return (
		<div className="form-group">
			{' '}
			<label htmlFor={layer}>{headLine}</label>
			<select name={layer} id={layer} onChange={onChange}>
				<option key={'noValue'} value={null}>
					Vyberte možnosti
				</option>
				{choices.map((key) => {
					console.log(key);
					return (
						<option key={key} value={key}>
							{key.charAt(0).toUpperCase() + key.slice(1).replaceAll('_', ' ')}
						</option>
					);
				})}
			</select>
		</div>
	);
}
