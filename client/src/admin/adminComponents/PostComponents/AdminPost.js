import {Link} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../../context/AdminContext';
import {
	Button,
	Grid,
	Card,
	CardContent,
	CardActions,
	Typography,
} from '@mui/material';

//import styles from '../../../pages/admin.module.css';

export default function AdminPost({content}) {
	const {post} = useAdmin();
	const {setIsOpenModal, setButtonName, setPost} = useAdminUpdate();
	// I can only delete from this page
	//const {updateOrDelete} = useDeleteUpdate(buttonName, content);
	//console.log(content);

	const datum = new Date(content.date_posted);

	const datumUpdated = new Date(content.date_updated);

	const formatDateCzech = new Intl.DateTimeFormat('cs-cz', {
		dateStyle: 'full',
		timeStyle: 'short',
	});

	const url =
		process.env.NODE_ENV === 'production'
			? `${process.env.REACT_APP_BACKEND_URL}/api/get`
			: '/api/get';

	console.log(`${url}/${content.id}/${content.slug}`);

	return (
		<Card
			sx={{
				maxWidth: 400,
				marginBottom: 2,
				position: 'relative',
				boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
				borderRadius: '4px',
				padding: '16px',
				backgroundColor: '#f5f5f5',
			}}
		>
			<CardContent>
				<Grid container justifyContent="center" alignItems="center" spacing={2}>
					<Grid item xs={12}>
						<Link
							to={`/admin/newPost/admin-posts/${content.id}/${content.slug}`}
						>
							<Typography variant="h6" align="center">
								{content.title}
							</Typography>
						</Link>
					</Grid>

					<Grid item xs={12}>
						<Typography align="center" fontWeight={'bold'}>
							{content.user_name}
						</Typography>
					</Grid>
					{content.date_posted ? (
						<Grid item xs={12}>
							<Typography display="inline" align="center">
								Vytvořeno dne:{' '}
							</Typography>
							<Typography display="inline" align="center" fontWeight="bold">
								{formatDateCzech.format(datum)}
							</Typography>
						</Grid>
					) : (
						<Grid item xs={12}>
							<Typography align="center" fontWeight={'bold'}>
								Chybí Datum v databázi
							</Typography>
						</Grid>
					)}

					{content.date_updated && (
						<Grid item xs={12}>
							<Typography align="center">
								Naposledy změněno dne:{' '}
								<strong>{formatDateCzech.format(datumUpdated)}</strong>
							</Typography>
						</Grid>
					)}
				</Grid>
			</CardContent>
			<CardActions>
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					spacing={0.5}
				>
					{' '}
					{/* 0.5 * 8px (default theme spacing unit) = 4px */}
					<Grid item>
						<Button
							name="post-delete"
							variant="contained"
							color="error"
							sx={{
								'&:hover': {
									backgroundColor: 'darkred',
								},
							}}
							onClick={(e) => {
								setIsOpenModal((prev) => {
									return !prev;
								});
								setPost((prev) => content);
								console.log(post);
							}}
						>
							Vymazat příspěvek
						</Button>
					</Grid>
					<Grid item>
						<Button
							component={Link}
							to={`/admin/newPost/admin-posts/${content.id}/${content.slug}`}
							color="primary"
							variant="contained"
							rel="noopener noreferrer"
							onClick={(e) => {
								alert('Příspěvek bude upraven', e.target.name);
								setButtonName((prev) => {
									prev = e.target.name;
									return prev;
								});
							}}
						>
							Upravit příspěvek
						</Button>
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	);
}
