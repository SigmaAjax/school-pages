import React from 'react';

import AdminRoutes from '../admin/adminRoutes/AdminRoutes.js';
import {AdminProvider} from '../context/AdminContext.js';

export default function AdminPage() {
	return (
		<AdminProvider>
			<AdminRoutes />
		</AdminProvider>
	);
}
