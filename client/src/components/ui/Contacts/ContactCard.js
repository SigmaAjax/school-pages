import {
	Card,
	CardContent,
	Typography,
	IconButton,
	Link,
	Box,
	Grid,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import useCap from '../../../Hooks/useCap';

function formatPhoneNumber(number) {
	const cleaned = ('' + number).replace(/\D/g, ''); // Remove non-digits
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
	if (match) {
		return '+420 ' + match[1] + ' ' + match[2] + ' ' + match[3];
	}
	return number; // Return original if the format doesn't match the expected one
}

export default function ContactCard(props) {
	const {capitalize} = useCap();
	const {name, lastName, email, phone, academic_title, prac_pozice} = props;

	function formatPosition(position) {
		// Replace underscores with spaces and capitalize each word
		return position.split('_').map(capitalize).join(' ');
	}

	const formattedPhone = formatPhoneNumber(phone);

	// Conditional check for academic title and its placement
	const displayName = academic_title
		? `${academic_title} ${name} ${lastName}`
		: `${name} ${lastName}`;

	return (
		<Card
			variant="elevation"
			elevation={4}
			style={{
				minWidth: '200px',
				maxWidth: '300px',
				maxHeight: '300px',
				margin: '20px',
			}}
		>
			<CardContent>
				<Grid
					container
					direction="column"
					alignContent={'space-around'}
					alignItems={'stretch'}
					style={{height: '100%'}}
				>
					{' '}
					<Typography variant="h6" gutterBottom marginTop={1}>
						{displayName}
					</Typography>
					<Typography
						variant="body2"
						display="block"
						color="textSecondary"
						marginLeft={1}
						marginTop={1}
						style={{
							wordWrap: 'break-word',
						}}
					>
						{prac_pozice.map(formatPosition).join(', ')}
					</Typography>
					<Box display="flex" alignItems="center" my={1} marginTop={4}>
						<Box display="inline" pr={2} mb={1}>
							<IconButton
								size="small"
								href={`mailto:${email}`}
								title="Napsat e-mail"
								color="primary"
							>
								<EmailIcon fontSize="small" />
							</IconButton>
							<Link
								href={`mailto:${email}`}
								color="textSecondary"
								underline="hover"
							>
								<Typography variant="body2" display="inline">
									{email}
								</Typography>
							</Link>
						</Box>
					</Box>
					<Box display="flex" alignItems="center" my={1}>
						<Box display="inline" pr={2}>
							<IconButton
								size="small"
								href={`tel:${phone}`}
								title="Zavolat"
								color="primary"
							>
								<PhoneIcon fontSize="small" />
							</IconButton>
							<Link
								href={`tel:${phone}`}
								color="textSecondary"
								underline="hover"
							>
								<Typography variant="body2" display="inline">
									{formattedPhone}
								</Typography>
							</Link>
						</Box>
					</Box>
				</Grid>
			</CardContent>
		</Card>
	);
}
