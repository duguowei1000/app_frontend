import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import Nav2 from '../components/Nav2';

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
		<div>
			<Nav2 />
			<div className='individualListing'>
				<div className='individualImage'>
					<img src={selectedListing.image} height='100%' width='100%' /> <br />
				</div>
				<div className='indivDescription'>
					<h1>Property Details:</h1>
					<br />
					<h1>
						{selectedListing.address}
						<br />
					</h1>
					<h3>
						(District {selectedListing.district}) <br />
						<br />
						Property Type: {selectedListing.property_type} <br />
						<br />
						Size: {selectedListing.size} sqft <br />
						<br />
						Price: ${selectedListing.price}
						<br />
						<br />
						{selectedListing.no_of_bedrooms}
						{' Bedrooms'}
						<br />
						<br />
						{selectedListing.no_of_bathrooms}
						{' Bathrooms'}
						<br />
						<br />
						Lister Contact: 91234567
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
			</div>
		</div>
	);
}

export default Listing;
