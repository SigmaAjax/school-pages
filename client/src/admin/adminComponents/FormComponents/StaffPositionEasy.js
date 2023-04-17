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

const renderInputFields = (numFields, onChange) => {
	const fields = [];
	for (let i = 0; i < numFields; i++) {
		fields.push(
			<TextField
				key={i}
				label={`Pracovní zařazení ${i + 1}`}
				variant="outlined"
				fullWidth
				onChange={onChange}
			/>
		);
	}
	return fields;
};

export default function StaffPositionEasy({onChange}) {
	const [inputFields, setInputFields] = useState(1);

	const handleAddInputField = () => {
		if (inputFields < 4) {
			setInputFields((prev) => prev + 1);
		}
	};

	return (
		<Card>
			<CardContent>
				<Typography variant="h6">Title</Typography>
				<Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
					{renderInputFields(inputFields, onChange)}
					<IconButton
						color="primary"
						onClick={handleAddInputField}
						disabled={inputFields >= 4}
					>
						<AddCircleOutlineIcon />
					</IconButton>
				</Box>
			</CardContent>
		</Card>
	);
}
