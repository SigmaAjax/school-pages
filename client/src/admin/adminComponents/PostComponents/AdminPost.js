import {Link} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../../context/AdminContext';
//import useDeleteUpdate from '../../../Hooks/useDeleteUpdate';
// import {useAdmin, useAdminUpdate} from '../../context/AdminContext';
// import useDeleteUpdate from '../../Hooks/useDeleteUpdate';

export default function AdminPost({content}) {
	const {post} = useAdmin();
	const {setIsOpenModal, setButtonName, setPost} = useAdminUpdate();
	// I can only delete from this page
	//const {updateOrDelete} = useDeleteUpdate(buttonName, content);

	//const datum = new Intl(content.date_posted);

	return (
		<div className="container">
			<div key={content.id} className="postContainer item two">
				<Link to={`/admin/newPost/admin-posts/${content.id}/${content.slug}`}>
					<h2>{content.title}</h2>
				</Link>

				<p>
					{content.post_text.length > 200
						? content.post_text.substring(0, 200) + '...'
						: content.post_text}
				</p>
				<strong>{content.user_name}</strong>
				<strong>
					{content.date_posted ? content.date_posted : 'Chybí Datum'}
				</strong>

				<>
					<button
						name="post-delete"
						onClick={(e) => {
							//console.log(e.target.name === buttonName);
							setIsOpenModal((prev) => {
								return !prev;
							});
							setPost((prev) => content);
							console.log(post);
							// updateOrDelete(post);
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
								alert('Příspěvek bude upraven', e.target.name);
								setButtonName((prev) => {
									prev = e.target.name;
									return prev;
								});
							}}
						>
							Upravit příspěvek
						</button>
					</a>
					{/* <strong>Vytvořeno: {datum}</strong>
					<strong>Naposledy změněno: {datum}</strong> */}
				</>
			</div>
		</div>
	);
}
