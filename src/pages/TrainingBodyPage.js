import {Routes as RouterRoutes, Route} from 'react-router-dom';

import AdminSidebar from '../admin/adminComponents/AdminSidebar.js';
import EmployeeForm from '../admin/EmployeeForm.js';

export default function TrainingBodyPage() {
	return (
		<div className="container">
			<div className="item one">
				<AdminSidebar />
			</div>
			{/* <div className="item two">flex item 2</div> */}
			<RouterRoutes>
				<Route
					path="zamestnanci"
					element={
						<div className="item three">
							<EmployeeForm />
						</div>
					}
				/>
				<Route path="aktuality" element={<h1>Aktuality</h1>} />
				<Route path="galerie" element={<h1>Galerie</h1>} />
				<Route path="dokumenty" element={<h1>dokumety</h1>} />
			</RouterRoutes>
		</div>
	);
}
