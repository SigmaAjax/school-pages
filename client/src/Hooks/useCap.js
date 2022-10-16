export default function useCap() {
	function capitalize(text) {
		text = text.charAt(0).toUpperCase() + text.slice(1);
		return text;
	}

	return {capitalize};
}
