import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ContactInfoForm from '../ContactInfoForm';
import StaffPositionEasy from '../StaffPositionEasy';
import {Box, Button} from '@mui/material';
import {Loader} from '../../../../Loader';
import {useAdminUpdate} from '../../../../context/AdminContext';

const processFormValues = (formValues, inputFields) => {
	return Object.entries(formValues).reduce((processedValues, [key, value]) => {
		// Check if key starts with 'funkce' and remove it if its index is greater than inputFields
		const poziceMatch = key.match(/^funkce(\d+)/);
		if (poziceMatch && parseInt(poziceMatch[1], 10) > inputFields) {
			return processedValues; // Skip adding this key to the processedValues
		}

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

export default function StaffDetail() {
	const {setIsOpenModal, setEmployee, setButtonName} = useAdminUpdate();
	const [emailError, setEmailError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [inputFields, setInputFields] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [detailEmployee, setDetailEmployee] = useState({});
	const {id} = useParams();
	const navigate = useNavigate(); /// change for useLocation to avoid needless useEffect re-renders

	const url =
		process.env.NODE_ENV === 'production'
			? `${process.env.REACT_APP_BACKEND_URL}/api/employee/get/`
			: '/api/employee/get/';

	const handleAddInputField = () => {
		if (inputFields < 4) {
			setInputFields((prev) => prev + 1);
		}
	};

	const handleRemoveInputField = () => {
		if (inputFields > 1) {
			setInputFields((prev) => prev - 1);
			setDetailEmployee((prevValues) => {
				const {[`funkce${inputFields}`]: value, ...rest} = prevValues;
				return rest;
			});
		}
	};

	const handleBack = () => {
		navigate('/admin/zamestnanci');
	};

	function isValidEmail(email) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	}

	function isValidPhoneNumber(phoneNumber) {
		const phoneNumberRegex = /^((\+420|0)\d{2}|(\+420 )?\d{3}) ?\d{3} ?\d{3}$/;
		return phoneNumberRegex.test(phoneNumber);
	}

	const handleChange = (event) => {
		const {name, value} = event.target;
		setDetailEmployee((prevValues) => ({...prevValues, [name]: value}));
	};

	const handleModal = (e) => {
		const isEmailValid = isValidEmail(detailEmployee.email);
		const isPhoneValid = isValidPhoneNumber(detailEmployee.phone);

		setEmailError(!isEmailValid);
		setPhoneError(!isPhoneValid);

		setButtonName(() => {
			return e.target.name;
		});

		const processedValues = processFormValues(detailEmployee, inputFields);
		if (isEmailValid && isPhoneValid) {
			setIsOpenModal((prev) => !prev);
			const employee = processedValues;
			if (e.target.name !== 'button-delete') {
				setEmployee(employee);
			}
			setEmployee({...employee, page: 'detail-page'});
		}
	};

	useEffect(() => {
		fetchEmployeeDetail();
	}, []);

	const fetchEmployeeDetail = async () => {
		setLoading((prev) => !prev);
		try {
			const response = await axios.get(`${url}${id}`);
			console.log(response.status);
			console.log(response.data.employee);

			const data = await response.data.employee;

			//Count the number of valid 'funkce' fields
			let validFunkceCount = 0;
			for (let i = 1; i <= 4; i++) {
				const lookUpData = data[0];

				if (lookUpData[`funkce${i}`] !== 'N/A') {
					validFunkceCount++;
				}
			}
			// Set inputFields to the count of valid 'funkce' fields
			setInputFields(validFunkceCount);

			setTimeout(() => {
				setDetailEmployee(...data);
			}, 2000);
			setLoading((prev) => !prev);
		} catch (error) {
			console.error("Error fetching employee's details:", error);
			setError(error);

			// Add a 2-second delay
			setTimeout(() => {
				setLoading((prev) => !prev);
			}, 2000);
		}
	};

	if (!detailEmployee.name || !detailEmployee.surname || loading) {
		return <Loader />;
	}

	if (error) {
		return (
			<div>
				<p>Nepodařilo se načíst zaměstnance</p>
				<p>
					Error code: {error.code} - {error.message}
				</p>
			</div>
		);
	}

	return (
		<form>
			<Box mb={2}>
				<ContactInfoForm
					title="Změna základních údajů zaměstnance"
					fields={[
						{name: 'name', label: 'Jméno', required: true},
						{name: 'surname', label: 'Příjmení', required: true},
						{name: 'academic_title', label: 'Akademický titul'},
					]}
					values={detailEmployee}
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
					values={detailEmployee}
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
					initialValues={detailEmployee}
				/>
			</Box>
			<Box
				sx={{
					marginTop: 2,
					display: 'flex',
					gap: 2,
					justifyContent: 'space-between',
				}}
			>
				<Box sx={{display: 'flex', gap: 2}}>
					<Button
						name="employee-delete"
						onClick={handleModal}
						type="button"
						variant="contained"
						sx={{
							backgroundColor: 'red',
							':hover': {backgroundColor: 'darkred'},
						}}
					>
						Vymazat
					</Button>
					<Button
						name="employee-update"
						onClick={handleModal}
						type="button"
						variant="contained"
					>
						Změnit
					</Button>
				</Box>
				<Button
					name="employee-back"
					onClick={handleBack}
					type="button"
					variant="contained"
				>
					Zpět
				</Button>
			</Box>
		</form>
	);
}
