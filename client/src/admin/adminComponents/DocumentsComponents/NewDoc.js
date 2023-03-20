import {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import AddDocsDropzone from './AddDocsDropzone';
import DisplayDoc from './DisplayDoc';

export default function NewDoc() {
	const [docs, setDocs] = useState([]);

	//// Callback creating images and checking for duplicates
	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		let uniqueDocs = [];
		acceptedFiles.forEach((file) => {
			const isDuplicate = uniqueDocs.some(
				(doc) => doc.name === file.name && doc.size === file.size
			);
			if (!isDuplicate) {
				uniqueDocs.push(file);
			}
		});
		setDocs((prevDocs) => [...prevDocs, ...uniqueDocs]);
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
			{docs.length > 0 && <DisplayDoc documents={docs} />}
		</>
	);
}
