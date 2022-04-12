
   
import React, { useState } from "react";

const Search = (props) => {
//   const [searchValue, setSearchValue] = useState("");
const [searchValue_min, setSearchValue_min] = useState("");
const [searchValue_max, setSearchValue_max] = useState("");

  const handleSearchInputChanges_min = (e) => {
    //searchValue is set here
    setSearchValue_min(e.target.value); //stores search term in searchValue state
  };
  const handleSearchInputChanges_max = (e) => {
    //searchValue is set here
    setSearchValue_max(e.target.value); //stores search term in searchValue state
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue_min, searchValue_max); //passing back as props
    props.toggle()
    setSearchValue_min(""); //adding this to automatically clear input field
    setSearchValue_max(""); //adding this to automatically clear input field
    console.log(`min: ${searchValue_min} max: ${searchValue_max} `)

  };

  return (
    <form className="search">
      <input
        value={searchValue_min}
        onChange={handleSearchInputChanges_min}
        type="text"
        placeholder="min price"
      />
      <input
        value={searchValue_max}
        onChange={handleSearchInputChanges_max}
        type="text"
        placeholder="max price"
      />
      <input className="searchunits" onClick={callSearchFunction} type="submit" value="SEARCH" />

{/* <label for="Property Type">Property Type</label>
      <select name="HDBorPrivate" id="HDBorPrivate">
      <option value="Any">Any</option>
        <option value="HDB">HDB</option>
        <option value="Private">Private</option>
      </select>
      <label for="RoomsToRent">Rooms</label>
      <select name="RoomsToRent" id="RoomsToRent">
      <option value="Any">Any</option>
        <option value="1 room">1 room</option>
        <option value="2 room">2 room</option>
        <option value="3 room">3 room</option>
        <option value="4 room">4 room</option>
        <option value="More than 4 rooms">More than 4 rooms</option>
      </select>
      <label for="RoomsToRent">Bathrooms</label>
      <select name="Bathrooms" id="Bathrooms">
      <option value="Any">Any</option>
      <option value="1 Bathroom">1 Bathroom</option>
        <option value="2 Bathroom">2 Bathroom</option>
        <option value="3 Bathroom">3 Bathroom</option>
        <option value="4 Bathroom">4 Bathroom</option>
        <option value="More than 4 Bathroom">More than 4 Bathroom</option>
      </select> 
  */}


  {/* <input type="text" placeholder="min price" id="input-box"/>
      <input type="text" placeholder="max price" id="input-box"/> 
  */}
  {/* <button className="searchunits" onClick= {props.handleClick}> Back to List </button> 
  */}



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