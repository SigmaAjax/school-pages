import {InputLabel} from '@mui/material';

export default function SearchInput({searchWord}) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				paddingTop: '20px',
				paddingBottom: '20px',
			}}
		>
			<InputLabel>Vyhledávání příspěvků podle názvu</InputLabel>
			<style>
				{`
                #custom-input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                    color: #d9cfd3;
                }
                #custom-input::-moz-placeholder { /* Firefox 19+ */
                    color: #d9cfd3;
                }
                #custom-input:-ms-input-placeholder { /* IE 10+ */
                    color: #d9cfd3;
                }
                #custom-input:-moz-placeholder { /* Firefox 18- */
                    color: #d9cfd3;
                }
                `}
			</style>
			<input
				id="custom-input"
				type="text"
				placeholder="Vyhledat příspěvek podle názvu"
				style={{
					maxWidth: '300px',
					width: '70%',
					padding: '10px',
					borderRadius: '5px',
					border: '1px solid #ccc',
					fontSize: '16px',
					color: '#333',
					outline: 'none',
					boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
					marginTop: '10px',
				}}
				onChange={(event) => {
					searchWord(() => {
						return event.target.value.toLocaleLowerCase();
					});
				}}
			/>
		</div>
	);
}
