import React, {useContext, useState} from 'react';

const AdminContext = React.createContext();
const AdminUpdateContext = React.createContext();

export function useAdmin() {
	return useContext(AdminContext);
}

export function useAdminUpdate() {
	return useContext(AdminUpdateContext);
}

export function AdminProvider({children}) {
	const [isOpenModal, setIsOpenModal] = useState(false);

	return (
		<AdminContext.Provider value={isOpenModal}>
			<AdminUpdateContext.Provider value={setIsOpenModal}>
				{children}
			</AdminUpdateContext.Provider>
		</AdminContext.Provider>
	);
}
