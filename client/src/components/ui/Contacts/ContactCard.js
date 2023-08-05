import {Card, CardContent, Typography} from '@mui/material';
import useCap from '../../../Hooks/useCap';

export default function ContactCard(props) {
	const {capitalize} = useCap();
	const {employeeAttributes, ...rest} = props;
	console.log(employeeAttributes);
	return (
		<Card
			variant="outlined"
			style={{
				minWidth: '200px',
				maxWidth: '300px',
				margin: '20px',
			}}
		>
			<CardContent>
				<Typography variant="h6" gutterBottom>
					{props.name} {props.lastName}
				</Typography>
				<Typography variant="body2" color="textSecondary" gutterBottom>
					{props.email}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{props.phone}
				</Typography>
			</CardContent>
		</Card>
	);
}
