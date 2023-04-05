import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DisplayDoc from './DisplayDoc';

const localhost = 'http://localhost:3200';

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
		<div>
			<h1>Uploaded Documents</h1>

			{documents.length > 0 &&
				documents.map((doc) => (
					<DisplayDoc
						key={doc.name}
						doc={doc}
						deleteFile={deleteFile}
						showDeleteButton
					/>
				))}
		</div>
	);
}
