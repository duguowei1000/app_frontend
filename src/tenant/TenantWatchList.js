import { useEffect, useState } from 'react';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import { Link } from 'react-router-dom';

//Grab Tenant's Id
//Populate Tenant's Liked Listings based on id  //
//Routing should be based on Id
const tenantID = '626256bdbd0702716c26976c';

function TenantWatchList() {
	const [tenantDetails, setTenantDetails] = useState([]);
	const [fullListings, setFullListings] = useState([]);
	const [watchlist, setWatchList] = useState([]);
	const [ListStatus, setListStatus] = useState(false);
	const [TenantDetailStatus, setTenantDetailStatus] = useState(false);
	const [status, setStatus] = useState(null);
	const [canList, setCanList] = useState(null);

	const fetchFullList = () => {
		fetch(urlcat(BACKEND, '/api/listings'))
			.then((response) => response.json())
			.then((d) => {
				setFullListings(d);
				setListStatus(true);
			})
			.catch((error) => {
				setListStatus(false);
				console.error(error);
			});
	};
	const fetchTenantDetails = () => {
		fetch(urlcat(BACKEND, '/api/tenant'))
			.then((response) => response.json())
			.then((data) => {
				setTenantDetails(data);
				setTenantDetailStatus(true);
			})
			.catch((error) => {
				setTenantDetailStatus(false);
				console.error(error);
			});
	};

	const setupWatchList = () => {
		// const tenantFavs = []
		console.log(tenantDetails[0]);
		console.log('tenantDetails1' + tenantDetails[0]);

		const specificTenant = tenantDetails.filter((e) => {
			if (e._id === tenantID) {
				return true;
			} else console.log('wrong tenant id');
		});
		const tenantFavs = specificTenant[0].favourites;
		//console.log(`tenantFavs,${tenantFavs}`)
		//console.log('>>>>setupwatchlist',tenantDetails);
		if (tenantFavs.length) {
			let matchedListing = fullListings.filter((e) => {
				return tenantFavs.includes(e._id);
			});

			//console.log("matchedlist",matchedListing);
			setWatchList(matchedListing);
		}
	};

	useEffect(() => {
		setCanList(false);
		setStatus('loading');
		fetchFullList();
		fetchTenantDetails();
		//console.log(`ListStatus${ListStatus} TenantDetailsStatus${TenantDetailStatus}`)
	}, []);

	useEffect(() => {
		console.log(
			`ListStatus${ListStatus} TenantDetailsStatus${TenantDetailStatus}`
		);
		if (ListStatus && TenantDetailStatus) {
			// console.log(`ListStatus${ListStatus} TenantDetailsStatus${TenantDetailStatus}`)
			//console.log('tenant details', tenantDetails); //check tenant ID to be sure
			setupWatchList();
			setStatus('success');
			setCanList(true);
		}
	}, [ListStatus, TenantDetailStatus]);

	if (status === 'loading') {
		return <div>Loading..... or no watchList</div>;
	}
	if (status === 'No Watchlist') {
		return <div>No watchList</div>;
	}

	const handleDelete = (id) => () => {
		const url = urlcat(BACKEND, `/api/listings/${id}`);
		fetch(url, { method: 'DELETE' })
			.then((response) => response.json())
			.then((data) => console.log(data));
		alert('listing deleted');
	};

	return (
		<>
			{/* {console.log(status)}
			{status === "No Watchlist" ? <div>no watchList</div> :<div>watchlist</div> } */}
			{canList && (
				<div className='listingList'>
					<ul>
						{watchlist.map((listing) => (
							<li key={listing._id}>
								<div className='listing'>
									<div className='listingImage'>
										{<img src={listing.image} height='300px' width='400px' />}
									</div>
									<div className='listingInfo'>
										<b>{listing.address}</b> <br />
										District: {listing.district} <br />
										{/* <span onClick={handleUpdate(listing)}>{listing.price}</span> */}
										Size: {listing.size} sqft
										<br />
										Price: ${listing.price}
										<br />
										{listing.no_of_bedrooms}{' '}
										<img
											src='http://cdn.onlinewebfonts.com/svg/img_391908.png'
											height='20x'
											width='20px'
										/>
										<br />
										{listing.no_of_bathrooms}{' '}
										<img
											src='https://cdn-icons-png.flaticon.com/512/637/637270.png'
											height='20x'
											width='20px'
										/>
										<br />
										<Link to={`/listings/${listing._id}`}>
											<button className='viewListing'>
												<span>View Listing</span>
											</button>
										</Link>
										<Link to={`/listings/${listing._id}/edit`}>
											<button className='viewListing'>
												<span>Edit Listing</span>
											</button>
										</Link>
										<button className='deleteListing'>
											<span onClick={handleDelete(listing._id)}>Delete</span>
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}

			<div>Suggested Listings</div>
		</>
	);
}

export default TenantWatchList;
