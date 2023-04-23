import React, {useEffect, useState} from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import axios from 'axios';
import {Loader} from '../../../../Loader';

const decodeEmployee = (employee) => {
	return Object.keys(employee).reduce((decodedEmployee, key) => {
		const shouldDecode =
			key === 'name' || key === 'surname' || key.startsWith('funkce');
		const decodedKey = shouldDecode ? decodeURIComponent(key) : key;
		decodedEmployee[decodedKey] = shouldDecode
			? decodeURIComponent(employee[key])
			: employee[key];
		return decodedEmployee;
	}, {});
};

export default function ListOfStaff() {
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchEmployees();
	}, []);

	const fetchEmployees = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/all/employees');
			const data = await response.data;
			console.log(data.data);

			const decodedEmployees = data.data.map((employee) => {
				console.log(employee);
				return decodeEmployee(employee);
			});

			// Add a 2-second delay
			setTimeout(() => {
				setEmployees(decodedEmployees);
				setLoading(false);
			}, 2000);
		} catch (error) {
			console.error('Error fetching employees:', error);
			setError(error);

			// Add a 2-second delay
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	};

	if (loading) {
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
		<TableContainer component={Paper} sx={{maxWidth: '100%'}}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Jméno</TableCell>
						<TableCell>Příjmení</TableCell>
						<TableCell>Akademický Titul</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Telefon</TableCell>
						<TableCell>Pracovní pozice</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{employees.map((employee) => (
						<TableRow key={employee.name}>
							<TableCell>{employee.name}</TableCell>
							<TableCell>{employee.surname}</TableCell>
							<TableCell>{employee.academic_title}</TableCell>
							<TableCell>{employee.email}</TableCell>
							<TableCell>{employee.phone}</TableCell>
							<TableCell>
								{employee.funkce1}
								<br />
								{employee.funkce2 === 'N/A' ? '..' : employee.funkce2}
								<br />
								{employee.funkce3 === 'N/A' ? '...' : employee.funkce4}
								<br />
								{employee.funkce4 === 'N/A' ? '....' : employee.funkce4}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
