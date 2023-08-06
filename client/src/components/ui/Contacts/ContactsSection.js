import {Divider, Grid, Typography} from '@mui/material';
import ContactCard from './ContactCard';
import useCap from '../../../Hooks/useCap';

export default function ContactsSection({categoryValues}) {
	const {capitalize} = useCap();
	const {name, employees} = categoryValues;
	return (
		<Grid container spacing={2} paddingTop={10} marginLeft={0}>
			<Grid item xs={12}>
				{' '}
				{/* This ensures the name takes up the full width */}
				<Typography variant="h4" gutterBottom>
					{capitalize(name)}
				</Typography>
			</Grid>
			{employees.map((emp) => (
				<Grid item key={emp.surname} xs={12} sm={6} md={4} lg={4}>
					<ContactCard
						name={emp.name}
						lastName={emp.surname}
						academic_title={emp.academic_title}
						email={emp.email}
						phone={emp.phone}
						prac_pozice={emp.prac_pozice}
					/>
				</Grid>
			))}
			{/* Wrap Divider in a Grid item */}
			<Grid item xs={12}>
				<Divider
					style={{margin: '20px 15%', borderBottom: '2px solid black'}}
				/>
			</Grid>
		</Grid>
	);
}
