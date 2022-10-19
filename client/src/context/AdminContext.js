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
	// Modal states
	const [isOpenModal, setIsOpenModal] = useState(false);
	//News states
	const [postList, setPostList] = useState([]);
	const [post, setPost] = useState({}); // For one particular post

	const valueStates = {isOpenModal, postList, post};

	const valueSetStates = {
		setIsOpenModal,
		setPostList,
		setPost,
	};

	return (
		<AdminContext.Provider value={valueStates}>
			<AdminUpdateContext.Provider value={valueSetStates}>
				{children}
			</AdminUpdateContext.Provider>
		</AdminContext.Provider>
	);
}
