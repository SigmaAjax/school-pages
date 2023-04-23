import React, {useState} from 'react';
import {
	Card,
	CardContent,
	Typography,
	Box,
	TextField,
	IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const renderInputFields = (numFields, onChange, placeholders) => {
	const fields = [];
	for (let i = 0; i < numFields; i++) {
		fields.push(
			<TextField
				key={i}
				name={`pozice${i + 1}`}
				label={`Pracovní pozice ${i + 1}`}
				variant="outlined"
				placeholder={placeholders[i]}
				fullWidth
				onChange={onChange}
			/>
		);
	}
	return fields;
};

export default function StaffPositionEasy({
	inputFields,
	handleAddInputField,
	handleRemoveInputField,
	onChange,
}) {
	const placeholders = [
		'ředitel, zástupce_ředitele, gdpr',
		'třídní_učitel, učitel, asistent',
		'učitelka_v_mateřské_školce, vychovatelka, školník, účetní',
		'metodik_prevence, specialní_výchovný_poradce, školní_logoped',
	];

	const humanReadablePlaceholders = () => {
		const newArr = placeholders.map((placeholder) => {
			const separatedStrings = placeholder.split(', ');
			const capitalizedStrings = separatedStrings.map((str) => {
				const strWithout_ = str.replace(/_/g, ' ');
				const capitalized =
					strWithout_.charAt(0).toLocaleUpperCase() + strWithout_.slice(1);
				return capitalized;
			});
			return capitalizedStrings.join(', ');
		});
		return newArr;
	};

	const humanReadable = humanReadablePlaceholders();

	return (
		<Card>
			<CardContent>
				<Typography variant="h6">Pracovní zařazení</Typography>
				<Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
					{renderInputFields(inputFields, onChange, humanReadable)}
					<IconButton
						color="primary"
						onClick={handleAddInputField}
						disabled={inputFields >= 4}
					>
						<AddCircleOutlineIcon />
					</IconButton>
					<IconButton
						color="secondary"
						onClick={handleRemoveInputField}
						disabled={inputFields <= 1}
					>
						<RemoveCircleOutlineIcon />
					</IconButton>
				</Box>
			</CardContent>
		</Card>
	);
}
