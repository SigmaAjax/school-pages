import {Link as RouterLink} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';
import useDeleteUpdate from '../../Hooks/useDeleteUpdate';
import {Box, Typography, Button} from '@mui/material';

export default function Post({content, admin}) {
	const {buttonName, post} = useAdmin();
	const {setIsOpenModal, setButtonName, setPost} = useAdminUpdate();
	// I can only delete from this page
	const {updateOrDelete} = useDeleteUpdate(buttonName, content);

	return (
		<Box>
			<Box key={content.id} className="postContainer item two">
				{admin ? (
					<RouterLink
						to={`/admin/newPost/admin-posts/${content.id}/${content.slug}`}
					>
						<Typography variant="h5">{content.title}</Typography>
					</RouterLink>
				) : (
					<RouterLink to={`/aktuality/${content.id}/${content.slug}`}>
						<Typography variant="h5">{content.title}</Typography>
					</RouterLink>
				)}

				<Typography>
					{content.post_text.length > 200
						? content.post_text.substring(0, 200) + '...'
						: content.post_text}
				</Typography>
				<Typography variant="subtitle1" component="strong">
					{content.user_name}
				</Typography>
				{admin && (
					<>
						<Button
							name="post-delete"
							onClick={() => {
								setIsOpenModal((prev) => {
									return !prev;
								});
								setPost(content);
								updateOrDelete(post);
							}}
						>
							Vymazat příspěvek
						</Button>
						<RouterLink
							to={`/admin/newPost/admin-posts/${content.id}/${content.slug}`}
						>
							<Button
								onClick={(e) => {
									alert('Příspěvek bude upraven');
									setButtonName((prev) => {
										prev = e.target.name;
										return prev;
									});
								}}
							>
								Upravit příspěvek
							</Button>
						</RouterLink>
					</>
				)}
			</Box>
		</Box>
	);
}
