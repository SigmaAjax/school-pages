import {useState} from 'react';
import {useAdmin} from '../../../context/AdminContext';
import {Button, Grid, InputLabel} from '@mui/material';

const FORM_STYLES = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '20px',
	backgroundColor: '#f8f8f8',
	borderRadius: '8px',
	height: '100%', // ensure form takes up full height so justifyContent works properly
};

const INPUT_STYLES = {
	maxWidth: '250px',
	width: '50%',
	padding: '10px',
	marginBottom: '10px',
	borderRadius: '4px',
	border: '1px solid #ddd',
};

export default function SelectYearMonth({orderedListFromToFunc}) {
	const today = new Date();
	const {postList} = useAdmin();
	const formatDateCzech = new Intl.DateTimeFormat('cs-CZ', {
		// day: '2-digit',
		// month: '2-digit',
		// year: 'numeric',
		dateStyle: 'full',
	});
	const [dateFrom, setDateFrom] = useState(
		new Date(today).toISOString().substring(0, 10) // bez ISO nepříjímá input hodnotu
	);
	const [dateTo, setDateTo] = useState(
		new Date(today).toISOString().substring(0, 10)
	);

	return (
		<form style={FORM_STYLES}>
			<InputLabel htmlFor="date-input-from">Příspěvky od data:</InputLabel>
			<input
				style={INPUT_STYLES}
				id="date-input-from"
				lang="cs-CZ"
				type="date"
				value={dateFrom}
				onChange={(e) => {
					console.log(dateFrom);
					setDateFrom(() => {
						const newDate = new Date(e.target.value || today)
							.toISOString()
							.substring(0, 10);

						console.log(formatDateCzech.format(new Date(newDate)));
						return newDate;
					});
				}}
			/>
			<InputLabel htmlFor="date-input-to">Příspěvky do data:</InputLabel>
			<input
				style={INPUT_STYLES}
				id="date-input-to"
				type="date"
				lang="cs-CZ"
				value={dateTo}
				onChange={(e) => {
					setDateTo(() => {
						const newDate = new Date(e.target.value || today)
							.toISOString()
							.substring(0, 10);
						console.log(formatDateCzech.format(new Date(newDate)));
						return newDate;
					});
				}}
			/>
			<Grid container spacing={2} sx={{marginTop: 'auto', width: 'auto'}}>
				<Grid item>
					<Button
						variant="contained"
						color="primary"
						disabled={dateFrom === dateTo ? true : false}
						onClick={() => {
							console.log(
								'Od ' +
									formatDateCzech.format(new Date(dateFrom)) +
									' do ' +
									formatDateCzech.format(new Date(dateTo))
							);
							orderedListFromToFunc((prev) => {
								const postsInPeriod = prev.filter((posted) => {
									return (
										posted.date_updated >= dateFrom &&
										posted.date_updated <= dateTo
									);
								});
								return postsInPeriod;
							});
						}}
					>
						Potvrdit časové období
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="outlined"
						color="secondary"
						disabled={dateFrom === dateTo ? true : false}
						onClick={() => {
							orderedListFromToFunc((prev) => {
								return postList;
							});
						}}
					>
						Resetovat časové rozmezí
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}
