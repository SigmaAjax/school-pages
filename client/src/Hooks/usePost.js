import {useState} from 'react';

export default function usePost() {
	function updatePost() {
		console.log('Updating post');
	}
	function deletePost() {
		console.log('Deleting post');
	}
	return {updatePost, deletePost};
}
