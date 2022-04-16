import React, { useState } from 'react';

const Search = (props) => {
	//   const [searchValue, setSearchValue] = useState("");
	const [searchValue_min, setSearchValue_min] = useState();
	const [searchValue_max, setSearchValue_max] = useState();
	const [searchValue_HDBorPrivate, setSearchValue_HDBorPrivate] =
		useState('Any');
	const [searchValue_Rooms, setSearchValue_Rooms] = useState('Any');
	const [searchValue_Bathrooms, setSearchValue_Bathrooms] = useState('Any');

	const callSearchFunction = (e) => {
		e.preventDefault();
		propertyTypeSearch();
		priceSearch();
		bedroomSearch();
		bathroomSearch();
	};

	const priceSearch = () => {
		props.priceSearch(searchValue_min, searchValue_max); //passing back as props
		// console.log(`min: ${searchValue_min} max: ${searchValue_max} `);
	};
	const propertyTypeSearch = () => {
		props.propertyTypeSearch(searchValue_HDBorPrivate); //passing back as props
		// console.log(`HDBorPrivate: ${searchValue_HDBorPrivate} `);
	};
	const bedroomSearch = () => {
		props.bedroomSearch(searchValue_Rooms); //passing back as props
		// console.log(`rooms: ${searchValue_Rooms} `);
	};
	const bathroomSearch = () => {
		props.bathroomSearch(searchValue_Bathrooms); //passing back as props
		// console.log(`rooms: ${searchValue_Rooms} `);
	};

	return (
		<form className='Searchbar'>
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
				<option value='1 room'>1 room</option>
				<option value='2 room'>2 room</option>
				<option value='3 room'>3 room</option>
				<option value='4 room'>4 room</option>
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
				<option value='1 Bathroom'>1 Bathroom</option>
				<option value='2 Bathroom'>2 Bathroom</option>
				<option value='3 Bathroom'>3 Bathroom</option>
				<option value='4 Bathroom'>4 Bathroom</option>
				<option value='More than 4 Bathroom'>More than 4 Bathroom</option>
			</select>
			<input
				onClick={callSearchFunction}
				className='searchunits'
				type='submit'
				value='SEARCH'
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
