import useFileSize from '../../../Hooks/useFileSize';

export default function ErrorMsg({fileRejections}) {
	const {formatBytes} = useFileSize();
	const fileRejectionItems =
		fileRejections.map(({file, errors}) => (
			<li key={file.path}>
				<h5>Název souboru a velikost</h5>
				{file.path} - {formatBytes(file.size, 2)}
				<ul>
					{errors.map((e) => (
						<li key={e.code}>{e.message}</li>
					))}
				</ul>
			</li>
		)) || [];
	return (
		<>
			{' '}
			{fileRejections.length === 1 && (
				<p style={{color: 'red'}}>
					Váš soubor není v povoleném formátu pro fotografie!!
				</p>
			)}
			{fileRejections.length > 1 && (
				<p style={{color: 'red'}}>
					Váše soubory nejsou v povoleném formátu pro fotografie!!
				</p>
			)}
			{fileRejections.length > 0 && (
				<div className="error-message">
					{' '}
					<p style={{color: 'purple'}}>
						Prosíme paní ředitelku, aby upravila výběr souborů natažením souborů
						do pole určeného pro soubory.
					</p>
					<p style={{color: 'purple'}}>
						Změnu soubourů se správným formátem můžete učit kliknutím na pole
						pro soubory nebo natažením nových souborů
					</p>
					<p style={{color: 'green'}}>
						{' '}
						Počet odmítnutých souborů je: {fileRejections.length}
					</p>
				</div>
			)}
			{fileRejections.length > 0 && (
				<ul style={{width: 'auto', height: '200px', overflow: 'auto'}}>
					{fileRejectionItems}
				</ul>
			)}
		</>
	);
}
