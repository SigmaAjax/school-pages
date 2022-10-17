import {Link} from 'react-router-dom';

export default function Post({content, admin, onCloseModal}) {
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
						<button onClick={onCloseModal}>Vymazat příspěvek</button>
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
