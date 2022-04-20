import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import Search from '../components/Search';
import TenantEdit from './TenantEdit';

function TenantListingList() {
	const [listings, setListings] = useState([]);
	const [fullListings, setFullListings] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [show, setShow] = useState(true);
	//search
	const [price_Min_S, setPrice_Min_S] = useState();
	const [price_Max_S, setPrice_Max_S] = useState();
	const [hdbOrPrivate_S, setHDBorPrivate_S] = useState('');
	const [bedrooms_S, setBedRooms_S] = useState('');
	const [bathRooms_S, setBathrooms_S] = useState('');

	const url = urlcat(BACKEND, '/api/listings/');
	const fetchDetails = () => {
		fetch(urlcat(BACKEND, '/api/listings/'))
			.then((response) => response.json())
			.then((data) => {
				setListings(data);
				setFullListings(data);
				// const reducedArray = data.slice(0, 29)
				// setListings(reducedArray)
			});
	};

	useEffect(() => {
		fetchDetails();
	}, []);

	useEffect(() => {
		// console.log('fullListings>>', fullListings);
		// console.log('Listings>>', listings);

		//propType Search
		let hdbPrivateFiltered;
		if (hdbOrPrivate_S === 'Any') {
			hdbPrivateFiltered = listings;
		} else {
			hdbPrivateFiltered = listings.filter((element) => {
				const propType = element.property_type;
				if (hdbOrPrivate_S === 'HDB') {
					return propType.includes('HDB');
				} else if (hdbOrPrivate_S === 'Private') {
					return propType.includes('Private');
				}
			});
		}
		//Bedroom Search
		let bedroomsFiltered;
		if (bedrooms_S === 'Any') {
			bedroomsFiltered = listings;
		} else {
			bedroomsFiltered = listings.filter((element) => {
				const bedRooms = element.no_of_bedrooms;
				if (bedrooms_S === '1 room') {
					return bedRooms === 1;
				} else if (bedrooms_S === '2 room') {
					return bedRooms === 2;
				} else if (bedrooms_S === '3 room') {
					return bedRooms === 3;
				} else if (bedrooms_S === '4 room') {
					return bedRooms === 4;
				} else if (bedrooms_S === 'More than 4 rooms') {
					return bedRooms > 4;
				}
			});
		}
		//Bathroom Search
		let bathroomsFiltered;
		if (bathRooms_S === 'Any') {
			bathroomsFiltered = listings;
		} else {
			bathroomsFiltered = listings.filter((element) => {
				const bathRooms = element.no_of_bathrooms;
				if (bathRooms_S === '1 Bathroom') {
					return bathRooms === 1;
				} else if (bathRooms_S === '2 Bathroom') {
					console.log(bathRooms_S);
					return bathRooms === 2;
				} else if (bathRooms_S === '3 Bathroom') {
					return bathRooms === 3;
				} else if (bathRooms_S === '4 Bathroom') {
					return bathRooms === 4;
				} else if (bathRooms_S === 'More than 4 Bathroom') {
					return bathRooms > 4;
				}
			});
		}
		//Price Search
		let priceFiltered = listings.filter((element) => {
			if (
				element.price > (price_Min_S || 0) &&
				element.price < (price_Max_S || 9999)
			) {
				return true;
			}
		});

		let firstFiltered = hdbPrivateFiltered.filter((e) =>
			priceFiltered.includes(e)
		);
		let secondFiltered = bathroomsFiltered.filter((e) =>
			bedroomsFiltered.includes(e)
		);
		let thirdFiltered = secondFiltered.filter((e) => firstFiltered.includes(e));
		// console.log('bathroomfilterd:', bathroomsFiltered);
		// console.log('roomfilterd:', bedroomsFiltered);
		// console.log('firstfilterd:', firstFiltered);
		// console.log('secondfilterd:', secondFiltered);
		// console.log('thirdfilterd:', thirdFiltered);
		// console.log('min', price_Min_S);
		// console.log('max', price_Max_S);

		//set filter
		if (thirdFiltered.length) {
			setListings(thirdFiltered);
			firstFiltered = [];
			secondFiltered = []; //initialise to 0
			thirdFiltered = [];
			hdbPrivateFiltered = [];
			bedroomsFiltered = [];
			bathroomsFiltered = [];
			// setPrice_Min_S(0);
			// setPrice_Max_S(9999);
			setShow(false);
		} else {
			setListings([]);
			setShow(true);
		} //no entries
		// console.log('roomsfiltered', bedroomsFiltered);
		// console.log('fullListings>>', fullListings);
		// console.log('Listings>>', listings);
	}, [toggle]);

	const handleToggle = () => {
		handleFullList();
		setToggle(!toggle);
	};

	const handleFullList = () => {
		setListings(fullListings);
		setShow(false);
	};

	const search = (searchValue_min, searchValue_max) => {
		handleToggle();
		setPrice_Min_S(searchValue_min);
		setPrice_Max_S(searchValue_max); // || 9999); //to set upper limit
	};

	const propertyTypeSearch = (searchValue_HDBorPrivate) => {
		handleToggle();
		setHDBorPrivate_S(searchValue_HDBorPrivate);
	};
	const bedroomSearch = (searchValue_Rooms) => {
		handleToggle();
		setBedRooms_S(searchValue_Rooms);
	};

	const bathroomSearch = (searchValue_Rooms) => {
		handleToggle();
		setBathrooms_S(searchValue_Rooms);
	};
	////Handle add to Tenant dashboard
	const handleEditlist = (AddtoList) => {
		const url = urlcat(BACKEND, `/api/tenant/listings`);
		const addListing = { fav: `${AddtoList}` };
		console.log(addListing);
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(
				addListing
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

	// const handleUpdate = (event) => {
	// 	event.preventDefault();
	// 	const listing = {

	// 	};
	// 	handleEditlist(listing);
	// 	alert('listing updated');
	// };

	return (
		<>
			<form>
				Price Range
				<div>
					<Search
						priceSearch={search}
						propertyTypeSearch={propertyTypeSearch}
						bedroomSearch={bedroomSearch}
						bathroomSearch={bathroomSearch}
						toggle={handleToggle}
					/>
				</div>
				<input onClick={handleFullList} type='submit' value='Back to list' />
				<div style={{ visibility: show ? 'visible' : 'hidden' }}>
					Sorry! No Listings Found
				</div>
			</form>

			<div className='listingList'>
				<ul>
					{listings.map((listing) => (
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
									<TenantEdit
										url={url}
										handleUpdate={handleEditlist}
										id={listing._id}
									/>
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
