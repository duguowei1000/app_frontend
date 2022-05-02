import React, { useEffect, useState } from 'react';
import { BACKEND } from '../utils/utils';
import urlcat from 'urlcat';

const Search = (props) => {
	//   const [searchValue, setSearchValue] = useState("");
	const [searchValue_min, setSearchValue_min] = useState();
	const [searchValue_max, setSearchValue_max] = useState();
	const [searchValue_HDBorPrivate, setSearchValue_HDBorPrivate] =
		useState('Any');
	const [searchValue_Rooms, setSearchValue_Rooms] = useState('Any');
	const [searchValue_Bathrooms, setSearchValue_Bathrooms] = useState('Any');

	const [listings, setListings] = useState([]);

	// const [error, setError] = useState('');

	const createSearch = (search) => {
		const url = urlcat(BACKEND, `/api/listings/search`);
		console.log(search);
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(search),
		})
			.then((response) => response.json())
			.then((data) => {
				setListings(data);

				if (data.error) {
					setError(data.error);
				}
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		const passList = () => {
			props.handleList(listings);
		};
		passList();
	}, [listings]);

	const callSearchFunction = (event) => {
		event.preventDefault();
		const searchParams = {
			searchValue_min,
			searchValue_max,
			searchValue_HDBorPrivate,
			searchValue_Rooms,
			searchValue_Bathrooms,
		};
		createSearch(searchParams);
		// alert('Search created');
	};

	return (
		<form
			action={urlcat(BACKEND, 'search')}
			method='POST'
			// onSubmit={handleSubmit}
		>
			<label>Price Range</label>
			<input
				//value={searchValue_min}
				onChange={(event) => setSearchValue_min(event.target.value)}
				type='number'
				placeholder='min price'
			/>
			<input
				//value={searchValue_max}
				onChange={(event) => setSearchValue_max(event.target.value)}
				type='number'
				placeholder='max price'
			/>
			<label>Property Type</label>
			<select
				name='HDBorPrivate'
				id='HDBorPrivate'
				value={searchValue_HDBorPrivate}
				onChange={(event) => setSearchValue_HDBorPrivate(event.target.value)}
				type='text'
			>
				<option value='Any'>Any</option>
				<option value='HDB'>HDB</option>
				<option value='Private'>Private</option>
			</select>
			<label>Rooms</label>
			<select
				name='RoomsToRent'
				id='RoomsToRent'
				value={searchValue_Rooms}
				onChange={(event) => setSearchValue_Rooms(event.target.value)}
				type='text'
			>
				<option value='Any'>Any</option>
				<option value='1'>1 room</option>
				<option value='2'>2 room</option>
				<option value='3'>3 room</option>
				<option value='4'>4 room</option>
				<option value='More than 4 rooms'>More than 4 rooms</option>
			</select>
			<label>Bathrooms</label>
			<select
				name='Bathrooms'
				id='Bathrooms'
				value={searchValue_Bathrooms}
				onChange={(event) => setSearchValue_Bathrooms(event.target.value)}
				type='text'
			>
				<option value='Any'>Any</option>
				<option value='1'>1 Bathroom</option>
				<option value='2'>2 Bathroom</option>
				<option value='3'>3 Bathroom</option>
				<option value='4'>4 Bathroom</option>
				<option value='More than 4 rooms'>More than 4 Bathroom</option>
			</select>
			<br />
			<input
				onClick={callSearchFunction}
				className='searchunits'
				type='submit'
				value='Search'
			/>
		</form>
	);
};

export default Search;

{
	/* <form onSubmit={handleSubmit}>
Name:
<input
  type="text"
  name="name"
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
<br />
Likes:
<input type="number" name="likes" value={likes} onChange={(event) => setLikes(event.target.value)}/> <br />
<p>{error}</p>
<button>Create</button>
</form> */
}
