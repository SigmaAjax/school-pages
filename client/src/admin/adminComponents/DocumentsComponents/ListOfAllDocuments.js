import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DisplayDoc from './DisplayDoc';
import {Loader} from '../../../Loader';

export default function ListOfAllDocuments() {
	const [documents, setDocuments] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const url =
		process.env.NODE_ENV === 'production'
			? `${process.env.REACT_APP_BACKEND_URL}`
			: '';

	async function deleteFile(filename) {
		console.log('delete file ' + encodeURIComponent(filename));
		try {
			await axios.delete(`${url}/api/file/${encodeURIComponent(filename)}`);
			// Refresh the list of files after successful deletion
			fetchFiles();
		} catch (error) {
			console.error('Error deleting file:', error);
		}
	}

	const fetchFiles = async () => {
		try {
			setLoading((prev) => !prev); //true
			const response = await axios.get(`${url}/api/documents`);

			const files = await response.data;
			console.log({files: files});

			setDocuments(files);
			setLoading(false);
		} catch (error) {
			console.error('Error when fetching files', error);
			setError(error);
			setLoading((prev) => !prev); //false
		}
	};

	useEffect(() => {
		fetchFiles();
	}, []);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return (
			<div>
				<p>Nepodařilo se načíst Dokumenty</p>
				<p>
					Error code: {error.code} - {error.message}
				</p>
			</div>
		);
	}

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
