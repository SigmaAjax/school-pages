import ErrorMsg from '../GalleryComponents/ErrorMsg';

export default function AddDocsDropzone({
	documents,
	isDragActive,
	getRootProps,
	getInputProps,
	fileRejections,
}) {
	return (
		<div>
			<label htmlFor="dropzone">
				<p>
					Sem můžete přetáhnou fotografie nebo vybrat fotografie kliknutím sem
					&#128071;
				</p>
			</label>
			<div name="dropzone" className="dropzone" {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? (
					documents.length > 0 ? (
						<div>
							<p>Chystáte se vložit další dokumet k ostatním dokumentům</p>
							<em>
								(maximální počet vložených dokumetů je 20, Duplikáty budou
								sloučeny)
							</em>
						</div>
					) : (
						<div>
							<p>Chystáte se vložit dokument</p>
							<em>
								(maximální počet vložených dokumetů je 20, Duplikáty budou
								sloučeny)
							</em>
						</div>
					)
				) : (
					<div>
						<p>Můžete vložit dokument</p>
						<em>
							(maximální počet vložených dokumetů je 20, Duplikáty budou
							sloučeny)
						</em>
					</div>
				)}
			</div>
			{/* //////////////////////////////////////////////////////////////// */}
			{/* Error message for admin after file rejection*/}
			<ErrorMsg fileRejections={fileRejections} />
		</div>
	);
}
