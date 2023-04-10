import React, {useState} from 'react';
import {Button, Box} from '@mui/material';
import {useAdmin, useAdminUpdate} from '../context/AdminContext';
import ContactInfoForm from './adminComponents/FormComponents/ContactInfoForm';
import StaffPositionEasy from './adminComponents/FormComponents/StaffPositionEasy';
import axios from 'axios';

export default function EmployeeFormNew() {
	const {employee} = useAdmin();
	const {setEmployee} = useAdminUpdate();
	const [emailError, setEmailError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);

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
		funkce1: '',
		funkce2: '',
		funkce3: '',
		funkce4: '',
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

		if (isEmailValid && isPhoneValid) {
			setEmployee(formValues);
			try {
				const response = await axios.post('/api/add/employees', formValues);
				console.log(response.data);
				alert(response.status);
			} catch (error) {
				console.error(error);
				alert(error.message);
			}
		}
	};

	// const handleStaffPositionChange = (name, value) => {
	// 	setFormValues((prevValues) => ({...prevValues, [name]: value}));
	// };

	return (
		<>
			<form onSubmit={handleSubmit}>
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
				<StaffPositionEasy onChange={handleChange} />
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
