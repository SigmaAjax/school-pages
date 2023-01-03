import AdminPost from './AdminPost';

export default function AdminPostList({listOfPosts}) {
	return (
		<>
			{listOfPosts.map((val) => {
				return <AdminPost key={val.id} content={val} />;
			})}
		</>
	);
}
