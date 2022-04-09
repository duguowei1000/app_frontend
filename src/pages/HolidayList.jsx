import { useEffect, useState } from "react";
import urlcat from "urlcat";
import { BACKEND } from "../utils/utils"
import Search from "../components/Search";

function ListingList() {
    const [listings,setListings]= useState([])
    const [filteredListings ,setFilteredListings] = useState([])
    const [Value, setValue] = useState([])
    const [toggle, setToggle] = useState(false);
    const [show, setShow] = useState(false);


    useEffect(() => {
        fetch(urlcat(BACKEND, "/api/listings/"))
          .then((response) => response.json())
          .then((data) => setListings(data));
      }, [toggle]);

      const handleDelete = (id) => () => {
        const url = urlcat(BACKEND, `/api/listings/${id}`);
        fetch(url, { method: "DELETE" })
          .then((response) => response.json())
          .then((data) => console.log(data));
      };
      const handleUpdate = (listing) => () => {
        const url = urlcat(BACKEND, `/api/listings/${listing._id}`);
        // const newListing = { ...listing, likes: holiday.likes + 10 }
        
        fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify(newListing),
          })
          .then((response) => response.json())
          .then((data) => console.log(data));
      };

    //   useEffect(() => {
    //     // const reducedArray = fullList.splice(0,30)
    //     // setList(reducedArray)
    //     if (Value.length) {
    //         const searchArray = fullList.filter(element => {
    //             const lowercase = element.name.toLowerCase()
    //             const submitted = Value.toLowerCase()
    //             return lowercase.includes(submitted)
    //         });
    //         console.log('search>>>', searchArray)
    //         console.log('list', list)
    //         if (searchArray.length) {
    //             setList(searchArray)
    //     } else setList(fullList)
    //         // setSearchStatus(true)
    //     }

    // }
    //     , [])
    const handleToggle = () => {
      setToggle(!toggle);
  };
    const search = (searchValue) => {
      setShow(true)
      handleToggle()
      setValue(searchValue)
      // setList([...fullList])
      
  }

    return (
        <>
    <form action="#">
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
      </select> */}
      Price Range
      <div><Search search={search} toggle={handleToggle} /></div>
      {/* <input type="text" placeholder="min price" id="input-box"/>
      <input type="text" placeholder="max price" id="input-box"/> */}
      {/* Size Range
      <input type="text" placeholder="min Size" id="input-box"/>
      <input type="text" placeholder="max Size" id="input-box"/> */}
      
      <input type="submit" value="Submit" />
</form>

        <div className="listingList">
            <ul>
                {listings.map((listing) =>(
                    <li key = {listing._id}>
                      {<img src={listing.image} height="150px" width="200px"/>} <br/>
            Address: {listing.address} <br/>
            District: {listing.district} <br/>
            {/* <span onClick={handleUpdate(listing)}>{listing.price}</span> */}
            Size: {listing.size} sqft<br/>
            Price: ${listing.price}<br/>
            Bedrooms: {listing.no_of_bedrooms}<br/>
            Bathrooms: {listing.no_of_bathrooms}<br/>
            Description: {listing.description}<br/>
                    </li>
                ))}           
            </ul>
            </div>


        </>
    )
}

export default ListingList;