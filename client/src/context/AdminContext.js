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
	const [buttonName, setButtonName] = useState('');
	//News states
	const [postList, setPostList] = useState([]);
	const [post, setPost] = useState({}); // For one particular post
	const [album, setAlbum] = useState({});
	// Gallery states photo states

	const valueStates = {isOpenModal, postList, post, buttonName, album};

	const valueSetStates = {
		setIsOpenModal,
		setPostList,
		setPost,
		setButtonName,
		setAlbum,
	};

	return (
		<AdminContext.Provider value={valueStates}>
			<AdminUpdateContext.Provider value={valueSetStates}>
				{children}
			</AdminUpdateContext.Provider>
		</AdminContext.Provider>
	);
}
