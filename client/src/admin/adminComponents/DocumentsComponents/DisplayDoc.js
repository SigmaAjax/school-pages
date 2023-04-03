import React, {useState} from 'react';
import GetAppIcon from '@mui/icons-material/GetApp';
import useFileSize from '../../../Hooks/useFileSize';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Modal,
	Typography,
} from '@mui/material';
import DocViewer from '@cyntler/react-doc-viewer';

export default function DisplayDoc({doc}) {
	const {formatBytes} = useFileSize();
	const [showPreview, setShowPreview] = useState(false);

	const togglePreview = () => {
		setShowPreview((prev) => !prev);
	};

	const isViewable = (filename) => {
		const viewableExtensions = ['.pdf']; // Add any other viewable file types if needed
		const fileExtension = filename
			.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 1)
			.toLowerCase();
		return viewableExtensions.includes(fileExtension);
	};

	const fileURL =
		doc.url && doc.url.includes('files/')
			? `${doc.url}`
			: URL.createObjectURL(doc); // and here
	console.log({doc: doc, url: fileURL});

	return (
		<Card sx={{minWidth: 275, marginBottom: 2, position: 'relative'}}>
			<CardContent>
				<Grid container justifyContent="center" alignItems="center">
					<Grid item xs={12}>
						<Typography variant="h6" align="center">
							{doc.name}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography align="center">{formatBytes(doc.size)}</Typography>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Grid container justifyContent="center" alignItems="center">
					<Grid item>
						<a
							href={fileURL}
							download={doc.name}
							style={{textDecoration: 'none'}}
						>
							<Button
								variant="contained"
								color="primary"
								startIcon={<GetAppIcon />}
							>
								Stáhnout
							</Button>
						</a>
					</Grid>
					{isViewable(doc.name) && (
						<Box
							sx={{
								position: 'absolute',
								top: 8,
								right: 8,
							}}
						>
							<Button onClick={togglePreview}>Náhled</Button>
						</Box>
					)}
				</Grid>
			</CardActions>

			{showPreview && (
				<Modal
					open={showPreview}
					onClose={togglePreview}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Box
						sx={{
							width: '80%',
							height: '80%',
							bgcolor: 'white',
							borderRadius: 2,
							boxShadow: 24,
							p: 4,
							position: 'relative',
						}}
					>
						<Button
							onClick={togglePreview}
							sx={{
								position: 'absolute',
								top: 8,
								right: 8,
							}}
						>
							Close
						</Button>
						<DocViewer
							documents={[
								{
									uri: fileURL,
								},
							]}
							style={{
								width: '100%',
								height: '100%',
								border: 'none',
							}}
						/>
					</Box>
				</Modal>
			)}
		</Card>
	);
}
