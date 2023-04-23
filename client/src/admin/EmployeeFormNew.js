import React, {useState} from 'react';
import {Button, Box} from '@mui/material';
//import {useAdmin, useAdminUpdate} from '../context/AdminContext';
import ContactInfoForm from './adminComponents/FormComponents/ContactInfoForm';
import StaffPositionEasy from './adminComponents/FormComponents/StaffPositionEasy';
import axios from 'axios';

const encodeFormValues = (formValues, inputFields) => {
	return Object.entries(formValues).reduce((encodedValues, [key, value]) => {
		// Check if key starts with 'pozice' and remove it if its index is greater than inputFields
		const poziceMatch = key.match(/^pozice(\d+)/);
		if (poziceMatch && parseInt(poziceMatch[1], 10) > inputFields) {
			return encodedValues; // Skip adding this key to the encodedValues
		}

		if (key.startsWith('pozice') || key === 'name' || key === 'surname') {
			value = encodeURIComponent(value);
		}

		if (key === 'phone') {
			if (value.startsWith('+')) {
				value = value.slice(1);
			}
			value = value.replace(/\s/g, ''); // Remove spaces from the phone number
		}

		encodedValues[key] = value;
		return encodedValues;
	}, {});
};

export default function EmployeeFormNew() {
	// const {employee} = useAdmin();
	// const {setEmployee} = useAdminUpdate();
	const [emailError, setEmailError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [inputFields, setInputFields] = useState(1);

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

		const encodedValues = encodeFormValues(formValues, inputFields);

		if (isEmailValid && isPhoneValid) {
			try {
				const response = await axios.post('/api/add/employee', encodedValues);
				console.log(response.data);
				alert(response.status, response.message);
			} catch (error) {
				console.error(error);
				alert(`${error.message}\n${error.response.data.message}`);
			}
		}
	};

	// const handleStaffPositionChange = (name, value) => {
	// 	setFormValues((prevValues) => ({...prevValues, [name]: value}));
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
				<Box mb={2}>
					<StaffPositionEasy
						onChange={handleChange}
						inputFields={inputFields}
						handleAddInputField={handleAddInputField}
						handleRemoveInputField={handleRemoveInputField}
					/>
				</Box>
				{/* Additional form steps will go here */}

				<Box sx={{marginTop: 2}}>
					<Button type="submit" variant="contained">
						Submit
					</Button>
				</Box>
			</form>
		</>
	);
}
