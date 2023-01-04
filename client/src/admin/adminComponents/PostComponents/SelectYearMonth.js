import {useState} from 'react';
import {useAdmin} from '../../../context/AdminContext';

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
		<form>
			<label htmlFor="date-input-from">Příspěvky od data:</label>
			<input
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
			<label htmlFor="date-input-to">Příspěvky do data:</label>
			<input
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
			<button
				type="button"
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
								posted.date_updated >= dateFrom && posted.date_updated <= dateTo
							);
						});
						return postsInPeriod;
					});
				}}
			>
				Potvrdit časové období
			</button>
			<button
				button="button"
				disabled={dateFrom === dateTo ? true : false}
				onChange={() => {
					orderedListFromToFunc((prev) => {
						return postList;
					});
				}}
			>
				Resetovat časové rozmezí
			</button>
		</form>
	);
}
