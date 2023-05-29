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

export default function DisplayDoc({doc, deleteFile, showDeleteButton}) {
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

	return (
		<Card
			sx={{minWidth: 450, maxWidth: 500, marginBottom: 2, position: 'relative'}}
		>
			<CardContent>
				<Grid container justifyContent="center" alignItems="center">
					<Grid item xs={12}>
						<Typography
							variant="h6"
							align="center"
							sx={{
								maxWidth: 'calc(100% - 80px)', // This can be adjusted based on the space you want to leave for the "Náhled" button
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{doc.name}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography align="center">{formatBytes(doc.size)}</Typography>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Grid container justifyContent="center" alignItems="center" spacing={2}>
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
					{showDeleteButton && (
						<Grid item>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => deleteFile(doc.name)}
							>
								Delete
							</Button>
						</Grid>
					)}
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
