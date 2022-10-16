import {useParams} from 'react-router-dom';

export default function Modal({deletingFncModal}) {
	const {titleSlug, id} = useParams();

	return (
		<div className="modalBg">
			<div className="modalContainer">
				<button
					onClick={() => {
						deletingFncModal();
					}}
					type="button"
				>
					X
				</button>
				<div className="titleModal">
					<h1>
						{`Jste 100% přesvědčení o vymazaní příspěvku?
                     \n s názvem `}{' '}
					</h1>
				</div>
				<div className="bodyModal">
					<h5>{`který začíná: \""`}</h5>
				</div>
				<div className="footerModal">
					<button
						onClick={() => {
							deletingFncModal();
						}}
						type="button"
					>
						Zrušit akci
					</button>
					<button
						type="button"
						onClick={() => {
							console.log('příspěvek byl vymazán', titleSlug, id);
						}}
					>
						Pokračovat v mazání
					</button>
				</div>
			</div>
		</div>
	);
}
