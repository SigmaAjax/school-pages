import {useState} from 'react';
import {
	Button,
	TextField,
	Container,
	Grid,
	Typography,
	Box,
} from '@mui/material';

export default function ContactForm() {
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		setInputs({...inputs, [event.target.name]: event.target.value});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('This is your inputs obj...', inputs);
	};

	return (
		<Container maxWidth="xl">
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<Box
					display={'flex'}
					justifyContent={'space-around'}
					flex-direction={'column'}
					alignItems={'center'}
					style={{width: '100%'}}
				>
					<Grid marginBottom={3}>
						<Typography variant="h4" gutterBottom>
							Kontaktujte nás
						</Typography>
						<Typography variant="body1">
							Pomocí formuláře se na nás můžete obrátit s Vaším dotazem
						</Typography>
					</Grid>
					<Grid
						container
						direction="column"
						justifyContent="space-between"
						spacing={2}
						maxWidth={500}
					>
						<Grid item xs={12} sm={6} md={6} lg={6}>
							<TextField
								fullWidth
								required
								name="name"
								label="Jméno a příjmení"
								variant="outlined"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								fullWidth
								name="street"
								label="Ulice"
								variant="outlined"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								fullWidth
								name="municipality"
								label="Obec/Město"
								variant="outlined"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								fullWidth
								type="text"
								name="postal"
								label="PSČ"
								variant="outlined"
								onChange={handleChange}
								inputProps={{
									maxLength: 5, // limits the length to the 5 digits typical of Czech postal codes
								}}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={6}>
							<TextField
								fullWidth
								required
								type="tel"
								name="phone"
								label="Telefon"
								variant="outlined"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={10}>
							<TextField
								fullWidth
								required
								type="email"
								name="email"
								label="Email"
								variant="outlined"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={10}>
							<TextField
								fullWidth
								required
								name="subject"
								label="Předmět"
								variant="outlined"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								required
								multiline
								rows={10}
								columns={10}
								name="content"
								label="Obsah"
								variant="outlined"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button type="submit" variant="contained" color="primary">
								Odeslat
							</Button>
						</Grid>
					</Grid>
				</Box>
			</form>
		</Container>
	);
}
