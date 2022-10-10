import {Link, useParams} from 'react-router-dom';

export default function Post({content}) {
	return (
		<div className="container">
			<div key={content.id} className="postContainer item two">
				<Link to={`/aktuality/${content.slug}`}>
					<h2>{content.title}</h2>
				</Link>
				<p>
					{content.post_text.length > 200
						? content.post_text.substring(0, 200) + '...'
						: content.post_text}
				</p>
				<strong>{content.user_name}</strong>
			</div>
		</div>
	);
}
