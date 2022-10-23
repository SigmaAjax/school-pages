import {Link} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';
import useDeleteUpdate from '../../Hooks/useDeleteUpdate';

export default function Post({content, admin}) {
	const {buttonName, post} = useAdmin();
	const {setIsOpenModal, setButtonName, setPost} = useAdminUpdate();
	// I can only delete from this page
	const {updateOrDelete} = useDeleteUpdate(buttonName, content);

	return (
		<div className="container">
			<div key={content.id} className="postContainer item two">
				{admin ? (
					<Link to={`/admin/newPost/admin-posts/${content.id}/${content.slug}`}>
						<h2>{content.title}</h2>
					</Link>
				) : (
					<Link to={`/aktuality/${content.id}/${content.slug}`}>
						<h2>{content.title}</h2>
					</Link>
				)}

				<p>
					{content.post_text.length > 200
						? content.post_text.substring(0, 200) + '...'
						: content.post_text}
				</p>
				<strong>{content.user_name}</strong>
				{admin && (
					<>
						<button
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
						</button>
						<a
							href={`/admin/newPost/admin-posts/${content.id}/${content.slug}`}
							rel="noreferrer"
						>
							<button
								onClick={(e) => {
									alert('Příspěvek bude upraven');
									setButtonName((prev) => {
										prev = e.target.name;
										return prev;
									});
								}}
							>
								Upravit příspěvek
							</button>
						</a>
					</>
				)}
			</div>
		</div>
	);
}
