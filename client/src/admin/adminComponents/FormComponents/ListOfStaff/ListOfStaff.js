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
	Box,
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

	const url =
		process.env.NODE_ENV === 'production'
			? `${process.env.REACT_APP_BACKEND_URL}/api/all/employees`
			: '/api/all/employees';

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
			const response = await axios.get(url);
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
		<Box sx={{maxWidth: '100%', maxHeight: '100vh', overflow: 'auto'}}>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={{fontWeight: 'bold'}}>Jméno</TableCell>
							<TableCell sx={{fontWeight: 'bold'}}>Příjmení</TableCell>
							<TableCell sx={{fontWeight: 'bold'}}>Akademický Titul</TableCell>
							<TableCell sx={{fontWeight: 'bold'}}>Email</TableCell>
							<TableCell sx={{fontWeight: 'bold'}}>Telefon</TableCell>
							<TableCell sx={{fontWeight: 'bold'}}>Pracovní pozice</TableCell>
							<TableCell sx={{fontWeight: 'bold'}}>
								Upravit zaměstnance
							</TableCell>
							<TableCell sx={{fontWeight: 'bold'}}>
								Smazat zaměstnance
							</TableCell>
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
										{'* ' + employee.funkce1}
										<br />
										{employee.funkce2 === 'N/A'
											? '* ..'
											: '* ' + employee.funkce2}
										<br />
										{employee.funkce3 === 'N/A'
											? '* ....'
											: '* ' + employee.funkce4}
										<br />
										{employee.funkce4 === 'N/A'
											? '* ......'
											: '* ' + employee.funkce4}
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
		</Box>
	);
}
