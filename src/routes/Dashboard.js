import { useEffect, useState } from 'react';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import { Link } from 'react-router-dom';
import Nav2 from '../components/Nav2';

function Listings() {
	const [listings, setListings] = useState([]);
	const [toggle, setToggle] = useState(false);

	const [userData, setUserData] = useState();
	const [userID, setUserID] = useState();
	const [verifyStatus, setVerifyStatus] = useState(false);

	const fetchList = () => {
		fetch(urlcat(BACKEND, '/api/listings/'))
			.then((response) => response.json())
			.then((data) => setListings(data));
	};

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

	useEffect(() => {
		fetchVerify();
	}, []);

	useEffect(() => {
		if (verifyStatus) {
			fetchList();
		}
	}, [verifyStatus]);

	const handleToggle = (deleteListing) => {
		setToggle(!toggle);
		feDeletelisting(deleteListing);
	};

	const feDeletelisting = (deletedlistId) => {
		console.log(listings);
		console.log('deletelistid', deletedlistId);
		const updatedList = listings.filter((e) => {
			return e._id !== deletedlistId;
		});

		console.log('updated', updatedList);

		// console.log('>>>updatedTenantFavs', updatedTenantFavs);
		// const updatedFElist = listings.filter((e) => {
		// 	return updatedTenantFavs.includes(e._id);
		// });
		// console.log('felist', updatedFElist);
		setListings(updatedList);
	};

	const handleDelete = (id) => () => {
		console.log(id);
		const url = urlcat(BACKEND, `/api/listings/${id}`);
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
		// alert('listing deleted');
		console.log('hey delete');

		handleToggle(id);
	};

	const clickFn = (listingid) => {
		// handleToggle(listingid)
		// handleDelete(listingid)
		// handleToggle(listingid)
	};

	return (
		<div>
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
					Please Login to Access Your Lister Dashboard
				</div>
			)}
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
