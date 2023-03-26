import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DisplayDoc from './DisplayDoc';

export default function ListOfAllDocuments() {
	const [documents, setDocuments] = useState([]);

	const fetchUploadedDocs = async () => {
		try {
			const response = await axios.get('/api/documents');
			if (response.status === 200) {
				setDocuments(response.data);
			}
		} catch (error) {
			console.error('Error fetching uploaded documents:', error);
		}
	};

	useEffect(() => {
		fetchUploadedDocs();
	}, []);

	return (
		<div>
			<h1>Uploaded Documents</h1>
			{documents.length > 0 &&
				documents.map((doc) => <DisplayDoc key={doc.name} doc={doc} />)}
		</div>
	);
}
