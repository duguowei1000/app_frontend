import { useEffect, useState } from 'react';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import { Link } from 'react-router-dom';
import Nav2 from '../components/Nav2';

function Listings() {
	const [listings, setListings] = useState([]);

	useEffect(() => {
		fetch(urlcat(BACKEND, '/api/listings/'))
			.then((response) => response.json())
			.then((data) => setListings(data));
	}, [listings]);

	const handleDelete = (id) => () => {
		const url = urlcat(BACKEND, `/api/listings/${id}`);
		fetch(url, { method: 'DELETE' })
			.then((response) => response.json())
			.then((data) => console.log(data));
		alert('listing deleted');
	};

	return (
		<div>
			<Nav2 />
			<div className='listingList'>
				<ul>
					{listings.map((listing) => (
						<li key={listing._id}>
							<div className='dashboardListing'>
								<div class='bg-indigo-300 ...'>
									{
										<img
											class='object-cover h-60 w-96 ...'
											src={listing.image}
										/>
									}
								</div>
								<div className='listingInfo'>
									<br />
									<b>{listing.address}</b> <br />
									District: {listing.district} <br />
									{/* <span onClick={handleUpdate(listing)}>{listing.price}</span> */}
									Size: {listing.size} sqft
									<br />
									Price: ${listing.price}
									<br />
									{listing.no_of_bedrooms}
									{' Bedrooms'}
									<br />
									{listing.no_of_bathrooms}
									{' Bathrooms'}
									<br />
									<div className='dashboardButtons'>
										<Link
											to={`/listings/${listing._id}`}
											target='_blank'
											rel='noopener noreferrer'
										>
											<button className='viewListing'>
												<span>View Listing</span>
											</button>
										</Link>
										<Link
											to={`/listings/${listing._id}/edit`}
											target='_blank'
											rel='noopener noreferrer'
										>
											<button className='viewListing'>
												<span>Edit Listing</span>
											</button>
										</Link>
										<br />
										<button className='deleteListing'>
											<span onClick={handleDelete(listing._id)}>Delete</span>
										</button>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Listings;
