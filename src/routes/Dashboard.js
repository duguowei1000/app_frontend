import { useContext, useEffect, useState } from 'react';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import { Link } from 'react-router-dom';
import Nav2 from '../components/Nav2';
import { AuthContext } from '../components/Authentication/Provider';

function Listings() {
	const [verifyStatus, setVerifyStatus] = useState(false);
	const [loginState, dispatch] = useContext(AuthContext);

	const jwt = sessionStorage.getItem('jwt');
	const { username, name } = loginState;

	console.log('username,name', { username, name });

	const [listerListings, setListerListings] = useState([]);

	useEffect(() => {
		// const fetchListerList = () => {
		fetch(urlcat(BACKEND, '/api/listings/dash'), {
			credentials: 'include',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `jwt ${jwt}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('data', data);
				//console.log('decode Userid>>>',data);
				// setUserData(data);
				setListerListings(data);
				// setVerifyStatus(true);
			})
			.catch((err) => {
				console.log('error fetching listers listings', err);
			});
	}, []);

	const handleDelete = (id) => () => {
		// setUserData(listings.filter((e) => e._id !== id));
		// console.log(id);

		dispatch(loginState, {
			type: 'UPDATE',
		});
		const url = urlcat(BACKEND, `/api/listings/${id}`);
		fetch(url, {
			credentials: 'include',
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `jwt ${jwt}`,
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
		// alert('listing deleted');
		console.log('hey delete');

		// handleToggle(id);
	};

	return (
		<div>
			<Nav2 />
			{loginState.isLoggedIn ? (
				<div className='userName'>Welcome {name}</div>
			) : (
				<div></div>
			)}

			<div className='listingList'>
				<ul>
					{listerListings &&
						listerListings.map((listing) => (
							<li key={listing._id}>
								<div className='dashboardListing'>
									<div className='bg-indigo-300 ...'>
										{
											<img
												className='object-cover h-60 w-96 ...'
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
											{/* <button className='deleteListing'> */}
											<button
												className='deleteListing'
												onClick={handleDelete(listing._id)}
											>
												Delete
											</button>
											{/* </button> */}
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
