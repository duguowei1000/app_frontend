import { useEffect, useState } from 'react';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import { Link } from 'react-router-dom';

//Grab Tenant's Id
//Populate Tenant's Liked Listings based on id  //
//Routing should be based on Id
const tenantID = '626005436894f9abe141f1a0';

function TenantWatchList() {
	const [tenantDetails, setTenantDetails] = useState('');
	const [fullListings, setFullListings] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [watchlist, setWatchList] = useState([]);

	useEffect(() => {
		fetch(urlcat(BACKEND, '/api/listings'))
			.then((response) => response.json())
			.then((data) => setFullListings(data));
	}, []);
	useEffect(() => {
		fetch(urlcat(BACKEND, '/api/tenant/listings'))
			.then((response) => response.json())
			.then((data) => {
				setTenantDetails(data);
				// setWatchList(data.tenantID.favourites)
				console.log(data);
			});
	}, []);

	console.log(tenantDetails);
	const findFavourites = () =>
		tenantDetails.filter((e) => {
			if (e._id === tenantID) {
				setFavourites(e.favourites);
				console.log(favourites);
			}
		});
	findFavourites();

	// useEffect(() => {
	//     if (coinDetails.length) {
	//         const watchlist = getWatchlist()
	//         // console.log(">>>CoinDetails", coinDetails)
	//         // console.log(">>>watchlist", watchlist)
	//         const matchingCoins = coinDetails.filter(coinDetail => {
	//             return Object.values(watchlist).includes(coinDetail.id)
	//         })
	//         setCoins(matchingCoins)  //find coins that match the local.storage against API call
	//         // console.log('>>>matchingCoins', matchingCoins)
	//     }
	// }, [coinDetails])

	// useEffect(() => {
	//     if (tenantDetailsStatus && ChartDataStatus) {
	//         setChartDataLoaded(true);
	//         setStatus("success")
	//         setLoading(false)
	//     }
	// }, [CoinDetailsStatus, ChartDataStatus])

	console.log(watchlist);

	const handleDelete = (id) => () => {
		const url = urlcat(BACKEND, `/api/listings/${id}`);
		fetch(url, { method: 'DELETE' })
			.then((response) => response.json())
			.then((data) => console.log(data));
		alert('listing deleted');
	};

	return (
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
	);
}

export default TenantWatchList;
