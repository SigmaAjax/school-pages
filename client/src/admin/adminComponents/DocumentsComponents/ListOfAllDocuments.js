import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DisplayDoc from './DisplayDoc';

import styles from './../../../pages/admin.module.css';

export default function ListOfAllDocuments() {
	const [documents, setDocuments] = useState([]);

	async function deleteFile(filename) {
		console.log('delete file ' + encodeURIComponent(filename));
		try {
			await axios.delete(`/api/file/${encodeURIComponent(filename)}`);
			// Refresh the list of files after successful deletion
			fetchFiles();
		} catch (error) {
			console.error('Error deleting file:', error);
		}
	}

	const fetchFiles = async () => {
		try {
			const response = await axios.get(`/api/documents`);

			const files = await response.data;
			console.log({files: files});

			setDocuments(files);
		} catch (error) {
			console.error('Error when fetching files', error);
		}
	};

	useEffect(() => {
		fetchFiles();
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				paddingTop: 10,
				backgroundColor: '#f2ecee',
			}}
		>
			<h1>Nahrané Dokumenty</h1>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'strech',
				}}
			>
				{documents.length > 0 &&
					documents.map((doc) => (
						<div
							style={{
								minWidth: '350px', // Change this to whatever minimum width you want
							}}
						>
							<DisplayDoc
								key={doc.name}
								doc={doc}
								deleteFile={deleteFile}
								showDeleteButton
							/>
						</div>
					))}
			</div>
		</div>
	);
}
