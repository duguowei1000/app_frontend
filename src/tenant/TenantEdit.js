function TenantEdit(props) {
	// const AddListing = (listing) => {
	// 	fetch(props.url, {
	// 		credentials: 'include',
	// 		method: 'PUT',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(listing),
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => data)
	// 		.catch((error) => console.log(error));

	// 	    // //findoneandupdate
	// 		// const findIt = async() =>{
	// 		// 	try {
	// 		// 		const find_ = await Hotel.findOneAndUpdate({"location":"White Bay, Oregon"},{rating:2});//,"Hilbert's Hotel","Colorado Rockies"
	// 		// 		console.log(find_);
	// 		// 		} catch (error) {
	// 		// 		console.log(error);
	// 		// 		};
	// 		// 	}
	// 		// 	findIt()
	// };

	// const handleAdd = (event) => {
	// 	event.preventDefault();

	// 	// listing.addtolist = !toggle
	// 	// AddListing(listing);
	// 	alert('listing Added');
	// };

	return (
		<>
			<button onClick={() => props.handleUpdate(props.id)}>
				{' '}
				Add to WatchList{' '}
			</button>
		</>
	);
}

export default TenantEdit;
