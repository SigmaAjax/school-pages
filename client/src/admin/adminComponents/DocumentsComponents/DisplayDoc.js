import useFileSize from '../../../Hooks/useFileSize';

export default function DisplayDoc({documents}) {
	const {formatBytes} = useFileSize();
	return (
		<div className="item two">
			{documents.map((doc) => {
				return (
					<div key={doc.name}>
						<p>{doc?.name}</p> <p>{formatBytes(doc?.size)}</p>
					</div>
				);
			})}
		</div>
	);
}
