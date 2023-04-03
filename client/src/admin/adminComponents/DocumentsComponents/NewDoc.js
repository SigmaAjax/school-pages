import axios from 'axios';
import {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import AddDocsDropzone from './AddDocsDropzone';
import DisplayDoc from './DisplayDoc';

export default function NewDoc() {
	const [docs, setDocs] = useState([]);

	//// Callback creating images and checking for duplicates

	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		let uniqueDocs = [];
		console.table(acceptedFiles);
		acceptedFiles.forEach((file) => {
			const isDuplicate = uniqueDocs.some(
				(doc) => doc.name === file.name && doc.size === file.size
			);
			if (!isDuplicate) {
				uniqueDocs.push(file);
			}
		});
		setDocs((prevDocs) => {
			const newDocs = [...prevDocs];
			uniqueDocs.forEach((file) => {
				const isDuplicate = prevDocs.some(
					(doc) => doc.name === file.name && doc.size === file.size
				);
				if (!isDuplicate) {
					newDocs.push(file);
				}
			});
			return newDocs;
		});
	}, []);

	const {fileRejections, getRootProps, getInputProps, isDragActive} =
		useDropzone({
			onDrop,
			accept: {
				'application/vnd.ms-excel': ['.xls', '.slk', '.xla', '.xlt', '.xlw'],
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
					'.xlsx',
				],
				'text/csv': ['.csv'],
				'text/html': ['.htm', '.html'],
				'text/plain': ['.txt', '.dif'],
				'application/x-iwork-numbers-sffnumbers': ['.numbers'],
				'text/xml': ['.xml'],
				'application/vnd.oasis.opendocument.spreadsheet': ['.ods'],
				'application/vnd.oasis.opendocument.text': ['.odt'],
				'multipart/related': ['.mhtl'],
				'application/vnd.ms-excel.sheet.binary.macroenabled.12': ['.xlsb'],
				'application/vnd.ms-excel.sheet.macroenabled.12': ['.xlsm'],
				'application/vnd.ms-excel.template.macroenabled.12': ['.xltm'],
				'application/vnd.ms-excel.addin.macroenabled.12': ['.xlam'],
				'application/x-dbase': ['.dbf'],
				'message/rfc822': ['.mht'],
				'application/pdf': [],
				'application/msword': ['.doc', '.dot'],
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
					['.docx'],
				'application/vnd.ms-powerpoint': ['.ppt', '.pot', '.pps', '.ppa'],
			},
			maxFiles: 20,
		});

	const handleUploadFiles = async () => {
		const formData = new FormData();
		docs.forEach((doc) => {
			const normalizedFilename = doc.name.normalize('NFC');
			const encodedFilename = encodeURIComponent(normalizedFilename);
			const file = new File([doc], encodedFilename, {type: doc.type});
			formData.append('files', file);
		});

		try {
			const response = await axios.post('/api/upload/files', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (response.status === 200) {
				alert('Files uploaded successfully');
			}
		} catch (error) {
			console.error('Error uploading files:', error);
			alert('Error uploading files');
		}
	};

	return (
		<>
			<h1>Nový dokument</h1>
			<AddDocsDropzone
				isDragActive={isDragActive}
				documents={docs}
				getRootProps={getRootProps}
				getInputProps={getInputProps}
				fileRejections={fileRejections}
			/>
			{docs.length > 0 &&
				docs.map((doc) => <DisplayDoc key={doc?.name} doc={doc} />)}
			{docs.length > 0 && (
				<button type="button" onClick={handleUploadFiles}>
					Nahrát soubory
				</button>
			)}
		</>
	);
}
