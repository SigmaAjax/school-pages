import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useState} from 'react';

function IndeterminateCheckbox({parentLabel, childLabels}) {
	const childCheckStates = Object.fromEntries(
		childLabels.map((label) => [label, false])
	);

	const [checked, setChecked] = useState({
		parent: false,
		children: childCheckStates,
	});

	const handleChange = (event) => {
		if (event.target.name === parentLabel) {
			setChecked({
				parent: event.target.checked,
				children: childCheckStates,
			});
		} else {
			setChecked((prevState) => ({
				parent: prevState.parent,
				children: {
					...childCheckStates,
					[event.target.name]: event.target.checked,
				},
			}));
		}
	};

	const children = (
		<Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
			{childLabels.map((label) => (
				<FormControlLabel
					key={label}
					label={label}
					control={
						<Checkbox
							checked={checked.children[label]}
							onChange={handleChange}
							name={label}
							disabled={!checked.parent}
						/>
					}
				/>
			))}
		</Box>
	);

	return (
		<div>
			<FormControlLabel
				label={parentLabel}
				control={
					<Checkbox
						checked={checked.parent}
						onChange={handleChange}
						name={parentLabel}
					/>
				}
			/>
			{children}
		</div>
	);
}

function StaffCheckboxes({parentLabel, childLabels}) {
	return (
		<Card sx={{maxWidth: 400, mt: 2}}>
			<CardContent>
				<Typography variant="h6">{'Pracovní zařezení'}</Typography>
				<IndeterminateCheckbox
					parentLabel={parentLabel}
					childLabels={childLabels}
				/>
			</CardContent>
		</Card>
	);
}

export default StaffCheckboxes;
