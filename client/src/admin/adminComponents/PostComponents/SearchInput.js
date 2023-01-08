import {useAdmin} from '../../../context/AdminContext';

export default function SearchInput({searchWord}) {
	//const {postList} = useAdmin();
	return (
		<input
			type={'text'}
			placeholder="Vyhledat příspěvek podle názvu"
			onChange={(event) => {
				//filterFunc(() => event.target.value);

				searchWord(() => {
					return event.target.value.toLocaleLowerCase();
				});
			}}
		/>
	);
}
