import React from 'react';
import {
	Box,
	Card,
	CardContent,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import useCap from '../../../Hooks/useCap';

const renderOptions = (options, capitalize) => {
	return options.map((option) => (
		<MenuItem key={option.label} value={option.label}>
			{capitalize(option.label)}
		</MenuItem>
	));
};

const renderLayer = (
	layerOptions,
	layerName,
	nextLayerName,
	values,
	handleChange,
	capitalize
) => {
	if (!layerOptions || !layerOptions.children) {
		return null;
	}

	const currentLayerValue = values[layerName];

	return (
		<>
			<FormControl fullWidth variant="outlined">
				<InputLabel>{capitalize(layerName)}</InputLabel>
				<Select
					name={layerName}
					value={currentLayerValue}
					onChange={(e) => handleChange(e.target.name, e.target.value)}
				>
					{renderOptions(layerOptions.children, capitalize)}
				</Select>
			</FormControl>
			{currentLayerValue &&
				renderLayer(
					layerOptions.children.find(
						(child) => child.label === currentLayerValue
					),
					nextLayerName,
					`layer${parseInt(nextLayerName.slice(-1)) + 1}`,
					values,
					handleChange,
					capitalize
				)}
		</>
	);
};

const StaffPositionForm = ({title, staffTree, values, onChange}) => {
	const {capitalize} = useCap();

	return (
		<Card>
			<CardContent>
				<Typography variant="h6">{title}</Typography>
				<Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
					{renderLayer(
						staffTree,
						'layer1',
						'layer2',
						values,
						onChange,
						capitalize
					)}
				</Box>
			</CardContent>
		</Card>
	);
};

export default StaffPositionForm;
