import {Routes as RouterRoutes, Route} from 'react-router-dom';

import Cantine from './pages/Cantine';
import ContactPage from './pages/ContactPage';
import Elementary from './pages/Elementary';
import Home from './pages/Home';
import Preschool from './pages/Preschool';
import TrainingBodyPage from './pages/TrainingBodyPage';

export function Routes() {
	return (
		<RouterRoutes>
			<Route index path="/" element={<Home />} />
			<Route path="/skolka" element={<Preschool />} />
			<Route path="/jidelna" element={<Cantine />} />
			<Route path="/zakladka" element={<Elementary />} />
			<Route path="/kontakty" element={<ContactPage />} />
			<Route exact path="/admin/*" element={<TrainingBodyPage />} />
		</RouterRoutes>
	);
}
