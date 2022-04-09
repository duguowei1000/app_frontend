
   
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

      {/* <input type="text" placeholder="min price" id="input-box"/>
      <input type="text" placeholder="max price" id="input-box"/> */}
      {/* <button className="searchunits" onClick= {props.handleClick}> Back to List </button> */}

    </form>
  );
};

export default Search;