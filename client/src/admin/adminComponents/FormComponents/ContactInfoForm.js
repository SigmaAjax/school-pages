import React from 'react';
import {Card, CardContent, Typography, TextField, Box} from '@mui/material';

const ContactInfoForm = ({
	title,
	fields,
	values,
	onChange,
	emailError,
	phoneError,
}) => {
	return (
		<Card>
			<CardContent>
				<Typography variant="h6">{title}</Typography>
				<Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
					{fields.map((field) => (
						<TextField
							key={field.name}
							name={field.name}
							label={field.label}
							required={field.required}
							value={values[field.name]}
							onChange={onChange}
							error={
								field.name === 'email'
									? emailError
									: field.name === 'phone'
									? phoneError
									: false
							}
							helperText={
								field.name === 'email'
									? emailError
										? 'Zadejte prosím platný formát emailové adresy'
										: ''
									: field.name === 'phone'
									? phoneError
										? 'Prosím zadejte platný formát telefonního čísla'
										: ''
									: ''
							}
						/>
					))}
				</Box>
			</CardContent>
		</Card>
	);
};

export default ContactInfoForm;
