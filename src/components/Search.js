import React, { useState } from 'react';

const Search = (props) => {
	//   const [searchValue, setSearchValue] = useState("");
	const [searchValue_min, setSearchValue_min] = useState(null);
	const [searchValue_max, setSearchValue_max] = useState(null);
	const [searchValue_HDBorPrivate, setSearchValue_HDBorPrivate] = useState('');

	const callSearchFunction = (e) => {
		e.preventDefault();
		propertyTypeSearch();
		priceSearch();
	};

	const priceSearch = () => {
		props.priceSearch(searchValue_min, searchValue_max); //passing back as props
		setSearchValue_min(''); //adding this to automatically clear input field
		setSearchValue_max(''); //adding this to automatically clear input field
		console.log(`min: ${searchValue_min} max: ${searchValue_max} `);
	};
	const propertyTypeSearch = () => {
		props.propertyTypeSearch(searchValue_HDBorPrivate); //passing back as props
		//setSearchValue_HDBorPrivate(''); //adding this to automatically clear input field
		console.log(`HDBorPrivate: ${searchValue_HDBorPrivate} `);
	};

	return (
		<form className='Searchbar'>
			<input
				value={searchValue_min}
				onChange={(event) => setSearchValue_min(event.target.value)}
				type='number'
				placeholder='min price'
			/>
			<input
				value={searchValue_max}
				onChange={(event) => setSearchValue_max(event.target.value)}
				type='number'
				placeholder='max price'
			/>
			<input
				onClick={callSearchFunction}
				className='searchunits'
				type='submit'
				value='SEARCH'
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
			{/* <label >Rooms</label>
      <select name="RoomsToRent" id="RoomsToRent">
      <option value="Any">Any</option>
        <option value="1 room">1 room</option>
        <option value="2 room">2 room</option>
        <option value="3 room">3 room</option>
        <option value="4 room">4 room</option>
        <option value="More than 4 rooms">More than 4 rooms</option>
      </select>
      <label >Bathrooms</label>
      <select name="Bathrooms" id="Bathrooms">
      <option value="Any">Any</option>
      <option value="1 Bathroom">1 Bathroom</option>
        <option value="2 Bathroom">2 Bathroom</option>
        <option value="3 Bathroom">3 Bathroom</option>
        <option value="4 Bathroom">4 Bathroom</option>
        <option value="More than 4 Bathroom">More than 4 Bathroom</option>
      </select>  */}

			{/* <input type="text" placeholder="min price" id="input-box"/>
      <input type="text" placeholder="max price" id="input-box"/> 
  */}
			{/* <button  onClick= {props.handleFullList()}> Back to List </button>  */}

			{/* <input type="text" placeholder="min price" id="input-box"/>
      <input type="text" placeholder="max price" id="input-box"/> 
  */}
			{/* Size Range
      <input type="text" placeholder="min Size" id="input-box"/>
      <input type="text" placeholder="max Size" id="input-box"/> 
  */}
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
