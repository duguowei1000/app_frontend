import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';

function Listing() {
	const [selectedListing, setSelectedListing] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		fetch(urlcat(BACKEND, '/api/listings/'))
			.then((response) => response.json())

			.then((data) => {
				const selectedListing = data.filter((listing) => listing._id === id);
				console.log('selectedListing', selectedListing);
				setSelectedListing(selectedListing[0]);
			});
	}, []);

	return (
		<div className='individualListing'>
			<img src={selectedListing.image} height='50%' width='50%' /> <br />
			<h4>Property Details:</h4>
			<h1>
				{selectedListing.address} ({selectedListing.property_type})<br />
			</h1>
			<h3>
				(District {selectedListing.district}) <br />
				<br />
				Size: {selectedListing.size} sqft <br />
				<br />
				Price: ${selectedListing.price}
				<br />
				<br />
				{selectedListing.no_of_bedrooms}{' '}
				<img
					src='http://cdn.onlinewebfonts.com/svg/img_391908.png'
					height='25x'
					width='25px'
				/>{' '}
				<br />
				<br />
				{selectedListing.no_of_bathrooms}{' '}
				<img
					src='https://cdn-icons-png.flaticon.com/512/637/637270.png'
					height='25x'
					width='25px'
				/>{' '}
				<br />
				<br />
			</h3>
			<u>
				Property Description:
				<br /> <br />
			</u>
			{selectedListing.description} <br />
			<br />
		</div>
	);
}

export default Listing;
