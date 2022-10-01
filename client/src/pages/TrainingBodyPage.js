import {useEffect} from 'react';
import {Routes as RouterRoutes, Route} from 'react-router-dom';

import AdminSidebar from '../admin/adminComponents/AdminSidebar.js';
import EmployeeForm from '../admin/EmployeeForm.js';

export default function TrainingBodyPage() {
	useEffect(() => {
		fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/`)
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
	}, []);

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
