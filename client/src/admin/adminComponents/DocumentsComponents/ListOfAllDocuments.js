import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DisplayDoc from './DisplayDoc';

export default function ListOfAllDocuments() {
	const [documents, setDocuments] = useState([]);

	const fetchFiles = async () => {
		try {
			const response = await fetch('http://localhost:3200/files');
			// const response = await axios.get('http://localhost:3200/files');
			console.log({response: response});
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

	console.log('actual state', documents);

	return (
		<div>
			<h1>Uploaded Documents</h1>

			{/* {documents.length > 0 &&
				documents.map((doc) => {
					console.log(documents);
					return (
						<div>
							<h2>{doc.name}</h2>
							<p>Size: {doc.size} bytes</p>
							<p>Type: {doc.type}</p>
							<a href={doc.path} download>
								Download {doc.name}
							</a>
						</div>
					);
				})} */}
			{/* {documents.length > 0 &&
				documents.map((doc) => <DisplayDoc key={doc.name} doc={doc} />)} */}
		</div>
	);
}
