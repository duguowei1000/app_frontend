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

//Grab Tenant's Id
//Populate Tenant's Liked Listings based on id  //
//Routing should be based on Id

const tenantloginID = TENANTUSERID;
console.log(tenantloginID);

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

	const [loginState, r] = useContext(AuthContext);
	// const testid = loginState.user;
	// const testingID = {
	// 	user: {
	// 		name: '626392fcb50b3aadbfbbad8f',
	// 	},
	// };
	// console.log('testid', testingID.user.name);

	const fetchVerify = async (jwtToken) => {
		const url = urlcat(BACKEND, `/api/testusers/verify`);
		const theCookieJWT = { token: `${jwtToken}` };
		console.log('cookie', theCookieJWT);
		await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(
				theCookieJWT
				//addtolist._id
			),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
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
		fetch(urlcat(BACKEND, '/api/tenant/'))
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
		console.log(tenantDetails[0]);
		console.log('tenantDetails1' + tenantDetails[0]);

		const specificTenant = tenantDetails.filter((e) => {
			if (e._id === tenantloginID) {
				return true;
			} else console.log('wrong tenant id');
		});
		const tenantFavs = specificTenant[0].favourites;
		setCurrentFavs(tenantFavs);

		if (tenantFavs.length) {
			let matchedListing = fullListings.filter((e) => {
				return tenantFavs.includes(e._id);
			});

			setWatchList(matchedListing);
		}
	};

	const feDeletelisting = (deletedlistId) => {
		console.log('currentFavs', currentFavs);
		console.log('deletedId', deletedlistId);
		const updatedTenantFavs = currentFavs.filter((e) => {
			return e !== deletedlistId;
		});

		console.log('>>>updatedTenantFavs', updatedTenantFavs);
		const updatedFElist = watchlist.filter((e) => {
			return updatedTenantFavs.includes(e._id);
		});
		console.log('felist', updatedFElist);
		setWatchList(updatedFElist);
	};

	useEffect(() => {
		fetchVerify();
		setCanList(false);
		setStatus('loading');
		fetchFullList();
		fetchTenantDetails();
		//console.log(`ListStatus${ListStatus} TenantDetailsStatus${TenantDetailStatus}`)
	}, []);

	useEffect(() => {
		// console.log(
		// 	`ListStatus${ListStatus} TenantDetailsStatus${TenantDetailStatus}`
		// );
		if (ListStatus && TenantDetailStatus) {
			// console.log(
			// 	`ListStatus${ListStatus} TenantDetailsStatus${TenantDetailStatus}`
			// );
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

	const handleDelete = (listID) => {
		const url = urlcat(BACKEND, `/api/tenant/watchlist/${tenantloginID}`);
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
			{/* {console.log(status)}
			{status === "No Watchlist" ? <div>no watchList</div> :<div>watchlist</div> } */}
			<p>{JSON.stringify(loginState)}</p>
			<AuthToggler />

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

			<div>Suggested Listings</div>
		</>
	);
}

export default TenantWatchList;
