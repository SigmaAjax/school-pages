import {BrowserRouter as Router} from 'react-router-dom';

import Layout from './components/layout/Layout';
import {Routes} from './Routes';

export default function App() {
	return (
		<Router>
			<Layout>
				<Routes />
			</Layout>
		</Router>
	);
}
