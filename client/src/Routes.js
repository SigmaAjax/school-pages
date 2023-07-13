import {Routes as RouterRoutes, Route} from 'react-router-dom';

import Cantine from './pages/Cantine';
import ContactPage from './pages/ContactPage';
import Elementary from './pages/Elementary';
import Home from './pages/Home';
import News from './pages/News';
import PostDetail from './pages/PostDetail';
import Preschool from './pages/Preschool';
import AdminPage from './pages/AdminPage';
import AlbumPage from './pages/AlbumsPage';

export function Routes() {
	return (
		<RouterRoutes>
			<Route index path="/" element={<Home />} />
			<Route exact path="/aktuality" element={<News admin={false} />} />
			<Route path="/aktuality/:id/:titleSlug" element={<PostDetail />} />
			<Route path="/skolka" element={<Preschool />} />
			<Route path="/jidelna" element={<Cantine />} />
			<Route path="/zakladka" element={<Elementary />} />
			<Route path="/kontakty" element={<ContactPage />} />
			<Route path="/fotogalerie" element={<AlbumPage />} />
			<Route exact path="/admin/*" element={<AdminPage />} />
		</RouterRoutes>
	);
}
