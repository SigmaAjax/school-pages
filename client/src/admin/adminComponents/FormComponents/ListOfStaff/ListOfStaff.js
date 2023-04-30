import React, {useEffect, useState} from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import {Loader} from '../../../../Loader';
import {useAdmin, useAdminUpdate} from '../../../../context/AdminContext';
import {Link} from 'react-router-dom';

export default function ListOfStaff() {
	const {staff} = useAdmin();
	const {setIsOpenModal, setButtonName, setEmployee, setStaff} =
		useAdminUpdate();
	//const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleModal = (e) => {
		setIsOpenModal((prev) => !prev);
		setButtonName(e.currentTarget.name);
		const employee = staff.filter((employee) => {
			return employee.employee_id === parseInt(e.currentTarget.value);
		});
		setEmployee(...employee);
	};

	useEffect(() => {
		fetchEmployees();
	}, []);

	const fetchEmployees = async () => {
		try {
			setLoading((prev) => !prev);
			const response = await axios.get('/api/all/employees');
			const data = await response.data;

			setTimeout(() => {
				setStaff(data.data);
				setLoading((prev) => !prev);
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
						<TableCell>Upravit zaměstnance</TableCell>
						<TableCell>Smazat zaměstnance</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{staff.map((employee) => {
						return (
							<TableRow key={employee.employee_id}>
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
									{employee.funkce3 === 'N/A' ? '....' : employee.funkce4}
									<br />
									{employee.funkce4 === 'N/A' ? '......' : employee.funkce4}
								</TableCell>
								<TableCell>
									<Link
										to={`/admin/zamestnanci/zamestnanec/${employee.employee_id}`}
									>
										<IconButton
											name="employee-update"
											size="small"
											color="primary"
											aria-label="edit"
										>
											<EditIcon />
										</IconButton>
									</Link>
								</TableCell>
								<TableCell>
									<IconButton
										value={employee.employee_id}
										name="employee-delete"
										size="small"
										color="error"
										aria-label="delete"
										onClick={(e) => handleModal(e)}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
