import styles from './loader.module.css';

export function Loader() {
	return (
		<svg
			className={styles.spinner}
			width="65px"
			height="65px"
			viewBox="0 0 66 66"
		>
			<circle
				className={styles.path}
				fill="none"
				strokeWidth="6"
				strokeLinecap="round"
				cx="33"
				cy="33"
				r="30"
			></circle>
		</svg>
	);
}
