import React from 'react';
import ErrorMsg from './ErrorMsg';

import styles from '../../../pages/admin.module.css';

export default function AddPhotosDropzone({
	isDragActive,
	photos,
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
			<div name="dropzone" className={styles.dropzone} {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? (
					photos.length > 0 ? (
						<div>
							<p>Chystáte se vložit fotografie k ostatním fotografiím</p>
							<em>
								(maximální počet vložených fotografií je 50, Duplikáty budou
								sloučeny)
							</em>
						</div>
					) : (
						<div>
							<p>Chystáte se vložit fotografie</p>
							<em>
								(maximální počet vložených fotografií je 50, Duplikáty budou
								sloučeny)
							</em>
						</div>
					)
				) : (
					<div>
						<p>Můžete vložit fotografie</p>
						<em>
							(maximální počet vložených fotografií je 50, Duplikáty budou
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
