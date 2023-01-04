import {useAdmin} from '../../../context/AdminContext';

export default function SelectInput({orderedPostFunc, orderedListOfPosts}) {
	//const {postList} = useAdmin();
	const copyPosts = [...orderedListOfPosts];

	return (
		<>
			<label htmlFor="ordering-option">Seřadit podle</label>
			<select
				name="ordering-options"
				onChange={(e) => {
					switch (e.target.value) {
						case 'alphabet':
							console.log(e.target.value);

							orderedPostFunc(() => {
								const alphabeticalOrder = copyPosts.sort((a, b) => {
									if (a.title.toLowerCase() < b.title.toLowerCase()) {
										return -1;
									}
									if (a.title.toLowerCase() > b.title.toLowerCase()) {
										return 1;
									}
									return 0;
								});
								return alphabeticalOrder;
							});

							break;

						case 'alphabet-backward':
							orderedPostFunc(() => {
								const alphabeticalOrder = copyPosts.sort((a, b) => {
									if (a.title.toLowerCase() > b.title.toLowerCase()) {
										return -1;
									}
									if (a.title.toLowerCase() < b.title.toLowerCase()) {
										return 1;
									}
									return 0;
								});
								return alphabeticalOrder;
							});
							console.log(e.target.value);

							break;

						case 'date-created-latest':
							orderedPostFunc(() => {
								const orderedByDateLatest = copyPosts.sort((a, b) => {
									const dateA = new Date(a.date_posted);
									const dateB = new Date(b.date_posted);
									return dateB - dateA;
								});

								return orderedByDateLatest;
							});
							console.log(e.target.value);
							break;

						case 'date-created-oldest':
							orderedPostFunc(() => {
								const orderedByDateOldest = copyPosts.sort((a, b) => {
									const dateA = new Date(a.date_posted);
									const dateB = new Date(b.date_posted);
									return dateA - dateB;
								});

								return orderedByDateOldest;
							});
							console.log(e.target.value);
							break;

						case 'date-updated-latest':
							orderedPostFunc(() => {
								const orderedByDateLatest = copyPosts.sort((a, b) => {
									const dateA = new Date(a.date_updated);
									const dateB = new Date(b.date_updated);
									return dateB - dateA;
								});

								return orderedByDateLatest;
							});
							console.log(e.target.value);
							break;

						case 'date-updated-oldest':
							orderedPostFunc(() => {
								const orderedByDateOldest = copyPosts.sort((a, b) => {
									const dateA = new Date(a.date_posted);
									const dateB = new Date(b.date_posted);
									return dateA - dateB;
								});

								return orderedByDateOldest;
							});
							console.log(e.target.value);
							break;

						default:
							console.log('Something went wrong in SelectInput component');
							break;
					}
				}}
			>
				<option key="empty" value={null}></option>
				<option key={'alphabet'} value="alphabet">
					Názvu v abecedním pořadí od A&#8593;&#8595;Z
				</option>
				<option key={'alphabet-backward'} value="alphabet-backward">
					Názvu v opačném abecedním pořadí od Z&#8593;&#8595;A
				</option>
				<option key="created-latest" value="date-created-latest">
					Datumu vytvoření od nejnovějšího
				</option>
				<option key="created-oldest" value="date-created-oldest">
					Datumu vytvoření od nejstaršího
				</option>
				<option key={'change-latest'} value="date-updated-latest">
					Datumu změny od nejnovější
				</option>
				<option key={'change-oldest'} value="date-updated-oldest">
					Datumu změny od nejstarší
				</option>
			</select>
		</>
	);
}
