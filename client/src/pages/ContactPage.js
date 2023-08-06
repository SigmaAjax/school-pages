import {Container} from '@mui/material';
import ContactForm from '../components/ui/Contacts/ContatctForm';
import {useEffect, useState} from 'react';
import axios from 'axios';
import ContactsSection from '../components/ui/Contacts/ContactsSection';

const possibleEmployees = {
	vedení: ['ředitel', 'zástupce_ředitele', 'gdpr'],
	sbor: ['učitel', 'třídní_učitel', 'asistent'],
	provozní_zaměstnanci: ['školník', 'účetní'],

	školní_poradenské_pracoviště: [
		'školní_logoped',
		'specialní_výchovný_poradce',
		'metodik_prevence',
	],
};

export default function ContactPage() {
	const [categorizedEmployees, setCategorizedEmployees] = useState([]);

	const url =
		process.env.NODE_ENV === 'production'
			? `${process.env.REACT_APP_BACKEND_URL}/api/all/employees`
			: 'api/all/employees';

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const response = await axios.get(url);
				const fetchedEmployees = response.data.data;

				// Initialize the categories
				const newCategorizedEmployees = [
					{name: 'vedení', employees: []},
					{name: 'sbor', employees: []},
					{name: 'provozní_zaměstnanci', employees: []},
					{name: 'školní_poradenské_pracoviště', employees: []},
				];

				for (let emp of fetchedEmployees) {
					for (let i = 1; i <= 4; i++) {
						const role = emp[`funkce${i}`];

						if (role && role !== 'N/A') {
							let category;

							// Using switch statement to determine category
							switch (role) {
								case 'ředitel':
								case 'zástupce_ředitele':
								case 'gdpr':
									category = 'vedení';
									break;
								case 'učitel':
								case 'třídní_učitel':
								case 'asistent':
									category = 'sbor';
									break;
								case 'školník':
								case 'účetní':
									category = 'provozní_zaměstnanci';
									break;
								case 'školní_logoped':
								case 'specialní_výchovný_poradce':
								case 'metodik_prevence':
									category = 'školní_poradenské_pracoviště';
									break;
								default:
									category = null;
									break;
							}

							if (category) {
								// Find the right category in the array
								const categoryObj = newCategorizedEmployees.find(
									(cat) => cat.name === category
								);

								// Check if the employee is not already added
								if (
									!categoryObj.employees.some(
										(e) => e.employee_id === emp.employee_id
									)
								) {
									categoryObj.employees.push(emp);
								}
							}
						}
					}
				}

				const filteredJobOccupations = newCategorizedEmployees.map(
					(category) => {
						if (possibleEmployees[category.name]) {
							const possiblePositions = possibleEmployees[category.name];

							// Get the modified list of employees for the category
							const modifiedEmployees = category.employees.map((employee) => {
								let matchedPositions = [];

								for (let i = 1; i <= 4; i++) {
									const role = employee[`funkce${i}`];

									// if role matches any string from possiblePositions
									if (role && possiblePositions.includes(role)) {
										matchedPositions.push(role);
									}
								}

								// Return the modified employee object
								if (matchedPositions.length) {
									return {...employee, prac_pozice: matchedPositions};
								} else {
									return employee; // Return the original employee if no matches
								}
							});

							return {name: category.name, employees: modifiedEmployees};
						} else {
							return category; // Return the original category if it doesn't match with possibleEmployees
						}
					}
				);

				console.table(filteredJobOccupations);

				setCategorizedEmployees(filteredJobOccupations);
			} catch (error) {
				console.error('Error fetching employees:', error);
			}
		};

		fetchEmployees();
	}, []);

	return (
		<Container
			maxWidth="xl"
			sx={{
				marginTop: '100px',
				displayFlex: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'white',
				marginLeft: 0,
			}}
		>
			{categorizedEmployees.length > 0 &&
				categorizedEmployees.map((category) => {
					return <ContactsSection categoryValues={category} />;
				})}

			<ContactForm />
		</Container>
	);
}
