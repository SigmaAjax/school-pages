export default function SearchInput({filterFunc, ...rest}) {
	return (
		<input
			placeholder="Vyhledat příspěvek podle názvu"
			onChange={(event) => {
				filterFunc(() => event.target.value);
				console.log(event.target.value);
			}}
		/>
	);
}
