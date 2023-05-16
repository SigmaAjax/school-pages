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
		<Card sx={{maxWidth: 400}}>
			<CardContent>
				<Typography variant="h6">{title}</Typography>
				<Box
					sx={{display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400}}
				>
					{fields.map((field) => (
						<TextField
							key={field.name}
							name={field.name}
							label={field.label}
							required={field.required}
							value={
								field?.name === 'phone'
									? values[field?.name].replace(
											/(\d{3})(\d{3})(\d{3})?/,
											(match, p1, p2, p3) =>
												p3 ? `${p1} ${p2} ${p3}` : p2 ? `${p1} ${p2}` : p1
									  )
									: values[field?.name]
							}
							onChange={onChange}
							inputProps={{maxLength: field.name === 'phone' ? 11 : undefined}}
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
										? 'Prosím zadejte platný formát telefonního čísla, bez předvolby +420'
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
