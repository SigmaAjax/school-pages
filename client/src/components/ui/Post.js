import {Link} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../../context/AdminContext';

export default function Post({content, admin}) {
	const {isOpenModal} = useAdmin();
	const {setIsOpenModal} = useAdminUpdate();

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
							onClick={() => {
								setIsOpenModal((prev) => {
									console.log('open modal got clicked from post');
									return !prev;
								});
							}}
						>
							Vymazat příspěvek
						</button>
						<a
							href={`/admin/newPost/admin-posts/${content.id}/${content.slug}`}
							rel="noreferrer"
						>
							<button onClick={() => alert('Příspěvek bude upraven')}>
								Upravit příspěvek
							</button>
						</a>
					</>
				)}
			</div>
		</div>
	);
}
