import { useContext, useEffect, useState } from 'react';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import { Link } from 'react-router-dom';
import Nav2 from '../components/Nav2';

import { TENANTUSERID } from '../utils/loginDetails';

import {
	AuthContext,
	AuthToggler,
} from '../components/Authentication/Provider';

///api/testusers
//Grab Tenant's Id
//Populate Tenant's Liked Listings based on id  //
//Routing should be based on Id

// const tenantloginID = TENANTUSERID;
// console.log(tenantloginID);

function TenantWatchList() {
	const [tenantDetails, setTenantDetails] = useState([]);
	const [fullListings, setFullListings] = useState([]);
	const [watchlist, setWatchList] = useState([]);
	const [ListStatus, setListStatus] = useState(false);
	const [TenantDetailStatus, setTenantDetailStatus] = useState(false);
	const [status, setStatus] = useState(null);
	const [canList, setCanList] = useState(null);
	const [toggle, setToggle] = useState(false);
	const [currentFavs, setCurrentFavs] = useState([]);

	const [userData, setUserData] = useState();
	const [userID, setUserID] = useState();
	const [verifyStatus, setVerifyStatus] = useState(false);

	const [loginState, r] = useContext(AuthContext);
	// const testid = loginState.user;

	const fetchVerify = async () => {
		const url = urlcat(BACKEND, `/api/testusers/verify`);
		await fetch(url, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				//console.log('decode Userid>>>',data);
				setUserData(data);
				setUserID(data.userObjectID);
				setVerifyStatus(true);
				if (data.error) {
					console.log(data.error);
				}
			});
	};

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
		fetch(urlcat(BACKEND, '/api/testusers/findList'))
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

	const handleToggle = (tenantListing) => {
		feDeletelisting(tenantListing);
	};

	const setupWatchList = () => {
		// console.log(tenantDetails[0]);
		// console.log('tenantDetails1' + tenantDetails[0]);
		if (userID) {
			const specificTenant = tenantDetails.filter((e) => {
				if (e._id === userID) {
					return true;
				} else console.log('checked tenant id, cont.');
			});
			if (specificTenant.length) {
				const tenantFavs = specificTenant[0].favourites;
				setCurrentFavs(tenantFavs);

				if (tenantFavs.length) {
					let matchedListing = fullListings.filter((e) => {
						return tenantFavs.includes(e._id);
					});

					setWatchList(matchedListing);
				}
			} else setupWatchList([]);
		}
	};

	const feDeletelisting = (deletedlistId) => {
		const updatedTenantFavs = currentFavs.filter((e) => {
			return e !== deletedlistId;
		});
		const updatedFElist = watchlist.filter((e) => {
			return updatedTenantFavs.includes(e._id);
		});
		//console.log('felist', updatedFElist);
		setWatchList(updatedFElist);
	};

	useEffect(() => {
		fetchVerify();
	}, []);

	useEffect(() => {
		if (verifyStatus) {
			setCanList(false);
			setStatus('loading');
			fetchFullList();
			fetchTenantDetails();
			//console.log(`ListStatus${ListStatus} TenantDetailsStatus${TenantDetailStatus}`)
		}
	}, [verifyStatus]);

	useEffect(() => {
		// console.log(
		// 	`ListStatus${ListStatus} TenantDetailsStatus${TenantDetailStatus}`
		// );
		if (ListStatus && TenantDetailStatus) {
			// console.log(
			// 	`ListStatus${ListStatus} TenantDetailsStatus${TenantDetailStatus}`
			// );
			//console.log('tenant details', tenantDetails); //check tenant ID to be sure
			console.log('userID>>>>', userID);
			console.log('data>>', userData);
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

	const handleDelete = (listID) => {
		console.log('>>>', userID);
		const url = urlcat(BACKEND, `/api/testusers/watchlist/${userID}`);
		const deleteListing = { fav: `${listID}` };
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(deleteListing),
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
			{userData ? (
				<div className='userName'>Welcome {userData.name}</div>
			) : (
				<div></div>
			)}
			{/* {console.log(status)} */}
			{userID ? (
				<div></div>
			) : (
				<div className='tenantWatchlist'>
					Please Login to Access Your WatchList
				</div>
			)}
			{/* <p>{JSON.stringify(loginState)}</p> */}
			{/* <AuthToggler /> */}

			{/*  */}
			{canList && (
				<div className='listingList'>
					<ul>
						{watchlist.map((tenantListing) => (
							<li key={tenantListing._id}>
								<div className='tenantListing'>
									<div class='bg-indigo-300 ...'>
										{
											<img
												class='object-cover h-60 w-96 ...'
												src={tenantListing.image}
											/>
										}
									</div>
									<div className='listingInfo'>
										<br />
										<b>{tenantListing.address}</b> <br />
										District: {tenantListing.district} <br />
										{/* <span onClick={handleUpdate(listing)}>{listing.price}</span> */}
										Size: {tenantListing.size} sqft
										<br />
										Price: ${tenantListing.price}
										<br />
										{tenantListing.no_of_bedrooms}
										{' Bedrooms'}
										<br />
										{tenantListing.no_of_bathrooms}
										{' Bathrooms'}
										<br />
										<br />
										<Link
											to={`/listings/${tenantListing._id}`}
											target='_blank'
											rel='noopener noreferrer'
										>
											<button className='viewListing'>
												<span>View Listing</span>
											</button>
										</Link>
										<button
											onClick={() => {
												handleDelete(tenantListing._id);
												handleToggle(tenantListing._id);
											}}
										>
											Delete
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}

			{/* <div>Suggested Listings</div> */}
		</>
	);
}

export default TenantWatchList;
