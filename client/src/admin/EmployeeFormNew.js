import React, {useState} from 'react';
import {Button, Box} from '@mui/material';
import ContactInfoForm from './adminComponents/FormComponents/ContactInfoForm';
import StaffPositionEasy from './adminComponents/FormComponents/StaffPositionEasy';
import axios from 'axios';
import StaffCheckboxes from './adminComponents/FormComponents/StaffCheckboxes';

const processFormValues = (formValues, inputFields) => {
	return Object.entries(formValues).reduce((processedValues, [key, value]) => {
		// Check if key starts with 'pozice' and remove it if its index is greater than inputFields
		const poziceMatch = key.match(/^pozice(\d+)/);
		if (poziceMatch && parseInt(poziceMatch[1], 10) > inputFields) {
			return processedValues; // Skip adding this key to the processedValues
		} /// probably this code is not needed anymore

		if (key === 'phone') {
			if (value.startsWith('+')) {
				value = value.slice(1);
			}
			value = value.replace(/\s/g, ''); // Remove spaces from the phone number
		}

		processedValues[key] = value;
		return processedValues;
	}, {});
};

export default function EmployeeFormNew() {
	const [emailError, setEmailError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [inputFields, setInputFields] = useState(1);
	//const [checkboxes, setCheckboxes] = useState({}); /// for checkboxes

	const handleAddInputField = () => {
		if (inputFields < 4) {
			setInputFields((prev) => prev + 1);
		}
	};

	const handleRemoveInputField = () => {
		if (inputFields > 1) {
			setInputFields((prev) => prev - 1);
		}
	};

	const url =
		process.env.NODE_ENV === 'production'
			? `${process.env.REACT_APP_BACKEND_URL}/api/add/employee`
			: '/api/add/employee';

	// const handleCheckboxes = (parentLabel, childLabel, checked) => {
	// 	setCheckboxes((prev) => ({
	// 		...prev,
	// 		[childLabel]: parentLabel,
	// 	}));
	// };

	function isValidEmail(email) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	}

	function isValidPhoneNumber(phoneNumber) {
		const phoneNumberRegex = /^((\+420|0)\d{2}|(\+420 )?\d{3}) ?\d{3} ?\d{3}$/;
		return phoneNumberRegex.test(phoneNumber);
	}

	const [formValues, setFormValues] = useState({
		name: '',
		surname: '',
		academicTitle: '',
		email: '',
		phone: '',
	});

	const handleChange = (event) => {
		const {name, value} = event.target;

		setFormValues((prevValues) => ({...prevValues, [name]: value}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const isEmailValid = isValidEmail(formValues.email);
		const isPhoneValid = isValidPhoneNumber(formValues.phone);

		setEmailError(!isEmailValid);
		setPhoneError(!isPhoneValid);

		const processedValues = processFormValues(formValues, inputFields);

		if (isEmailValid && isPhoneValid) {
			try {
				const response = await axios.post(url, processedValues);
				console.log(response.data);
				alert(response.status, response.message);
			} catch (error) {
				console.error(error);
				alert(`${error.message}\n${error.response.data.message}`);
			}
		}
	};

	// const handleSubmit = async (event) => {
	// 	event.preventDefault();

	// 	console.log(formValues);
	// 	const isEmailValid = isValidEmail(formValues.email);
	// 	const isPhoneValid = isValidPhoneNumber(formValues.phone);

	// 	setEmailError(!isEmailValid);
	// 	setPhoneError(!isPhoneValid);

	// 	const processedValues = processFormValues(formValues, inputFields);

	// 	if (isEmailValid && isPhoneValid) {
	// 		try {
	// 			const mergedValues = {...processedValues, ...checkboxes}; // merge formValues and checkboxes
	// 			const response = await axios.post(url, mergedValues); // post the mergedValues
	// 			console.log(response.data);
	// 			alert(response.status, response.message);
	// 		} catch (error) {
	// 			console.error(error);
	// 			alert(`${error.message}\n${error.response.data.message}`);
	// 		}
	// 	}
	// };

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Box mb={2}>
					<ContactInfoForm
						title="Základní údaje"
						fields={[
							{name: 'name', label: 'Jméno', required: true},
							{name: 'surname', label: 'Příjmení', required: true},
							{name: 'academicTitle', label: 'Akademický titul'},
						]}
						values={formValues}
						onChange={handleChange}
					/>
				</Box>
				<Box mb={2}>
					<ContactInfoForm
						title="Kontaktní údaje"
						fields={[
							{name: 'email', label: 'Email'},
							{name: 'phone', label: 'Telefon'},
						]}
						values={formValues}
						onChange={handleChange}
						emailError={emailError}
						phoneError={phoneError}
					/>
				</Box>
				<Box mv={2}>
					<StaffPositionEasy
						onChange={handleChange}
						inputFields={inputFields}
						handleAddInputField={handleAddInputField}
						handleRemoveInputField={handleRemoveInputField}
					/>
				</Box>
				{/* Checkboxes */}
				{/* <Box mv={2}>
					<StaffCheckboxes
						parentLabel="vedení"
						childLabels={['ředitel', 'zástupce_ředitele', 'gdpr']}
						checkboxValues={checkboxes['vedení'] || {}}
						onChange={handleCheckboxes}
					/>

					<StaffCheckboxes
						parentLabel="sbor"
						childLabels={['učitel', 'třídní_učitel', 'asistent']}
						checkboxValues={checkboxes['sbor'] || {}}
						onChange={handleCheckboxes}
					/>
					<StaffCheckboxes
						parentLabel="provozní_zaměstanci"
						childLabels={['školník', 'účetní']}
						checkboxValues={checkboxes['provozní_zaměstanci'] || {}}
						onChange={handleCheckboxes}
					/>
					<StaffCheckboxes
						parentLabel="školní_poradenské_pracoviště"
						childLabels={[
							'školní_logoped',
							'specialní_výchovný_poradce',
							'metodik_prevence',
						]}
						checkboxValues={checkboxes['školní_poradenské_pracoviště'] || {}}
						onChange={handleCheckboxes}
					/>
				</Box> */}
				<Box sx={{marginTop: 2}}>
					<Button type="submit" variant="contained">
						Submit
					</Button>
				</Box>
			</form>
		</>
	);
}
