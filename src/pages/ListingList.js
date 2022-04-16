import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import Search from '../components/Search';

function ListingList() {
	const [listings, setListings] = useState([]);
	const [fullListings, setFullListings] = useState([]);
	const [Value_Min, setValue_Min] = useState();
	const [Value_Max, setValue_Max] = useState();
	const [toggle, setToggle] = useState(false);
	// const [show, setShow] = useState(false);

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
		console.log('max', Value_Max);
		console.log('min', Value_Min);
		console.log('fullListings>>', fullListings);
		console.log('Listings>>', listings);
		if (Value_Min > 0 || Value_Max > 0) {
			let searchArray = listings.filter((element) => {
				if (element.price > Value_Min && element.price < Value_Max) {
					console.log(element.price);
					return true;
				}
			});
			if (searchArray.length) {
				setListings(searchArray);
				searchArray = []; //initialise to 0
				setValue_Min(0);
				setValue_Max(9999);
			}
		}
	}, [toggle]);

	const handleToggle = () => {
		handleFullList();
		setToggle(!toggle);
	};

	const handleFullList = () => {
		setListings(fullListings);
		// setShow(false)
	};

	const search = (searchValue_min, searchValue_max) => {
		handleToggle();
		setValue_Min(searchValue_min);
		setValue_Max(searchValue_max || 9999); //to set upper limit
	};

	return (
		<>
			<form>
				<div>

					<Search
						priceSearch={search}
						propertyTypeSearch={propertyTypeSearch}
						bedroomSearch={bedroomSearch}
						bathroomSearch={bathroomSearch}
						toggle={handleToggle}
					/>
				</div>
				<input onClick={handleFullList} type='submit' value='Reset Filters' />
				<div style={{ visibility: show ? 'visible' : 'hidden' }}>
					Sorry! No Listings Found

				</div>
				{/* <div style={{ visibility: show ? "visible" : "hidden" }}> */}
				<input onClick={handleToggle} type='submit' value='Back to list' />
				{/* </div> */}
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
