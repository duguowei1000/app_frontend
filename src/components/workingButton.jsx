export default function workingButton() {
	const clickHandler = async () => {
		const resp = await fetch('/api/working', {
			method: 'POST',
			headers: {},
			body: JSON.stringify({}),
		});
	};

	return <div>workingButton</div>;
}
