import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import Search from '../components/Search';

function ListingList() {
	const [listings, setListings] = useState([]);
	const [fullListings, setFullListings] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [show, setShow] = useState(true);
	//search
	const [price_Min_S, setPrice_Min_S] = useState();
	const [price_Max_S, setPrice_Max_S] = useState();
	const [hdbOrPrivate_S, setHDBorPrivate_S] = useState('');
	const [rooms_S, setRooms_S] = useState('');
	// const [bathRooms_S, setBathrooms_S] = useState('');

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
		console.log('fullListings>>', fullListings);
		console.log('Listings>>', listings);
		console.log(rooms_S);

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
		let roomsFiltered;
		if (rooms_S === 'Any') {
			roomsFiltered = listings;
		} else {
			roomsFiltered = listings.filter((element) => {
				const bedRooms = element.no_of_bedrooms;
				if (rooms_S === '1 room') {
					return bedRooms === 1;
				} else if (rooms_S === '2 room') {
					console.log(bedRooms);
					return bedRooms === 2;
				} else if (rooms_S === '3 room') {
					return bedRooms === 3;
				} else if (rooms_S === 'More than 4 rooms') {
					return bedRooms > 3;
				}
			});
		}

		let priceFiltered = listings.filter((element) => {
			if (element.price > price_Min_S && element.price < price_Max_S) {
				return true;
			}
		});

		// let finalFiltered = listings.filter(element => {
		//   if ((element.price > price_Min_S) && (element.price < price_Max_S)) {
		//     console.log(element.price)
		//     return true
		//   }
		// })
		let firstFiltered = hdbPrivateFiltered.filter((e) =>
			priceFiltered.includes(e)
		);
		let secondFiltered = firstFiltered.filter((e) => roomsFiltered.includes(e));
		console.log('roomfilterd:', roomsFiltered);
		console.log('firstfilterd:', firstFiltered);
		console.log('secondfilterd:', secondFiltered);
		console.log('min', price_Min_S);
		console.log('max', price_Max_S);

		//set filter
		if (secondFiltered.length) {
			setListings(secondFiltered);
			firstFiltered = [];
			secondFiltered = []; //initialise to 0
			hdbPrivateFiltered = [];
			roomsFiltered = [];
			setPrice_Min_S(0);
			setPrice_Max_S(9999);
			setShow(false);
		} else {
			setListings([]);
			setShow(true);
		} //no entries
		console.log('roomsfiltered', roomsFiltered);
		console.log('fullListings>>', fullListings);
		console.log('Listings>>', listings);
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
		setPrice_Max_S(searchValue_max || 9999); //to set upper limit
	};

	const propertyTypeSearch = (searchValue_HDBorPrivate) => {
		handleToggle();
		setHDBorPrivate_S(searchValue_HDBorPrivate);
	};
	const roomSearch = (searchValue_Rooms) => {
		handleToggle();
		setRooms_S(searchValue_Rooms);
	};

	return (
		<>
			<form>
				Price Range
				<div>
					<Search
						priceSearch={search}
						propertyTypeSearch={propertyTypeSearch}
						roomSearch={roomSearch}
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

export default ListingList;
