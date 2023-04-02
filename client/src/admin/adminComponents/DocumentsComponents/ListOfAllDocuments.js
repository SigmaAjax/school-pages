import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DisplayDoc from './DisplayDoc';

const localhost = 'http://localhost:3200';

export default function ListOfAllDocuments() {
	const [documents, setDocuments] = useState([]);

	async function deleteFile(filename) {
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
			console.log({response_all_documents: response});
			const files = await response.data;
			const fileURLs = await Promise.all(
				files.map(async (file) => {
					const fileResponse = await axios.get(
						`${localhost}/api/file/${file.name}`
					);
					console.log({response_one_file: fileResponse});
					const fileURL = fileResponse.data.url;
					const originalFilename = fileResponse.data.originalFilename;
					console.log({...file, url: fileURL, originalFilename});
					return {...file, url: fileURL, originalFilename};
				})
			);

			setDocuments(fileURLs);
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
				documents.map((doc) => {
					return (
						<div>
							<h2>{doc.name}</h2>
							<p>Size: {doc.size} bytes</p>
							<p>Type: {doc.type}</p>
							<a href={doc.url} download={doc.name}>
								Download {doc.name}
							</a>
							<button onClick={() => deleteFile(doc.name)}>Delete</button>
						</div>
					);
				})}

			{/* {documents.length > 0 &&
				documents.map((doc) => <DisplayDoc key={doc.name} doc={doc} />)} */}
		</div>
	);
}
