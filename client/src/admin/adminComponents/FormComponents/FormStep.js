import FormStepInput from './FormStepInput.js';

export default function FormStep({values, onChange, dataStep}) {
	const {headline, ...rest} = values;
	const leftValues = Object.values(rest);

	return (
		<div className={'card'} data-step={dataStep}>
			<h3 className="basic-info step-title">
				{headline.charAt(0).toUpperCase() + headline.slice(1)}
			</h3>
			{leftValues.map((key, index) => {
				if (key.name === 'titul') {
					return (
						<div key={key.headline} className="form-group">
							<label htmlFor={key.name} id={key.name}>
								{key.headline.charAt(0).toUpperCase() + key.headline.slice(1)}
							</label>
							<select key={key.name} name={key.name} onChange={onChange}>
								<option key={'noVal'} value={null}>
									Žádný
								</option>
								<option key="bc" value="bc.">
									Bc.
								</option>
								<option key={'mgr'} value="mgr.">
									Mgr.
								</option>
								<option key={'phdr'} value="phdr.">
									PhDr.
								</option>
							</select>
						</div>
					);
				} else if (key.pattern) {
					return (
						<FormStepInput
							required={true}
							key={key.name}
							pattern={key.pattern}
							values={key}
							onChange={onChange}
						/>
					);
				} else {
					return (
						<FormStepInput
							required={true}
							key={key.name}
							values={key}
							onChange={onChange}
						/>
					);
				}
			})}
		</div>
	);
}
