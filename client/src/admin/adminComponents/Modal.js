import {useParams} from 'react-router-dom';

export default function Modal({children, open}) {
	if (!open) return null;
	return (
		<div className="modalBg">
			<div className="modalContainer">{children}</div>
		</div>
	);
}
