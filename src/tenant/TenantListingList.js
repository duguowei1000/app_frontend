import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import Search from '../components/Search';
import Nav2 from '../components/Nav2';
import { TENANTUSERID } from '../utils/loginDetails';
import { AuthContext } from '../components/Authentication/Provider';

// const tenantloginID = TENANTUSERID;
// console.log(tenantloginID);
///api/testusers

function TenantListingList() {
	const [listings, setListings] = useState([]);
	const [toggle, setToggle] = useState(false);
	// const [fullListings, setFullListings] = useState([]);
	// const [show, setShow] = useState(true);
	// //search
	// const [price_Min_S, setPrice_Min_S] = useState();
	// const [price_Max_S, setPrice_Max_S] = useState();
	// const [hdbOrPrivate_S, setHDBorPrivate_S] = useState('');
	// const [bedrooms_S, setBedRooms_S] = useState('');
	// const [bathRooms_S, setBathrooms_S] = useState('');

	const [loginState, _] = useContext(AuthContext);
	const [modalContent, setModalContent] = useState(false);

	const closeModal = () => {
		setModalContent(null);
	};
	const fetchDetails = () => {
		fetch(urlcat(BACKEND, '/api/listings/'), {
			credentials: 'include',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setListings(data);
			});
	};

	useEffect(() => {
		fetchDetails();
	}, [toggle]);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	const handleList = (retrievedList) => {
		setListings(retrievedList);
		console.log(retrievedList);

		console.log(loginState);
	};
	////Handle add to Tenant dashboard
	const handleEditlist = async (AddtoList) => {
		console.log('userID>>>>', loginState.userId);
		const url = urlcat(BACKEND, `/auth/${loginState.userId}`);
		const addListing = { fav: `${AddtoList}` };
		console.log('addtolist', addListing);
		await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(addListing),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.error) {
					console.log(data.error);
				}
			});
	};

	return (
		<>
			<Nav2 />

			<div>
				<Search handleList={handleList} />
			</div>
			<input onClick={handleToggle} type='submit' value='Clear All Filters' />
			<div>
				Displaying a total of <b>{listings.length} listings</b> based on the
				filter(s) you have selected.
			</div>
			<div className='listingList'>
				<ul>
					{listings.map((listing) => (
						<li key={listing._id}>
							<div className='tenantListing'>
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
									<br />
									{loginState.userId ? (
										<button
											className='addTolist'
											onClick={() => handleEditlist(listing._id)}
										>
											<span>Add to list</span>
										</button>
									) : (
										<></>
									)}
									<Link to={`/listings/${listing._id}`}>
										<button className='viewListing'>
											<span>View Listing</span>
										</button>
									</Link>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default TenantListingList;
