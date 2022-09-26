import {useState, useEffect} from 'react';
import NextZeroSelection from './adminComponents/NextZeroSelection.js';
import FormStep from './adminComponents/FormStep.js';
import {staffTree} from '../staffTree.js';

let timer;

export default function EmployeeForm() {
	const [staff, setStaff] = useState({});
	const [disabledPass, setDisabledPass] = useState(true); /// enable the pass

	const [sbor, vedeni] = staffTree;
	const vedeniSub = vedeni.vedení;
	const sborSub = [
		...Object.keys(sbor.sbor[0]),
		...Object.keys(sbor.sbor[1]),
		...Object.keys(sbor.sbor[2]),
	];
	const asistentiSub = [
		...Object.keys(sbor.sbor[2].asistenti[0]),
		...Object.keys(sbor.sbor[2].asistenti[1]),
	];
	const ucitelSub = sbor.sbor[0].učitel;
	const provozniSub = [
		...Object.values(sbor.sbor[2].asistenti[0].provozní_zaměstanci),
	];
	const poradenskySub = [
		...Object.values(sbor.sbor[2].asistenti[1].školní_poradenské_pracoviště),
	];

	const basicInfo = {
		headline: 'základní údaje',
		academiTitle: {
			headline: 'titul',
			name: 'titul',
			type: 'text',
			placeholder: 'akademický titul',
		},
		firstName: {
			headline: 'jméno',
			name: 'name',
			type: 'text',
			placeholder: 'křestní jméno',
		},
		lastName: {
			headline: 'příjmení',
			name: 'surname',
			type: 'text',
			placeholder: 'příjmení',
		},
	};

	const emailPhone = {
		headline: 'kontatktní údaje',
		email: {
			headline: 'email',
			name: 'email',
			type: 'email',
			placeholder: 'email@škola.cz',
			pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
		},
		phone: {
			headline: 'telefon',
			name: 'phone',
			type: 'text',
			placeholder: 'telefonní číslo',
			pattern: '[0-9]*',
		},
	};

	const checkFormChoice = () => {
		// Check Branch vedení
		if (staff.layer1 === 'vedení' && staff?.layer2) {
			// Main loop
			const checkItem = staff.layer2;
			const permittedStaff = vedeniSub;
			// Check if any vedení has right subcategory
			if (permittedStaff.includes(checkItem) === false) {
				// Sub loop

				setStaff((currentStaff) => {
					const {layer2, layer3, lastLayer, ...rest} = currentStaff;

					return rest;
				});
			}
		}
		if (staff.layer1 === 'sbor' && staff?.layer2) {
			// main loop
			const checkItem = staff.layer2;
			const permittedStaff = sborSub;

			if (permittedStaff.includes(checkItem) === false) {
				// sub loop
				console.log('Sbor subcategory must be učitel, třídní or asistent');
				setStaff((currentStaff) => {
					const {layer2, layer3, lastLayer, ...rest} = currentStaff;
					return rest;
				});
			} else {
				// sub loop

				console.log('Sbor sbucategory is just fine..');
			}
		}
		if (staff.layer2 === 'třídní_učitel' && staff?.layer3) {
			console.log('Category třídní učitel exist and has a subcategory');
			setStaff((currentStaff) => {
				const {layer3, lastLayer, ...rest} = currentStaff;

				return rest;
			});
		}
		if (staff.layer2 === 'učitel' && staff?.layer3) {
			/// Main loop
			// Check for učitel and his subcatecory

			const checkItem = staff.layer3;
			const permittedStaff = ucitelSub;

			////
			if (permittedStaff.includes(checkItem) === false) {
				// sub loop
				console.log('Učitel musí mít podkategorii vychovatelku nebo mateřskou');
				setStaff((currentStaff) => {
					const {layer3, lastLayer, ...rest} = currentStaff;
					return rest;
				});
			} else {
				// sub loop
				console.log('Here is also everything is fine');
			}
		}
		if (staff.layer2 === 'asistenti' && staff?.layer3) {
			// Main loop
			/// Checking if selection asistenti is in correct
			const checkItem = staff.layer3;
			const permittedStaff = asistentiSub;

			if (permittedStaff.includes(checkItem) === false) {
				console.log('Asistent must have Provozní or Poradenské as subCategory');
				setStaff((currentStaff) => {
					const {layer3, lastLayer, ...rest} = currentStaff;

					return rest;
				});
			} else {
				console.log('Asistance subcategory is alright');
			}
		}
		if (staff.layer3 === 'provozní_zaměstanci' && staff?.lastLayer) {
			// Main loop
			// checking if prvozniSub is correct... školník, účetní
			const checkItem = staff.lastLayer;
			const permittedStaff = provozniSub;
			console.log(checkItem);
			console.log(
				`Your check item ${checkItem} vs your control array`,
				permittedStaff
			);
			if (permittedStaff.includes(checkItem) === false) {
				// sub loop
				console.log('Provozní must have školník or účetní as subCategory');
				setStaff((currentStaff) => {
					const {lastLayer, ...rest} = currentStaff;

					return rest;
				});
			} else {
				// sub loop
				console.log('Provozní is alright...');
			}
		}
		if (staff.layer3 === 'školní_poradenské_pracoviště' && staff?.lastLayer) {
			// main loop
			const checkItem = staff.lastLayer;
			const permittedStaff = poradenskySub;
			console.log(checkItem);
			console.log(
				`Your check item ${checkItem} vs your control array`,
				permittedStaff
			);
			if (permittedStaff.includes(checkItem) === false) {
				console.log(
					'Poradenský must have logoped, metodik or vychovny or as subCategory'
				);
				setStaff((currentStaff) => {
					const {lastLayer, ...rest} = currentStaff;

					return rest;
				});
			} else {
				console.log('Poradenský is alright...');
			}
		}
	};
	const givePass = () => {
		//console.log("Give pass func")
		if (vedeniSub.includes(staff.layer2)) {
			setDisabledPass(false);
		} else if (
			sborSub.includes(staff.layer2) &&
			staff.layer2 === 'třídní_učitel'
		) {
			setDisabledPass(false);
		} else if (ucitelSub.includes(staff?.layer3)) {
			setDisabledPass(false);
		} else if (
			provozniSub.includes(staff?.lastLayer) ||
			poradenskySub.includes(staff?.lastLayer)
		) {
			setDisabledPass(false);
		} else {
			setDisabledPass(true);
		}
	};

	useEffect(() => {
		timer = setTimeout(() => {
			checkFormChoice();
			givePass();
		}, 350);
		return () => {
			clearTimeout(timer);
		};
	}, [staff]);

	function handleChange(event) {
		//event.preventDefault();
		////
		const key = event.target.name;
		const value = event.target.value;
		const specialKey = event.target.selectedIndex;
		if (specialKey === 0 && key === 'layer1') {
			console.log('*******');
			setStaff({});
			//if layer1 vyberte možnosti nebo ignore this selection
		} else if (specialKey === 0) {
			console.log('^^^^^^^^');
			setStaff((values) => {
				const {[key]: value, lastLayer, ...rest} = values;
				return rest;
			});
		} else {
			setStaff((values) => ({...values, [key]: value}));
		}

		console.log('current staff is .... ', staff);
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log('The staff is now...', staff);
	}

	return (
		<div>
			<form data-multi-step onSubmit={handleSubmit}>
				{
					<FormStep
						key={basicInfo.headline}
						values={basicInfo}
						onChange={handleChange}
						dataStep={'1'}
					/>
				}

				<FormStep
					key={emailPhone.headline}
					values={emailPhone}
					onChange={handleChange}
					dataStep={'2'}
				/>

				<div className="card" data-step="3">
					<h3 className="basic-info">Pracovní zařazení</h3>
					{/* First selection*/}
					<NextZeroSelection
						headLine="Vedení nebo Učitelský sbor"
						onChange={handleChange}
						choices={[...Object.keys(vedeni), ...Object.keys(sbor)]}
						layer={'layer1'}
					/>
					{/* Second selection*/}
					{staff.layer1 === 'sbor' && (
						<NextZeroSelection
							headLine="Učitel, Třídní nebo Asistent"
							onChange={handleChange}
							layer={'layer2'}
							choices={sborSub}
						/>
					)}
					{staff.layer1 === 'vedení' && (
						<NextZeroSelection
							headLine="Ředitel, Zástupce ředitele, GDPR"
							onChange={handleChange}
							layer={'layer2'}
							choices={vedeniSub}
						/>
					)}
					{/* Third selection*/}
					{staff.layer1 === 'sbor' && staff.layer2 === 'učitel' && (
						<NextZeroSelection
							headLine="Vychovatelka, Učitelka v mateřské školce"
							onChange={handleChange}
							layer={'layer3'}
							choices={ucitelSub}
						/>
					)}
					{/*staff.layer2 === 'třídní učitel' && (
            <NextZeroSelection headLine="Třídní učitel"
             onChange={handleChange} 
             layer={'layer3'}
              choices={...Object.keys(sbor.sbor[1])}
              />
          )*/}
					{staff.layer1 === 'sbor' && staff.layer2 === 'asistenti' && (
						<NextZeroSelection
							headLine="Provozní zaměstanci nebo Pracovníci školního poradenské pracoviště"
							onChange={handleChange}
							layer={'layer3'}
							choices={asistentiSub}
						/>
					)}
					{/* Forth selection*/}
					{staff.layer2 === 'asistenti' &&
						staff.layer3 === 'provozní_zaměstanci' && (
							<NextZeroSelection
								headLine="Školník, Účetní"
								onChange={handleChange}
								layer={'lastLayer'}
								choices={provozniSub}
							/>
						)}
					{staff.layer3 === 'školní_poradenské_pracoviště' &&
						staff.layer2 === 'asistenti' && (
							<NextZeroSelection
								headLine="Školní logoped, Specialní výchovný poradce, Metodik prevence"
								onChange={handleChange}
								layer={'lastLayer'}
								choices={poradenskySub}
							/>
						)}
				</div>

				<button disabled={disabledPass} type="submit">
					{' '}
					Submit{' '}
				</button>
			</form>
		</div>
	);
}
